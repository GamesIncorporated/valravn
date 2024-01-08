let fs = require('fs');

writeSoundList = (args) => {
    return async function writeSoundList() {
        if(args.length === 0) throw new Error("Enter your game name. e.g: gulp generateAudioPaths --gtc_005_ffc");

        const gameName = cleanUpArgs(args);
        const filePath = `../${gameName}/assets/en/audio/`;

        const newFolderName = "audio-definitions";
        const deploymentPath = `../${gameName}/json/web/audio/${newFolderName}`;
        const files = getFoldersRecursive(filePath);
        
        const configs = getConfigs(gameName);
        editConfigs(configs);

        createFoldersRecursive(files, deploymentPath);
    }
}

const editConfigs = (configs) => {
    for(let i = 0; i < configs.length; i++) {
        fs.readFile(configs[i], (error, data) => {
            if (error) throw new Error(error);
            
            let fileData = JSON.parse(data); 
            fileData.mainload.audio.urls = [];

            for (let i = 0; i < globalFiles.length; i++) {
                fileData.mainload.audio.urls.push(globalFiles[i]);
            }

            fs.writeFileSync(configs[i], JSON.stringify(fileData, null, 2), err => err && console.log(err));
        });
    };
}

const getConfigs = (gameName) => {
    return [
        `../${gameName}/json/web/config.json`,
        `../${gameName}/json/mobile/config.json`
    ];
}

cleanUpArgs = (args) => {
    return args[0].replace('--', '');
}

createPath = (gameName) => {
    return `../${gameName}/assets/audio/`;
}

const getFoldersRecursive = (filePath) => {
    const folderStructure = {};

    const dirents = fs.readdirSync(filePath, { withFileTypes: true });

    for (const dirent of dirents) {
        if (dirent.name.includes('.wav') || dirent.name.includes('.DS_Store')) {
            continue;
        }

        folderStructure[dirent.name] = dirent.isDirectory() ? getFoldersRecursive(path.join(filePath, dirent.name)) : null;
    }

    return folderStructure;
}

const createFoldersRecursive = (folderStructure, basePath) => {
    if (fs.existsSync(basePath)) {
        fs.rmSync(basePath, { recursive: true });
    }
    fs.mkdirSync(basePath);

    const jsonFilePath = path.join(basePath, 'audio.json');
    const files = [];

    Object.entries(folderStructure).forEach(([name, subStructure]) => {
        const folderPath = path.join(basePath, name);
        if (subStructure === null) {
            files.push(name);
        } else {
            createFoldersRecursive(subStructure, folderPath);
        }
    });
    if (files.length > 0) {
        fs.writeFileSync(jsonFilePath, JSON.stringify(generateJson(files, jsonFilePath), null, 2));
    }
};

let globalFiles = []; 

const generateJson = (files, jsonFilePath) => {
    const changedFilePath = jsonFilePath.replaceAll("\\", "/").split("/").splice(6, 2).join("/");
    const configFilePath = jsonFilePath.replaceAll("\\", "/").split("/").splice(6, 3).join("/");

    const filePath = `assets/en/audio/${changedFilePath}/`;
    const configPath = `./json/web/audio/audio-definitions/${configFilePath}$(ver)`
    
    globalFiles.push(configPath);

    let fileData = [];
    for (i = 0; i < files.length; i += 2) {
        audioPair = {'id': files[i].replace('.mp3', ''), 'src': files[i + 1]};
        fileData.push(audioPair);
    }
    return {
        group: "default",
        audioPath: filePath,
        audio: fileData
    };
}

module.exports = { writeSoundList };

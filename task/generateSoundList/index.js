let fs = require('fs');

writeSoundList = (args) => {
    return async function writeSoundList() {
        if(args.length === 0) throw new Error("Enter your game name. e.g: gulp generateSoundList --gi_019_cfs");

        const gameName = cleanUpArgs(args);
        const filePath = `../${gameName}/assets/audio/`;
        const files    = getFiles(filePath);
        const jsonFile = findJson(gameName);
        console.log(gameName + " " + filePath + " " + jsonFile);

        
        parseFilesToJson(files, filePath, jsonFile);
    }
}

cleanUpArgs = (args) => {
    return args[0].replace('--', '');
}

createPath = (gameName) => {
    return `../${gameName}/assets/audio/`;
}

getFiles = (filePath) => {
    return fs.readdirSync(filePath);
}

findJson = (gameName) => {
    return `../${gameName}/json/web/audio/audio.json`;
}

parseFilesToJson = (files, filePath, jsonFile) => {
    if (!files) throw new Error("There no files in " + filePath);

    fs.readFile(jsonFile, (error, data) => {
        if (error) throw new Error(error);
        
        let fileData = JSON.parse(data);
        fileData.audio = []; 

        for (i = 0; i < files.length; i += 2) {

            // if (!files[i + 1].includes('.ogg')) {
            //     // throw new Error(`Missing .ogg file for ${files[i]}`);
            // } else if (!files[i].includes('.mp3')) {

            //     // throw new Error(`Missing .mp3 file for ${files[i + 1]}`);
            // }
            audioPair = {'id': files[i].replace('.mp3', ''), 'src': files[i + 1]};
            fileData.audio.push(audioPair);
        }

        fs.writeFileSync(jsonFile, drawObject(fileData.audio), err => err && console.log(err));
    });
}

drawObject = (audioFiles) => {
    let newObject = {
        group: "default",
        audioPath: './assets/audio/',
        audio: audioFiles
    };

    return JSON.stringify(newObject, null, 2);
}

module.exports = { writeSoundList };

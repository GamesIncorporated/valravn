const fs = require('fs');
audiosprite = require('audiosprite');

start = (args) => {
    return async function start() {
        if(args.length === 0) throw new Error("Enter your game name. e.g: gulp createAudioSprite --gi_019_cfs");
        const gameName = cleanUpArgs(args);
        const filePath = createPath(gameName);
        const files = prepareFiles(filePath);
        const gameAudioFilePath = getAudioFilePath(gameName);
        const jsonFilePath = findJson(gameName);
        generateAudio(files, jsonFilePath, gameAudioFilePath);
    }
}

cleanUpArgs = (args) => {
    return args[0].replace('--', '');
}

createPath = (gameName) => {
    return `../${gameName}/assets/audio/`;
}

prepareFiles = (files) => {
    return fs.readdirSync(files)
    .filter(file => file.includes('.mp3'))
    .map(x => x = files + x);
}

getAudioFilePath = (gameName) => {
    return `../${gameName}/assets/audioSprite/`;
}

findJson = (gameName) => {
    return `../${gameName}/json/web/audio/audio.json`;
}

generateAudio = (files, jsonFile, audioPath) => {
    audiosprite(files, setOptions(audioPath), (err, obj) => {
        if (err) return console.error(err);
        fs.writeFileSync(jsonFile, drawObject(obj), err => { if (err) throw new Error(err) });
    })
}

drawObject = (obj) => {
    const newObject = {
        group: "default",
        audioPath: './assets/audioSprite/',
        audio: [
            {
                id: [...obj.src[1].replace('.mp3', '')]
                    .splice(obj.src[1].indexOf('\\') + 1)
                    .join(''),
                src: [...obj.src[0]]
                    .splice(obj.src[0].indexOf('\\') + 1)
                    .join('')
            }
        ],
        sprite: obj.sprite,
    };

    return JSON.stringify(newObject, null, 2);
}

setOptions = (audioPath) => {
    return options = {
        output: audioPath + '/generatedAudio',
        path: 'audioSprite',
        format: 'howler2',
        export: 'ogg,mp3',
        bitrate: 70,
    };
}

module.exports = { start };

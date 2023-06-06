const fs = require('fs')
// const path = require('path')
const ffmpeg = require('ffmpeg')
audiosprite = require('audiosprite');

start = (args) => {
    return async function start() {
        if(args.length === 0) return console.error("Enter your game name. e.g: gulp createAudioSprite --gi_019_cfs")
        const gameName = cleanUpArgs(args);
        const filePath = createPath(gameName);
        const files = prepareFiles(filePath);
        makeAudio(files);
    }
}

cleanUpArgs = (args) => {
    return args[0].replace('--', '');
}

createPath = (gameName) => {
    return `../${gameName}/assets/audio/`
}

prepareFiles = (files) => {
    return fs.readdirSync(files).filter(file => file.includes('.mp3'))
    .map(x => x = files + x);
}

makeAudio = (files) => {
    console.log("Generating Files")
    audiosprite(files, setOptions(), (err, obj) => {
        if (err) return console.error(err);
        fs.writeFileSync('./task/audioSprite/audioAtlas.json', JSON.stringify(obj, null, 2), err => err && console.error(err)) 
    })
}

setOptions = () => {
    return options = {
        output: "./task/audioSprite/generatedAudio",
        path: 'audioSprite',
        format: 'howler2',
        export: 'ogg,mp3',
        bitrate: 70,
      }
}

module.exports = { start };

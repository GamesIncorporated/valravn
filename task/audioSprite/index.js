const fs = require('fs')
// const path = require('path')
const ffmpeg = require('ffmpeg')
audiosprite = require('audiosprite');

function start(args) {
    return function start() {
        const gameName = cleanUpArgs(args);
        const filePath = createPath(gameName);
        const files = prepareFiles(filePath);
        makeAudio(files);
        
        return Promise.resolve()
    }
}

cleanUpArgs = (args) => {
    return args[0].replace('--', '');
}

createPath = (gameName) => {
    return `../${gameName}/assets/audio`
}

prepareFiles = (files) => {
    return fs.readdirSync(files).filter(file => file.includes('.mp3'))
    .map(x => x = files + x);
}

makeAudio = (files) => {
    console.log("Generating Files")
    audiosprite(files, {output: 'result', export: '.mp3'}, (err, obj) => {
        console.log(files)
        if (err) return console.error(err);
        // fs.writeFile('./tasks/audioSprite')
        return console.log(JSON.stringify(obj, null, 2))
    })
}

module.exports = { start };

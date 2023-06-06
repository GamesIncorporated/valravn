const fs = require('fs')
const path = require('path')
const ffmpeg = require('ffmpeg')
audiosprite = require('audiosprite');

function start(args) {
    return function start() {
        const gameName = cleanUpArgs(args);
        const filePath = createPath(gameName);
        const files = prepareFiles(fs.readdirSync(filePath));
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

prepareFiles = (filePath) => {
    return filePath.filter(file => file.includes('.mp3')).map(x => x = filePath + x);
}

makeAudio = (files, path) => {
    console.log("Generating Files")
    // console.log(spawn('ffmpeg'))
    audiosprite([files[0], files[1]], {}, (err, obj) => {
        if (err) return console.error(err);
        return console.log(JSON.stringify(obj, null, 2))
    })
}

module.exports = { start };

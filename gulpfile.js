
// const del = require('del')
const arguments = require('./task/arguments')
const parserArguments = require('./task/arguments/parseArgs')
const excel = require('./task/translate')
const server = require('./task/server')
const spriteAudio = require('./task/audioSprite')
const soundList = require('./task/generateSoundList')


// function clean() {
//   //return del('./dist')
// }

const args = arguments.parse(process.argv.slice(2))
// const toolsArgs = parserArguments.parse(process.argv.slice(3))
const translate = excel.makeTranslate(process.argv.slice(3))
const startServe = server.start
const createAudioSprite = spriteAudio.start(process.argv.slice(3))
const generateSoundList = soundList.writeSoundList(process.argv.slice(3))

module.exports = { 
    translate, 
    startServe, 
    createAudioSprite,
    generateSoundList
}

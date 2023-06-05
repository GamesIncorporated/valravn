const fs = require('fs')
const path = require('path')

const ignore = ['translations.xlsx', 'translations_scratch.xlsx',]

function  parse(value) {
  const args = value.map((g) => g.replace('--', ''))
  let games = []
  let settings = {}

  if(!args.length){
    games = fs.readdirSync(path.resolve('file'))
      .filter((item) => !ignore.includes(item))
    return [games, settings]
  }

  args.forEach((arg) => {
    const temp = arg.split('=')

    if (temp.length > 1){
      settings[temp[0]] = temp[1]
    }
    else {
      games.push(arg)
    }
  })

  return [games, settings]
}

module.exports = { parse }

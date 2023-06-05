fs = require('fs')
path = require('path')
const excelToJson = require('convert-excel-to-json')

function makeTranslate(args) {

  return function makeTranslate() {
    let newres = {}
    let result = {}
    let languages = []
    let currentGames = []
    const options = args[0] && args[0].replace('--', '')

    const replace = {

    }

    function changeResult(source) {
      result = excelToJson({
        sourceFile: source,
        columnToKey: { '*': '{{columnHeader}}' },
      })
      currentGames = Object.keys(result)
    }

    function translate(gameName) {

      const gameDir = options == 'scratch' ? replace[gameName] : gameName

      for (const key in result[gameName][0]) {
        key.toLowerCase() != 'key' && languages.push(key)
      }

      languages.forEach(function (lang) {
     
        result[gameName].map(function (item) {

          item[lang] && item['Key'] != 'Key' ? newres[item['Key']] = item[lang].replace(/\\n/g, '\n') : ''
        })

        if (Object.keys(newres).length > 10 && fs.existsSync(path.resolve('result', gameDir, 'i18n'))) {
        
          fs.writeFileSync(path.resolve('result', gameDir, `i18n/${lang.toLowerCase()}.json`), JSON.stringify(newres))
        }

        newres = {}
      })
      languages = []
    }

    if (options == 'scratch') {
      changeResult('./files/translations_scratch.xlsx')
      currentGames = currentGames.filter((item) => Object.keys(replace).includes(item))
    }
    else {
      changeResult('./files/translations.xlsx')

      if (currentGames.find((item) => item == options)) {
        currentGames = [options]
      }
    }

    currentGames.forEach((game) => translate(game))

    return Promise.resolve()
  }
}

module.exports = { makeTranslate }

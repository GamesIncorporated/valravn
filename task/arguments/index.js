function toNoDash(x) {
  return x.replace('--', '')
}

function toKeyValue(x) {
  return x.split('=')
}

const keys = ['game', 'command']

function toPadded(x) {

  return x.length == 1
    ? [keys.pop()].concat(x)
    : x
}

function parse(args) {

  const values = Object.fromEntries(args
    .map(toNoDash)
    .map(toKeyValue)
    .map(toPadded),
  )

  const game = values.game
  return { game }
}

module.exports = { parse }

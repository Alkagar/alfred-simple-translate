const alfy = require('alfy')
const translate = require('google-translate-api');

(async () => {
  const items = []
  const translations = [
    { from: 'pl', to: 'en' },
    { from: 'en', to: 'pl' }
  ]
  for (let { to } of translations) {
    try {
      const input = `${alfy.input}`
      const tr = await translate(input, { to })
      const from = tr.from.language.iso

      if (to !== from) {
        items.push({ subtitle: `${from} to ${to}`, title: tr.text })
        if (tr.from.text.didYouMean) {
          items.push({ subtitle: `alternative spelling`, title: tr.from.text.value })
        }
      }
    } catch (error) {
      items.push({ title: `Error: ${error.message}` })
    }
  }

  alfy.output(items)
})()

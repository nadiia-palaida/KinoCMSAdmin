import cities from '../data/cities.json'

const activeLang = 'uk'

export const citiesOptionsList = cities.map(item => {
  return {
    label: item.name[activeLang],
    value: item.name['en']
  }
})

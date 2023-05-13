const activeLanguage = 'ua'

export function transformArrToOptions(arr) {

  const newArr = arr.map(item => {
    return {
      label: item[activeLanguage].name,
      value: item.id
    }
  })

  return newArr
}
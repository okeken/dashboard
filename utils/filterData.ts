
export default function filterArrayByKeysAndValues(arr, filterKeys, filterValues) {
    return arr
      .filter(obj => filterKeys.every(key => filterValues.includes(obj[key])))
      .sort((a, b) => filterValues.indexOf(a[filterKeys[0]]) - filterValues.indexOf(b[filterKeys[0]]));
  }
  
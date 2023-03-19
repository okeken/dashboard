const debounce = (func, wait=500) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
      return  func(...args);
      }, wait);
    };
  };

  export default function (arr, keysToFilter, searchTerm) {
    return arr.filter(item => {
      return keysToFilter.some(key => {
        const itemValue = item[key].toString().toLowerCase();
        const searchValue = searchTerm.toLowerCase();
        return itemValue.includes(searchValue);
      });
    });
  }

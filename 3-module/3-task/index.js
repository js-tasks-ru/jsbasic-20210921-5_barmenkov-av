function camelize(str) {
  let strArr = str.split('');
  let result = [];
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] !== '-') {
      result.push(strArr[i]);
    } 
    if (strArr[i] == '-') {
      strArr[i + 1] = strArr[i + 1].toUpperCase();
    }
  }
  return result.join('');
}

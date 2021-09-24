function getMinMax(str) {
  let result = {};
  let strToArray = str.split(' ');
  let numbers = [];
  for (let i = 0; i < strToArray.length; i++) {
    if (!isNaN(strToArray[i])) {
      numbers.push(strToArray[i]);
    }    
  }
  numbers.sort(compareNumber);
  result.min = Math.min(...numbers);
  result.max = Math.max(...numbers);
  return result;
}
function compareNumber(a, b) {
  return (a - b);
}

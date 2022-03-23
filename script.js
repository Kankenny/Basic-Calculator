const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(arr) {
	let total = 0;

  for (let i = 0; i < arr.length; i++){
    total += arr[i];
  }

  return total;
};

const multiply = function(arr) {
  let product = arr[0];

  for(let i = 0; i < arr.length - 1; i++){
    product *= arr[i + 1];
  }
  
  return product;
};

const power = function(a, b) {
	return Math.pow(a, b);
};

const factorial = function(a) {
  let returnValue;

  
  if(a == 0){
    return 1;
  }W
  else{
    returnValue = a * factorial(a - 1);
  }
  
  return returnValue;

};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};

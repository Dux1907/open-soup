/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrome as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
   str = str.toLowerCase()
  var a = ''
  for (let i = 0; i < str.length; i++){
    if (str.charCodeAt(i) >= '97' && str.charCodeAt(i) <= '122')
      a += str[i];
  }
  console.log(a)
  str = a
  if (str.split('').reverse().join('') == str) 
    return true;
  return false;
}
console.log(isPalindrome('car'))
module.exports = isPalindrome;

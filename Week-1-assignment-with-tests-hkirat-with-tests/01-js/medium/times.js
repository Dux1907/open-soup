/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function calculateTime(n) {
  let a = 0;
  let startTime = new Date().getTime();
  for (var i = 0; i < n; i++) a += i;
  let endTime = new Date().getTime();
  console.log(endTime - startTime);
}

for (var i = 0; i < 3; i++) {
  let n = [100, 10000000, 1000000000];
  calculateTime(n[i]);
}

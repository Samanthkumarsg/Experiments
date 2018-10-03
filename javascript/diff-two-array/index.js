function sumAll(arr) {
  let startOff = arr[0],
    endOff = arr[1],
    sum = 0;
  if (endOff < startOff) {
    endOff = arr[0];
    startOff = arr[1];
  }
  for (let i = startOff; i <= endOff; i++) {
    sum += i;
  }
  return sum;
}

console.log(sumAll([4, 2]));

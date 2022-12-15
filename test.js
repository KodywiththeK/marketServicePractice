function solution(s) {
  let res1 = []

  function isPrime(num) {
    if(num === 2)
    return true;
    for(let i = 2; i<=num/2; i++){
      if(num % i === 0){
        return false;
      }
    }
    return true;
  }

  for(let i=2; i<s[0]; i++) {
    if(s[0]%i===0) {
      if(isPrime(i)) {
        res1.push(i)
      }
    }
  }
  console.log(res1)
  for(let i=2; i<s[1]; i++) {
    if(s[1]%i===0 && isPrime(i) && res1.includes(i)) {
      return 1;
    } else return 0;
  }

}
let s = [6, 12];
console.log(solution(s))

let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => {
  return sum / current
}, 1)

console.log(result) //15
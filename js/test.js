// function limitedFunction(maxExecTime, cb) {
//     let excutedCnt = 0;

//     return function(...params) {
//         if (excutedCnt < maxExecTime) {
//             console.log(cb(...params));
//             excutedCnt++;
//         }
//         else {
//             console.log("over limited")
//         }
//     }
// }

// const fn = (a, b, c) => a + b + c;
// const limited = limitedFunction(3, fn);
// limited(1,2,3);
// limited(1,2,3);
// limited(1,2,3);
// limited(1,2,3);

// function sum(num, cur=0) {
//     let curSum = num + cur;
//     console.log(curSum);

//     return function(num) {
//         return sum(num, curSum);
//     }
// }

// sum(1)(2)(3)
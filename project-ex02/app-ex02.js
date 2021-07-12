/* 
 douzone-busan-math npm 모듈 테스트(모듈패키지 로컬 배포)
 npm i ../douzone-busan-math
 명령으로 설치 후, 테스트 할 것
*/


const dzMath = require('douzone-busan-math');

console.log(dzMath.sum(1,2,3,4));
console.log(dzMath.max(-10,-20,-30,-40));
console.log(dzMath.min(-1,-2,0,1,2));



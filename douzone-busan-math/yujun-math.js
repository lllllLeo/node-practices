exports.sum = function() {
    console.log(arguments + "ggㅎㅎ");
    let sum = 0;
    // Array.prototype.forEach.call(arguments, function(e){ // 유사배열이라서 Array prototype forEach사용
    
    Array.from(arguments).forEach(e => {
        sum += e;
    });
    return sum;
};

exports.max = function() {
    let max = Number.MIN_SAFE_INTEGER;
    Array.from(arguments).forEach(e => {
        if(e > max){
            max = e;
        }
        // max = e > max ? e : max;
    });
    return max;
};

exports.min = function() {
    let min = Number.MAX_SAFE_INTEGER;
    Array.from(arguments).forEach(e => {
        if(e < min){
            min = e;
        }
        // min = e < min ? e : min;
    });
    return min;
};
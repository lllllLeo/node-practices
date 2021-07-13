module.exports.add = function(a, b) {
    return a + b;
}

module.exports.minus = function(a,b) {
    return a - b;
}

/** 이러면 원래 안되는건아닌데 ㅁㄹ 근데 구조적으로 잘보이니까 이렇게 씀.  알고써라이거지**/
// module.exports = {
//     add: function(a, b) {
//         return a + b;
//     },
//     minus: function(a,b) {
//         return a - b;
//     }
// }
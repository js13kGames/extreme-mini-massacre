isFunc = function (n) {
    return typeof n === 'function';
};
isNum = function (n) {
    return typeof n === 'number';
};
isObj = function (n) {
    return typeof n === 'object';
};
GAME_WIDTH = 800;
GAME_HEIGHT = 480;
isDef = function (n) {
    return typeof n !== 'undefined';
};
sgn = function (n) {
    return n > 0 ? 1 : -1;
};
ms = function () {
    return new Date().getTime();
};
rnd = function (min, max) {
    return min + Math.random() * (max - min);
};
mix = function (o1, o2) {
    var n,
        d = clone(o1);

    for (n in o2) {
        if (isDef(o2[n])) {
            if (isDef(d[n])) {
                d['parent'] = d['parent'] || {};
                d['parent'][n] = d[n];
            }
            if (isObj(o2[n])) {
                d[n] = mix({}, o2[n]);
            } else {
                d[n] = o2[n];
            }
        }
    }

    return d;
}
clone = function (o) {
    var n,
        d = {};
    for (n in o) {
        d[n] = o[n];
    }
    return d;
};
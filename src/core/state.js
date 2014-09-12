State = function (p) {
    var children = [];
    return mix({
        remove: function (e) {
            var i = children.indexOf(e);
            if (i >= 0) {
                children.splice(i, 1);
            }
        },
        add: function (n) {
            children.push(n);
            if (isFunc(n.init)) {
                n.init();
            }
        },
        update: function () {
            children.sort(function (a, b) {
                return a.z - b.z;
            });
            children.forEach(function (n) {
                if (isFunc(n.update)) {
                    n.update();
                }
            });
        },
        draw: function (g) {
            children.forEach(function (n) {
                if (isFunc(n.draw)) {
                    n.draw(g);
                }
            });
        },
        clear: function () {
            children.length = 0;
        }
    }, p);
};
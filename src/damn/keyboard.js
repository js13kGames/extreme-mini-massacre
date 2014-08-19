dm.do(
    'Keyboard',
    function () {
        'use strict';
        return function (n) {
            var node = n,
                keys = {
                    down: {},
                    justPressed: {}
                },
                onKeyDown = function (evt) {
                    if (!keys.down[evt.keyCode]) {
                        keys.down[evt.keyCode] = true;
                        keys.justPressed[evt.keyCode] = true;
                    }
                },
                onKeyUp = function (evt) {
                    keys.down[evt.keyCode] = false;
                    keys.justPressed[evt.keyCode] = false;
                },
                init = function () {
                    node.addEventListener('keydown', onKeyDown);
                    node.addEventListener('keyup', onKeyUp);
                    module.KEY_SPACE = 32;
                    for (var i = 33; i < 122; ++i) {
                        module['KEY_' + String.fromCharCode(i).toUpperCase()] = i;
                    }
                },
                module = {
                    down: function (code) {
                        return keys.down[code] === true;
                    },
                    justPressed: function (code) {
                        if (keys.justPressed[code]) {
                            keys.justPressed[code] = false;
                            return true;
                        }
                        return false;
                    }
                };

            init();
            return module;
        };
    }
);
dm.mk(
    'Keyboard',
    function () {
        'use strict';
        return function (n) {
            var node = n,
                keys = {
                    down: {},
                    justPressed: {}
                },
                lastKey = -1,
                onKeyDown = function (evt) {
                    if (!keys.down[evt.keyCode]) {
                        keys.down[evt.keyCode] = true;
                        keys.justPressed[evt.keyCode] = true;
                    }
                    lastKey = evt.keyCode;
                },
                onKeyUp = function (evt) {
                    keys.down[evt.keyCode] = false;
                    keys.justPressed[evt.keyCode] = false;
                },
                init = function () {
                    node.addEventListener('keydown', onKeyDown);
                    node.addEventListener('keyup', onKeyUp);
                    def(module, 'key', {
                        get: function () {
                            return lastKey;
                        }
                    });
                },
                module = {
                    down: function (code) {
                        if (code === 85) {
                            console.log(keys.down);
                        }
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
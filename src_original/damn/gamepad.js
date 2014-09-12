dm.mk(
    'GamePad',
    function () {
        'use strict';
        return function () {
            var pads = {},
                newPads = {},
                init = function () {
                    window.addEventListener("gamepaddisconnected", function (e) {
                        delete pads[e.gampad.index];
                    });
                },
                poll = function () {
                    var p = navigator.getGamepads(),
                        i,
                        len = p.length;

                    for (i = 0; i < len; ++i) {
                        if (p[i]) {
                            pads[p[i].index] = p[i];
                        }
                    }
                },
                module = {
                    isSupported: function () {
                        return !!navigator.getGamepads ||
                            !!navigator.webkitGetGamepads ||
                            !!navigator.webkitGamepads;
                    },
                    getPad: function (index) {
                        return pads[index];
                    },
                    update: function () {
                        if (this.isSupported()) {
                            poll();
                        }
                    }
                };

            init();
            return module;
        };
    }
);
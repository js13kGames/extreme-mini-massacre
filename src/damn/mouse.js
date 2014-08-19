dm.do(
    'Mouse',
    function () {
        'use strict';
        return function (n) {
            var pointer = inc.geom.Vec2(),
                node = n,
                down = false,
                hit = false,
                set = function (e) {
                    pointer.x = e.clientX - n.offsetLeft;
                    pointer.y = e.clientY - n.offsetTop;
                    pointer.multiply(module.ratio);
                },
                onMouseDown = function (evt) {
                    set(evt);
                    down = true;
                    hit = false;
                },
                onMouseMove = function (evt) {
                    set(evt);
                },
                onMouseUp = function (evt) {
                    set(evt);
                    down = false;
                    hit = false;
                },
                init = function () {
                    node.addEventListener('mousedown', onMouseDown);
                    node.addEventListener('mousemove', onMouseMove);
                    node.addEventListener('mouseup', onMouseUp);
                    defs(module, {
                        x: {
                            get: function () {
                                return pointer.x;
                            }
                        },
                        y: {
                            get: function () {
                                return pointer.y;
                            }
                        }
                    });
                },
                module = {
                    ratio: inc.geom.Vec2(1, 1),
                    down: function () {
                        return down;
                    },
                    click: function () {
                        if (hit) {
                            hit = false;
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
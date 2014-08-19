dm.do(
    'Graphics',
    function () {
        'use strict';
        var Graphics = function (id) {
            var canvas = get(id),
                context = canvas.getContext('2d'),
                color = '#fff',
                init = function () {
                    defs(module, {
                        canvas: {
                            get: function () {
                                return canvas;
                            }
                        },
                        context: {
                            get: function () {
                                return context;
                            }
                        }
                    });
                    context.fillStyle = context.strokeStyle = color;
                },
                module = {
                    cls: function (n) {
                        if (n) {
                            context.fillStyle = n;
                        } else {
                            context.fillStyle = '#000';
                        }
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        context.fillStyle = color;
                    },
                    setColor: function (n) {
                        color = n;
                        context.fillStyle = context.strokeStyle = color;
                    },
                    drawRect: function (x, y, w, h) {
                        context.fillRect(x, y, w, h);
                    },
                    lineRect: function (x, y, w, h) {
                        context.strokeRect(x, y, w, h);
                    }
                };

            init();
            return module;
        };

        return Graphics;
    }
);
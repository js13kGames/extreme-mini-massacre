dm.mk(
    'Graphics',
    function () {
        'use strict';
        var Graphics = function (id) {
            var canvas = get(id),
                context = canvas.getContext('2d'),
                color = '#fff',
                alpha = 1,
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
                        context.globalAlpha = 1.0;
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        context.fillStyle = color;
                        context.globalAlpha = alpha;
                    },
                    color: function (n) {
                        color = n;
                        context.fillStyle = context.strokeStyle = color;
                    },
                    alpha: function (n) {
                        context.globalAlpha = n;
                        alpha = n;
                    },
                    rect: function (x, y, w, h) {
                        context.fillRect(x, y, w, h);
                    },
                    lineRect: function (x, y, w, h) {
                        context.strokeRect(x, y, w, h);
                    },
                    make: function (w, h, n) {
                        var c = make('canvas'),
                            ctx = c.getContext('2d');
                        c.width = w;
                        c.height = h;
                        ctx.fillStyle = n;
                        ctx.fillRect(0, 0, c.width, c.height);
                        return c;
                    },
                    line: function (x1, y1, x2, y2) {
                        context.beginPath();
                        context.moveTo(x1, y1);
                        context.lineTo(x2, y2);
                        context.stroke();
                        context.closePath();
                    },
                    drawImg: function (i, x, y) {
                        context.drawImage(i, x, y);
                    }
                };

            init();
            return module;
        };

        return Graphics;
    }
);
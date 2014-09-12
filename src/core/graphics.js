FONT_BLACK = 0;
FONT_WHITE = 1;
isNum = function (n) {
    return typeof n === 'number';
};
isFunc = function (n) {
    return typeof n === 'function';
};
Graphics = function (id) {
    var canvas = _.getElementById(id),
        context = canvas.getContext('2d'),
        color = '#fff',
        alpha = 1,
        FONT_WIDTH = 8,
        FONT_HEIGHT = 7,
        CHARS = 'abcdefghijklmnopqrstuvwxyz 0123456789:.!?',
        font = ASSETS['font'],
        module = {
            canvas: canvas,
            context: context,
            smooth: function (n) {
                context['imageSmoothingEnabled'] = n;
            },
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
            circle: function (x, y, r) {
                context.beginPath();
                context.arc(x, y, r, 0, Math.PI * 2);
                context.fill();
                context.closePath();
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
                var c = _.createElement('canvas'),
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
            },
            drawImgRect: function (i, x, y, sx, sy, sw, sh) {
                context.drawImage(i, sx, sy, sw, sh, x, y, sw, sh);
            },
            text: function (txt, x, y, fontColor, sx, sy, spacingx, spacingy) {
                var i,
                    text = (txt + '').toLowerCase(),
                    len = text.length,
                    idx = -1,
                    line = 0,
                    col = -1,
                    larg = 0;

                fontColor = isNum(fontColor) ? fontColor : FONT_WHITE;
                spacingx = isNum(spacingx) ? spacingx : 0;
                spacingy = isNum(spacingy) ? spacingy : 2;
                context.save();
                context.translate(x, y);
                if (isNum(sx) && isNum(sy)) {
                    context.scale(sx, sy);
                }
                for (i = 0; i < len; ++i) {
                    col++;
                    if (text[i] === '\n') {
                        line++;
                        col = -1;
                    }
                    if (col > larg) {
                        larg = col;
                    }
                    idx = CHARS.indexOf(text[i]);
                    if (idx >= 0 && (fontColor === 0 || fontColor === 1)) {
                        module.drawImgRect(
                            font, ((FONT_WIDTH + spacingx) * col), (line * (FONT_HEIGHT + spacingy)),
                            idx * FONT_WIDTH,
                            fontColor * FONT_HEIGHT,
                            FONT_WIDTH,
                            FONT_HEIGHT
                        );
                    }

                }
                context.restore();
            }
        };

    context.fillStyle = context.strokeStyle = color;
    return module;
};
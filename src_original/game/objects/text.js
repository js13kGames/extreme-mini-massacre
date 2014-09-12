dm.mk(
    'Text',
    function () {
        var FONT_WIDTH = 8,
            FONT_HEIGHT = 7,
            CHARS = 'abcdefghijklmnopqrstuvwxyz 0123456789:.!?';

        return function (x, y, _text) {
            var font = $['font'],
                text = _text.toLowerCase(),
                module = re('Sprite')(x, y).add({
                    color: 1, // 0 = black and 1 = white,
                    spacing: re('geom')['Vec2'](0, 2),
                    setText: function (src) {
                        text = (src + '').toLowerCase();
                    },
                    add: function (src) {
                        text += (src + '').toLowerCase();
                    },
                    draw: function (g) {
                        var i,
                            len = text.length,
                            idx = -1,
                            line = 0,
                            col = -1,
                            larg = 0;

                        g.context.save();
                        g.context.translate(this.pos.x, this.pos.y);
                        g.context.scale(this.scale.x, this.scale.y);
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
                            if (idx >= 0 && (module.color === 0 || module.color === 1)) {
                                g.drawImgRect(
                                    font,
                                    ((FONT_WIDTH + this.spacing.x) * col), 
                                    (line * (FONT_HEIGHT + this.spacing.y)),
                                    idx * FONT_WIDTH,
                                    module.color * FONT_HEIGHT,
                                    FONT_WIDTH,
                                    FONT_HEIGHT
                                );
                            }
                            
                        }
                        this.width = ((larg + 1) * (FONT_WIDTH + this.spacing.x)) * this.scale.x;
                        this.height = ((line + 1) * (FONT_HEIGHT + this.spacing.y)) * this.scale.x;
                        g.context.restore();
                    }
                });

            return module;
        };
    }
);
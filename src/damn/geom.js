dm.mk(
    'geom',
    function () {
        'use strict';
        var sign = function (n) {
                if (n > 0) {
                    return 1;
                } else if (n < 0) {
                    return -1;
                } else {
                    return 0;
                }
            },
            Vec2 = function (x, y) {
                return {
                    x: typeof x === 'number' ? x : 0,
                    y: typeof y === 'number' ? y : 0,
                    add: function (n) {
                        this.x += n.x;
                        this.y += n.y;
                        return this;
                    },
                    sub: function (n) {
                        this.x -= n.x;
                        this.y -= n.y;
                        return this;
                    },
                    clone: function () {
                        return Vec2(this.x, this.y);
                    },
                    copy: function (n) {
                        this.x = n.x;
                        this.y = n.y;
                        return this;
                    },
                    set: function (x, y) {
                        this.x = x;
                        this.y = y;
                        return this;
                    },
                    multiply: function (n) {
                        this.x *= n.x;
                        this.y *= n.y;
                        return this;
                    },
                    scale: function (n) {
                        this.x *= n;
                        this.y *= n;
                        return this;
                    }
                };
            },
            Rect = function (x, y, w, h) {
                return {
                    pos: Vec2(x, y),
                    width: typeof w === 'number' ? w : 0,
                    height: typeof h === 'number' ? h : 0,
                    set: function (x, y, w, h) {
                        this.pos.set(x, y);
                        this.width = w;
                        this.height = h;
                    },
                    intersects: function (n) {
                        var p1 = this.pos,
                            p2 = n.pos;
                        return p1.x < p2.x + n.width &&
                            p1.x + this.width > p2.x &&
                            p1.y < p2.y + n.height &&
                            p1.y + this.height > p2.y;
                    },
                    intersection: function (n) {
                        var inter = Rect();
                        if (this.intersects(n)) {
                            inter.pos.x = Math.max(this.pos.x, n.pos.x);
                            inter.pos.y = Math.max(this.pos.y, n.pos.y);
                            inter.width = Math.min(this.pos.x + this.width, n.pos.x + n.width) - inter.pos.x;
                            inter.height = Math.min(this.pos.y + this.height, n.pos.y + n.height) - inter.pos.y;
                        }
                        return inter;
                    },
                    separate: function (n) {
                        var i,
                            d;

                        if (this.intersects(n)) {
                            i = this.intersection(n),
                            d = re('geom')['Vec2']();
                            if (i.width > i.height) {
                                d.y = sign(this.pos.y - n.pos.y);
                                this.pos.y += i.height * d.y;
                            } else {
                                d.x = sign(this.pos.x - n.pos.x);
                                this.pos.x += i.width * d.x;
                           }
                        }
                    }
                };
            };

        return {
            'Vec2': Vec2,
            'Rect': Rect
        };
    }
);
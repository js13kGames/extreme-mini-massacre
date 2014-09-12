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
            Base = re('Base'),
            Vec2 = function (x, y) {
                return Base({
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
                    },
                    distance: function (n) {
                        return Math.sqrt(
                            (n.x - this.x) * (n.x - this.x) +
                            (n.y - this.y) * (n.y - this.y)
                        );
                    },
                    angle: function (a) {
                        return Math.atan2(a.y - this.y, a.x - this.y);
                    }
                })
            },
            Rect = function (x, y, w, h) {
                var Line = re('Line'),
                    init = function () {
                        module.top = Line(x, y, x + w, y);
                        module.right = Line(x + w, y, x + w, y + h);
                        module.bottom = Line(x + w, y + h, x, y + h);
                        module.left = Line(x, y + h, x, y);
                    },
                    module = Base({
                        pos: Vec2(x, y),
                        origin: Vec2(0, 0),
                        width: typeof w === 'number' ? w : 0,
                        height: typeof h === 'number' ? h : 0,
                        lineIntersections: function (line) {
                            var p = this.top.intersectionPoint(line),
                                points = [];

                            if (p !== null) {
                                points.push(p);
                            }
                            p = this.bottom.intersectionPoint(line);
                            if (p !== null) {
                                points.push(p);
                            }
                            p = this.left.intersectionPoint(line);
                            if (p !== null) {
                                points.push(p);
                            }
                            p = this.right.intersectionPoint(line);
                            if (p !== null) {
                                points.push(p);
                            }

                            return points;
                        },
                        lineIntersection: function (line) {
                            var points = this.lineIntersections(line),
                                point = null,
                                distance = 0,
                                i,
                                len = points.length,
                                tp = null;

                            for (i = 0; i < points.length; ++i) {
                                tp = points[i];
                                if (tp !== null) {
                                    if (point === null) {
                                        point = tp;
                                        distance = line.A.distance(point);
                                    } else if (line.A.distance(tp) < distance) {
                                        point = tp;
                                        distance = line.A.distance(point);
                                    }
                                }
                            }
                            return point;
                        },
                        set: function (x, y, w, h) {
                            this.pos.set(x, y);
                            this.width = w;
                            this.height = h;
                        },
                        intersects: function (n) {
                            var p1 = this.pos,
                                p2 = n.pos;
                            return p1.x - this.origin.x < p2.x - n.origin.x + n.width &&
                                p1.x - this.origin.x + this.width > p2.x - n.origin.x &&
                                p1.y - this.origin.y < p2.y - n.origin.y + n.height &&
                                p1.y - this.origin.y + this.height > p2.y - n.origin.y;
                        },
                        intersection: function (n) {
                            var inter = Rect();
                            if (this.intersects(n)) {
                                inter.pos.x = Math.max(this.pos.x - this.origin.x, n.pos.x - n.origin.x);
                                inter.pos.y = Math.max(this.pos.y - this.origin.y, n.pos.y - n.origin.y);
                                inter.width = Math.min(this.pos.x - this.origin.x + this.width, n.pos.x - n.origin.x + n.width) - inter.pos.x;
                                inter.height = Math.min(this.pos.y - this.origin.y + this.height, n.pos.y - n.origin.y + n.height) - inter.pos.y;
                            }
                            return inter;
                        },
                        updateBounds: function () {
                            this.top.A.set(this.pos.x - this.origin.x, this.pos.y - this.origin.y);
                            this.top.B.set(this.pos.x - this.origin.x + this.width, this.pos.y - this.origin.y);

                            this.right.A.set(this.pos.x - this.origin.x + this.width, this.pos.y - this.origin.y);
                            this.right.B.set(this.pos.x - this.origin.x + this.width, this.pos.y - this.origin.y + this.height);

                            this.bottom.A.set(this.pos.x - this.origin.x + this.width, this.pos.y - this.origin.y + this.height);
                            this.bottom.B.set(this.pos.x - this.origin.x, this.pos.y - this.origin.y + this.height);

                            this.left.A.set(this.pos.x - this.origin.x, this.pos.y - this.origin.y + this.height);
                            this.left.B.set(this.pos.x - this.origin.x, this.pos.y - this.origin.y);
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
                    });
                init();
                return module;
            };

        return {
            'Vec2': Vec2,
            'Rectangle': Rect,
            'ov': function (n, m) {
                return n.intersects(m);
            },
            'sep': function (n, m) {
                var i,
                    d;

                if (n.intersects(m)) {
                    i = n.intersection(m),
                    d = re('geom')['Vec2']();
                    if (i.width > i.height) {
                        d.y = sign(n.pos.y - m.pos.y);
                        n.pos.y += i.height * d.y;
                    } else {
                        d.x = sign(n.pos.x - m.pos.x);
                        n.pos.x += i.width * d.x;
                    }
                    return true;
                }
                return false;
            }
        };
    }
);
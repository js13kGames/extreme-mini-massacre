dm.mk(
    'Sprite',
    function () {
        'use strict';
        return function (x, y) {
            var image = null,
                module = re('Base')({
                    pos: re('geom')['Vec2'](x, y),
                    vel: re('geom')['Vec2'](0, 0),
                    scale: re('geom')['Vec2'](1, 1),
                    origin: re('geom')['Vec2'](0, 0),
                    maxVel: re('geom')['Vec2'](0, 0),
                    bounds: re('geom')['Rect'](x, y),
                    angle: 0,
                    width: 0,
                    height: 0,
                    makeImg: function (w, h, c) {
                        c = c || '#fff';
                        image = G.gfx.make(w, h, c);
                        this.width = w;
                        this.height = h;
                        this.bounds.width = w;
                        this.bounds.height = h;
                    },
                    update: function () {
                        if (this.maxVel.x !== 0) {
                            if (Math.abs(this.vel.x) > this.maxVel.x) {
                                this.vel.x = this.maxVel.x * sgn(this.vel.x);
                            }
                        }
                        if (this.maxVel.y !== 0) {
                            if (Math.abs(this.vel.y) > this.maxVel.y) {
                                this.vel.y = this.maxVel.y * sgn(this.vel.y);
                            }
                        }
                        this.pos.add(this.vel);
                        this.bounds.pos.copy(this.pos).sub(this.origin);
                    },
                    draw: function (gfx) {
                        var ctx = gfx.context;
                        ctx.save();
                        ctx.translate(this.pos.x, this.pos.y);
                        ctx.scale(this.scale.x, this.scale.y);
                        ctx.rotate(this.angle);
                        ctx.translate(-this.origin.x, -this.origin.y);
                        gfx.drawImg(image, 0, 0);
                        ctx.restore();
                    }
                });

            return module;
        };
    }
);
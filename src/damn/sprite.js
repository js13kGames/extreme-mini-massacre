dm.mk(
    'Sprite',
    function () {
        'use strict';
        return function (x, y) {
            var image = null,
                module = re('Base')({
                    pos: re('geom')['Vec2'](x, y),
                    velocity: re('geom')['Vec2'](0, 0),
                    scale: re('geom')['Vec2'](1, 1),
                    origin: re('geom')['Vec2'](0, 0),
                    maxVelocity: re('geom')['Vec2'](0, 0),
                    angle: 0,
                    width: 0,
                    height: 0,
                    makeImage: function (w, h, c) {
                        c = c || '#fff';
                        image = G.gfx.make(w, h, c);
                    },
                    update: function () {
                        if (this.maxVelocity.x !== 0) {
                            if (Math.abs(this.velocity.x) > this.maxVelocity.x) {
                                this.velocity.x = this.maxVelocity.x * sgn(this.velocity.x);
                            }
                        }
                        if (this.maxVelocity.y !== 0) {
                            if (Math.abs(this.velocity.y) > this.maxVelocity.y) {
                                this.velocity.y = this.maxVelocity.y * sgn(this.velocity.y);
                            }
                        }
                        this.pos.add(this.velocity);
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
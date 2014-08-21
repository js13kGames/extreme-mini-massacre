dm.mk(
    'Sprite',
    function () {
        'use strict';
        return function (x, y) {
            var image = null,
                V = re('geom')['Vec2'],
                module = re('geom')['Rectangle'](x, y, 0, 0).add({
                    vel: V(0, 0),
                    scale: V(1, 1),
                    maxVel: V(0, 0),
                    angle: 0,
                    makeImg: function (w, h, c) {
                        c = c || '#fff';
                        image = G.gfx.make(w, h, c);
                        this.width = w;
                        this.height = h;
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
                        //gfx.lineRect(this.pos.x - this.origin.x, this.pos.y -this.origin.y, this.width, this.height);
                    }
                });

            return module;
        };
    }
);
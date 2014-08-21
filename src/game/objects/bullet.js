dm.mk(
    'Bullet',
    function () {
        return function () {
            var visible = false,
                life = 1000,
                timer = 0,
                speed = 20,
                object = re('Sprite')(-100, -100).add({
                    type: 'Bullet',
                    init: function () {
                        this.makeImg(20, 8, '#ffff00');
                        this.origin.set(10, 4);
                        defs(object, {
                            speed: {
                                set: function (n) {
                                    speed = n;
                                },
                                get: function () {
                                    return speed;
                                }
                            }
                        });
                    },
                    kill: function () {
                        visible = false;
                        this.pos.set(-100, -100);
                    },
                    update: function () {
                        if (visible) {
                            this.parent.update();
                            if (ms() - timer > life) {
                                visible = false;
                            }
                        }
                    },
                    draw: function (g) {
                        if (visible) {
                            this.parent.draw(g);
                        }
                    },
                    shoot: function (x, y, angle, v) {
                        if (!visible) {
                            v = v || 0;
                            timer = ms();
                            visible = true;
                            this.pos.set(x, y);
                            this.angle = angle;
                            this.vel.x = -Math.cos(angle) * speed + rnd(-v, v);
                            this.vel.y = -Math.sin(angle) * speed + rnd(-v, v);
                        }
                    }
                });

            return object;
        };
    }
);
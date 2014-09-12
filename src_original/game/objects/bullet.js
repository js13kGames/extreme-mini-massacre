dm.mk(
    'Bullet',
    function () {
        return function () {
            var visible = false,
                life = 1000,
                timer = 0,
                originalSpeed = 30,
                speed = originalSpeed,
                last = re('geom')['Vec2'](),
                particle = re('Particle')(),
                rand = re('geom')['Vec2'](),
                color = '#ffff00',
                radius = 1,
                alpha = 1,
                object = re('Sprite')(-100, -100).add({
                    type: 'Bullet',
                    gunType: 1, // 0 = machine gun, 1 = flame thrower
                    init: function () {
                        this.makeImg(20, 12, '#ffff00');
                        this.origin.set(10, 6);
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
                    kill: function (hit) {
                        var d = this.pos.distance(last) / 2.5,
                            a = this.pos.angle(last);
                        visible = false;
                        particle.color = color;
                        if (hit && (this.gunType === 0 || this.gunType === 2)) {
                            particle.speed = 1.5;
                            particle.start(this.pos.x + Math.cos(a) * d, this.pos.y + Math.sin(a) * d);
                            
                        } else if (hit && this.gunType === 1) {
                            particle.speed = 0.35;
                            particle.start(this.pos.x + Math.cos(a) * d, this.pos.y + Math.sin(a) * d);
                        }
                        this.pos.set(-100, -100);
                    },
                    update: function () {
                        if (visible) {
                            last = this.pos.clone();
                            this.parent.update();
                            if (ms() - timer > life) {
                                visible = false;
                            }
                            if (this.gunType === 1 && speed > 0.5) {

                                this.vel.x = -Math.cos(this.angle) * (speed * 0.5) + rand.x;
                                this.vel.y = -Math.sin(this.angle) * (speed * 0.5) + rand.y;
                                speed -= 1;
                                life = 250;
                                radius += 1.5;
                            } else {
                                life = 1000;
                            }
                        } else {
                            particle.update();
                        }
                    },
                    draw: function (g) {
                        if (visible) {
                            if (this.gunType === 0 || this.gunType === 2) {
                                this.parent.draw(g);
                            } else if (this.gunType === 1 && alpha > 0) {
                                g.alpha(alpha);
                                g.color('rgb(255, ' + color + ', 0)');
                                g.circle(this.pos.x, this.pos.y, radius);
                                g.color('#fff');
                                alpha -= 0.02;
                                g.alpha(1);
                                if (color > 0) {
                                    color-= 15;
                                }
                            }
                        } else {
                            particle.draw(g);
                        }
                    },
                    shoot: function (x, y, angle, v) {
                        if (!visible) {
                            speed = originalSpeed;
                            color = 255;
                            alpha = 1;
                            radius = 1;
                            v = v || 0;
                            timer = ms();
                            visible = true;
                            this.pos.set(x, y);
                            this.angle = angle;
                            rand.set(rnd(-v, v), rnd(-v, v));
                            if (this.gunType === 0 || this.gunType === 2) {
                                this.vel.x = -Math.cos(angle) * speed + rand.x;
                                this.vel.y = -Math.sin(angle) * speed + rand.y;
                            } else if (this.gunType === 1) {
                                this.vel.x = -Math.cos(angle) * (speed * 0.5) + rand.x;
                                this.vel.y = -Math.sin(angle) * (speed * 0.5) + rand.y;
                            }
                        }
                    }
                });

            return object;
        };
    }
);
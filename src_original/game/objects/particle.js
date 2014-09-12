dm.mk(
    'Particle',
    function () {
        return function () {
            var originalRadius = 25,
                radius = originalRadius,
                active = false,
                alpha = 1,
                module = re('Sprite')(0, 0).add({
                    speed: 1,
                    color: '#fff',
                    init: function () {
                        this.makeImg(radius, radius);
                        this.origin.set(radius / 2, radius / 2);
                    },
                    update: function () {
                        if (active) {
                            radius -= (originalRadius * 0.12) * this.speed;
                            if (radius < 0) {
                                active = false;
                            }
                            if (this.color > 0) {
                                this.color -= 10;
                            }
                        }
                    },
                    start: function (x, y) {
                        if (!active) {
                            this.pos.set(x, y);
                            active = true;
                            radius = originalRadius;
                            this.color = 255;
                        }
                    },
                    draw: function (g) {
                        if (active) {
                            //g.color(this.color);
                            g.color('rgb(255, ' + this.color + ', 0)');
                            g.circle(this.pos.x, this.pos.y, radius);
                            g.color('#fff');
                        }
                    }
                });

            return module;
        };
    }
);
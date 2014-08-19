dm.mk(
    'Player',
    function () {
        return function (x, y) {
            var speed = 0.5,
                followMouse = function () {
                    module.angle = Math.atan2(
                        module.pos.y - G.mouse.y,
                        module.pos.x - G.mouse.x
                    );
                },
                drawRay = function (angle) {
                    G.gfx.line(
                        module.pos.x,
                        module.pos.y,
                        module.pos.x - Math.cos(angle) * G.width * 2,
                        module.pos.y - Math.sin(angle) * G.width * 2
                    );
                },
                module = re('Sprite')(x, y).add({
                    init: function () {
                        this.makeImage(20, 20);
                        this.origin.set(10, 10);
                        this.maxVelocity.set(10, 10);
                    },
                    update: function () {
                        if (G.keyboard.down(65)) {
                            this.velocity.x -= speed;
                        } else if (G.keyboard.down(68)) {
                            this.velocity.x += speed;
                        } else {
                            this.velocity.x *= 0.8;
                        }

                        if (G.keyboard.down(87)) {
                            this.velocity.y -= speed;
                        } else if (G.keyboard.down(83)) {
                            this.velocity.y += speed;
                        } else {
                            this.velocity.y *= 0.8;
                        }

                        followMouse();
                        this.parent.update();
                    },
                    draw: function (gfx) {
                        this.parent.draw(gfx);
                        gfx.color('#ff0000');
                        gfx.alpha(0.5);
                        drawRay(this.angle);
                        gfx.color('#fff');
                        gfx.alpha(1.0);

                    }
                });

            return module;
        };
    }
);
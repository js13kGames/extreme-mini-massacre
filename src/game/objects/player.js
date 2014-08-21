dm.mk(
    'Player',
    function () {
        return function (x, y) {
            var speed = 5,
                Bullet = re('Bullet'),
                geom = re('geom'),
                useKeyboard = true,
                oldMouse = geom['Vec2'](),
                mouseMoving = false,
                ray = re('Line')(0, 0, 0, 0),
                rayCollideObjects = [],
                currentBullet = 0,
                delay = 50,
                delayTimer = ms(),
                shoot = function () {
                    if (ms() - delayTimer > delay) {
                        bullets[currentBullet].shoot(module.pos.x, module.pos.y, module.angle, 1);
                        currentBullet++;
                        if (currentBullet > bullets.length - 1) {
                            currentBullet = 0;
                        }
                        delayTimer = ms();
                    }
                },
                followMouse = function () {
                    module.angle = Math.atan2(
                        module.pos.y - G.mouse.y,
                        module.pos.x - G.mouse.x
                    );
                },
                followAxes = function (gamepad) {
                    module.angle = Math.atan2(
                        0 - gamepad.axes[3],
                        0 - gamepad.axes[2]
                    );
                },
                drawRay = function (angle) {
                    ray.A.copy(module.pos);
                    ray.B.set(
                        module.pos.x - Math.cos(angle) * G.width * 2,
                        module.pos.y - Math.sin(angle) * G.width * 2
                    );
                    var p,
                        i,
                        l = rayCollideObjects.length;
                    for (i = 0; i < l; ++i) {
                        p = rayCollideObjects[i].lineIntersection(ray);
                        if (p) {
                            ray.B.copy(p);
                        }
                    }
                    ray.draw(G.gfx);
                },
                keyboardControl = function () {
                    var active = false;
                    if (G.keyboard.down(65)) {
                        module.pos.x -= speed;
                        active = true;
                    } else if (G.keyboard.down(68)) {
                        module.pos.x += speed;
                        active = true;
                    }
                    if (G.keyboard.down(87)) {
                        module.pos.y -= speed;
                        active = true;
                    } else if (G.keyboard.down(83)) {
                        module.pos.y += speed;
                        active = true;
                    }
                    if (G.mouse.x !== oldMouse.x || G.mouse.y !== oldMouse.y) {
                        oldMouse.copy(G.mouse);
                        followMouse();
                        active = true;
                    }
                    if (G.mouse.down()) {
                        shoot();
                    }
                    return active;
                },
                gamepadControl = function () {
                    var gamepad = G.gamepad.getPad(0),
                        active = false,
                        threshold = 0.3;

                    if (!gamepad) return active;
                    if (gamepad.axes[0] < -threshold) {
                        module.pos.x += (speed) * gamepad.axes[0];
                        active = true;

                    } else if (gamepad.axes[0] > threshold) {
                        module.pos.x += (speed) * gamepad.axes[0];
                        active = true;
                    }
                    if (gamepad.axes[1] < -threshold) {
                        module.pos.y += (speed) * gamepad.axes[1];
                        active = true;
                    } else if (gamepad.axes[1] > threshold) {
                        module.pos.y += (speed) * gamepad.axes[1];
                        active = true;
                    }
                    if (Math.abs(gamepad.axes[2]) > threshold || Math.abs(gamepad.axes[3]) > threshold) {
                        followAxes(gamepad);
                    }
                    if (gamepad.buttons[5].pressed || gamepad.buttons[7].pressed) {
                        shoot();
                    }
                    return active;
                },
                onKeyDown = function () {
                    useKeyboard = true;
                },
                bullets = [],
                module = re('Sprite')(x, y).add({
                    bullets: function () {
                        return bullets;
                    },
                    init: function () {
                        module.makeImg(20, 20);
                        module.origin.set(10, 10);
                        module.maxVel.set(7, 7);
                        G.keyboard.addKeyDown(onKeyDown);
                        //G.gfx.context.lineWidth = 5;
                        for (var i = 0; i < 50; i++) {
                            bullets.push(Bullet());
                        }
                    },
                    update: function () {
                        var active = keyboardControl();
                        if (!active && G.gamepad.isSupported()) {
                            active = gamepadControl();
                        }
                        if (!active) {
                            this.vel.set(0, 0);
                        }
                        module.parent.update();
                    },
                    draw: function (gfx) {
                        module.parent.draw(gfx);
                        gfx.color('#ff0000');
                        gfx.alpha(0.5);
                        drawRay(this.angle);
                        gfx.color('#fff');
                        gfx.alpha(1.0);
                    },
                    destroy: function () {
                        G.keyboard.removeKeyDown(onKeyDown);
                    },
                    addCollideObject: function (object) {
                        if (rayCollideObjects.indexOf(object) < 0) {
                            rayCollideObjects.push(object);
                        }
                    },
                    removeCollideObject: function (object) {
                        var i = rayCollideObjects.indexOf(object);
                        if (i >= 0)
                            rayCollideObjects.splice(i, 1);
                    },
                    clearCollideList: function () {
                        rayCollideObjects.length = 0;
                    }
                });

            return module;
        };
    }
);
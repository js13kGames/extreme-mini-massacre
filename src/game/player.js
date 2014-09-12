AMMO = [150, 15, 500, 0];
Player = function (x, y) {
    var image = ASSETS['player'],
        gunImage = ASSETS['guns'],
        speed = 5,
        shootDelay = 80,
        shootTimer = 0,
        currentBullet = 0,
        shooting = false,
        lastAngle = 0,
        rad = 100,
        active = true,
        currentWeapon = 0,
        f = 1,
        gamepadControl = function () {
            var gamepad = pads[0],
                active = false,
                threshold = 0.3;

            if (!gamepad) return active;
            if (gamepad['axes'][0] < -threshold) {
                module.x += (speed) * gamepad['axes'][0];
                active = true;
                f += 0.2;
            } else if (gamepad['axes'][0] > threshold) {
                module.x += (speed) * gamepad['axes'][0];
                active = true;
                f += 0.2;
            }
            if (gamepad['axes'][1] < -threshold) {
                module.y += (speed) * gamepad['axes'][1];
                active = true;
                f += 0.2;
            } else if (gamepad['axes'][1] > threshold) {
                module.y += (speed) * gamepad['axes'][1];
                active = true;
                f += 0.2;
            }
            if (Math.abs(gamepad['axes'][2]) > threshold || Math.abs(gamepad['axes'][3]) > threshold) {
                module.angle = Math.atan2(
                    gamepad['axes'][3] - 0,
                    gamepad['axes'][2] - 0
                );
                module.m.x = module.x + Math.cos(module.angle) * 100;
                module.m.y = module.y + Math.sin(module.angle) * 100;
            }
            if (gamepad['buttons'][5]['pressed'] || gamepad['buttons'][7]['pressed']) {
                shoot();
            }
            if (gamepad['buttons'][14]['pressed']) {
                module.gunType = currentWeapon;
                if (currentWeapon === 0) {
                    shootDelay = 80;
                } else if (currentWeapon === 1) {
                    shootDelay = 800;
                } else if (currentWeapon === 2) {
                    shootDelay = 0;
                }
            } else if (gamepad['buttons'][15]['pressed']) {
                module.gunType = 3;
            }
            return active;
        },
        shoot = function (p) {
            if (module.gunType === 0 || module.gunType === 1) {
                if (ms() - shootTimer > shootDelay && AMMO[module.gunType] <= 0) {
                    module.showL = false;
                    SOUNDS.play('em');
                    shootTimer = ms();
                }
            }
            if (module.gunType === 1)
                module.showL = false;
            if (ms() - shootTimer > shootDelay) {
                if (module.gunType !== 3 && AMMO[module.gunType] <= 0) {
                    module.showL = false;
                    return;
                }
                if (module.gunType === 0) {
                    AMMO[module.gunType]--;
                    module.bullets[currentBullet].speed = 25;
                    module.bullets[currentBullet].life = 1000;
                    module.bullets[currentBullet].type = 0;

                    module.activeBullets.push(module.bullets[currentBullet].shoot(module.x + Math.cos(module.angle) * 50, module.y + Math.sin(module.angle) * 50, module.angle));
                    currentBullet++;
                    if (currentBullet > module.bullets.length - 1) {
                        currentBullet = 0;
                    }
                    shootTimer = ms();
                    STATE.shake(2, 100);
                    SOUNDS.play('mg');
                    shooting = true;
                    shootDelay = 80;
                    module.showL = true;
                } else if (module.gunType === 1) {
                    AMMO[module.gunType]--;
                    var next = currentBullet + 3,
                        old = currentBullet;
                    if (next > module.bullets.length - 1) {
                        old = currentBullet = 0;
                        next = 3;
                    }

                    for (currentBullet = old; currentBullet < next; ++currentBullet) {
                        module.bullets[currentBullet].speed = 35;
                        module.bullets[currentBullet].life = 1000;
                        module.bullets[currentBullet].type = 0;
                        module.activeBullets.push(module.bullets[currentBullet].shoot(module.x + Math.cos(module.angle) * 50, module.y + Math.sin(module.angle) * 50, module.angle, 5));
                    }
                    if (currentBullet > module.bullets.length - 1) {
                        currentBullet = 0;
                    }
                    shootTimer = ms();
                    STATE.shake(4, 100);
                    SOUNDS.play('sg');
                    shooting = true;
                    shootDelay = 500;
                    module.showL = true;
                } else if (module.gunType === 2) {
                    AMMO[module.gunType]--;
                    module.bullets[currentBullet].speed = 10;
                    module.bullets[currentBullet].life = 200;
                    module.bullets[currentBullet].type = 1;
                    module.activeBullets.push(module.bullets[currentBullet].shoot(module.x + Math.cos(module.angle) * 80, module.y + Math.sin(module.angle) * 80, module.angle, 5));
                    currentBullet++;
                    if (currentBullet > module.bullets.length - 1) {
                        currentBullet = 0;
                    }
                    shootTimer = ms();
                    // STATE.shake(4, 100);
                    SOUNDS.play('ft');
                    //shooting = true;
                    shootDelay = 0;
                    module.showL = true;
                } else if (module.gunType === 3) {
                    module.bullets[currentBullet].speed = 0;
                    module.bullets[currentBullet].life = 90;
                    module.bullets[currentBullet].type = 2;
                    module.activeBullets.push(module.bullets[currentBullet].shoot(module.x + 5 + Math.cos(module.angle) * 80, module.y + 5 + Math.sin(module.angle) * 80, module.angle, 0));
                    currentBullet++;
                    if (currentBullet > module.bullets.length - 1) {
                        currentBullet = 0;
                    }
                    if (p) {
                        SOUNDS.play('sw');
                    }
                    shootTimer = ms();
                    shootDelay = 0;
                    module.showL = false;
                }
            }
        },
        lineIntersection = function (a, b) {
            var bx = a.x2 - a.x1,
                by = a.y2 - a.y1,
                dx = b.x2 - b.x1,
                dy = b.y2 - b.y1,
                cr = bx * dy - by * dx,
                cx, cy, t, u;
            if (cr === 0) {
                return null;
            } else {
                cx = b.x1 - a.x1;
                cy = b.y1 - a.y1;
                t = (cx * dy - cy * dx) / cr;
                if (t < 0 || t > 1) {
                    return null;
                }
                u = (cx * by - cy * bx) / cr;
                if (u < 0 || u > 1) {
                    return null;
                }
                return {
                    x: a.x1 + t * bx,
                    y: a.y1 + t * by
                };
            }
        },
        module = {
            z: 0,
            x: x,
            y: y,
            angle: 0,
            width: 35,
            height: 35,
            origin: {
                x: 17.5,
                y: 17.5
            },
            bullets: [],
            activeBullets: [],
            m: {
                x: 0,
                y: 0
            },
            gunType: 2,
            showL: false,
            hit: false,
            moving: false,
            init: function () {
                for (var i = 0; i < 150; ++i) {
                    var b = Bullet(this);
                    module.bullets.push(b);
                }
                currentWeapon = OLD_GUN;
                module.gunType = OLD_GUN;
            },
            update: function () {
                if (!active) return;
                if (module.gunType === 3 && lastAngle !== module.angle) {
                    shoot((Math.abs(lastAngle) - Math.abs(module.angle) >= .05));
                    lastAngle = module.angle;
                }
                module.z = module.y;
                module.moving = false;
                if (keyboard[65]) {
                    module.x -= speed;
                    f += 0.2;
                    module.moving = true;
                } else if (keyboard[68]) {
                    module.x += speed;
                    module.moving = true;
                    f += 0.2;
                }
                if (keyboard[87]) {
                    module.y -= speed;
                    module.moving = true;
                    f += 0.2;
                } else if (keyboard[83]) {
                    module.y += speed
                    module.moving = true;
                    f += 0.2;
                }
                module.angle = Math.atan2(module.m.y - module.y, module.m.x - module.x);
                if (mouse.down === true) {
                    shoot();
                } else {
                    module.showL = false;
                }
                if (keyboard[81]) {
                    module.gunType = currentWeapon;
                    if (currentWeapon === 0) {
                        shootDelay = 80;
                    } else if (currentWeapon === 1) {
                        shootDelay = 800;
                    } else if (currentWeapon === 2) {
                        shootDelay = 0;
                    }
                } else if (keyboard[69]) {
                    module.gunType = 3;
                }
                if (!module.moving) {
                    gamepadControl();
                }
                OLD_GUN = module.gunType;
                STATE.enemies.forEach(function (e) {
                    if (Collision.overlap(e, module)) {
                        if (e.life > 0) {
                            STATE.fadeOut = true;
                            e.active = false;
                            e.life = 0;
                            STATE.shake(3, 200);
                            active = false;
                            STATE.die = true;
                        } else {
                            if (e.type === 0) {
                                if (currentWeapon === 0) {
                                    AMMO[currentWeapon] += 20;
                                } else if (currentWeapon === 1) {
                                    AMMO[currentWeapon] += 5;
                                } else if (currentWeapon === 2) {
                                    AMMO[currentWeapon] += 50;
                                }

                            } else if (e.type === 1) {
                                currentWeapon = e.gunType;
                                module.gunType = e.gunType;
                                OLD_GUN = currentWeapon;
                                AMMO = [150, 15, 500, 0];
                            }
                            SOUNDS.play('am');
                            e.kill();
                        }
                    }
                });
            },
            kill: function () {
                STATE.fadeOut = true;
                STATE.shake(4, 200);
                active = false;
                STATE.die = true;
                SOUNDS.play('ex');
            },
            draw: function (g) {
                if (!active) return;
                var ctx = g.context;
                if (module.showL) {
                    ctx.beginPath();
                    for (var i = 0; i < 90; ++i) {
                        var a = (i * 4) * Math.PI / 180,
                            l1 = {
                                x1: module.x,
                                y1: module.y,
                                x2: module.x + Math.cos(a) * 600,
                                y2: module.y + Math.sin(a) * 600
                            };

                        for (var j = 0; j < STATE.tiles.length; ++j) {
                            var t = STATE.tiles[j],
                                n,
                                e;
                            for (h in t.lines) {
                                e = t.lines[h];
                                n = lineIntersection(l1, e);
                                if (n !== null) {
                                    l1.x2 = n.x;
                                    l1.y2 = n.y;
                                }
                            }
                        }
                        for (var j = 0; j < STATE.enemies.length; ++j) {
                            var t = STATE.enemies[j],
                                n,
                                e;
                            for (h in t.lines) {
                                e = t.lines[h];
                                n = lineIntersection(l1, e);
                                if (n !== null) {
                                    l1.x2 = n.x;
                                    l1.y2 = n.y;
                                }
                            }
                        }
                        if (i == 0) {
                            ctx.moveTo(l1.x2, l1.y2);
                        } else {
                            ctx.lineTo(l1.x2, l1.y2);
                        }
                    }
                    g.color('#fff');
                    g.alpha(0.1);
                    ctx.fill();
                    ctx.closePath();
                    g.alpha(1);
                }
                ctx.save();
                ctx.translate(module.x, module.y + Math.sin(f) * 5);
                ctx.translate(-module.width / 2, -module.height / 2);
                g.color('#000');
                g.alpha(0.2);
                g.circle(20, 40, 20);
                g.alpha(1);
                ctx.drawImage(image, 0, 0, image.width, image.height, 0, Math.sin(f) * 5, 40, 40);
                ctx.translate(20, 20);
                ctx.rotate(module.angle);
                var sc = 1;
                if (module.gunType === 3) {
                    sc = 1.5;
                }
                ctx.drawImage(
                    gunImage,
                    module.gunType * 10,
                    0,
                    10,
                    7,
                    20, -10,
                    40 * sc,
                    28 * sc
                );
                if (shooting && module.gunType < 2) {
                    g.color('#fff');
                    g.circle(70, -6, 25);
                    shooting = false;
                }
                ///}
                ctx.restore();
                if (module.gunType === 3) {
                    var b;
                    ctx.beginPath();
                    for (var i = 0; i < module.activeBullets.length; i++) {
                        b = module.activeBullets[i];
                        if (i === 0) {
                            ctx.moveTo(module.x + Math.cos(module.angle), module.y + Math.sin(module.angle));
                        } else {
                            ctx.lineTo(b.x, b.y);
                        }
                    }
                    g.alpha(0.5);
                    g.color('#fff');
                    ctx.fill();
                    ctx.closePath();
                    g.alpha(1);
                }
            }
        };
    return module;
};
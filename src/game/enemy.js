Enemy = function (t) {
    var image,
        weaponImage = ASSETS['guns'],
        active = false,
        rad = 100,
        last = {
            x: 0,
            y: 0
        },
        des = false,
        a = 0,
        bullets = [],
        currentBullet = 0,
        shootRate = 1800,
        shootTimer = 0,
        path = [],
        currentPoint = 0,
        askPathTimer = 0,
        askPathLife = 1000,
        shoot = function () {
            if (bullets[currentBullet]) {
                var a = Math.atan2(module.player.y - module.y, module.player.x - module.x);
                bullets[currentBullet].speed = 2;
                bullets[currentBullet].life = 10000;
                bullets[currentBullet].shoot(module.x, module.y, a, 0);
                module.activeBullets.push(bullets[currentBullet]);
                currentBullet++;
                if (currentBullet > bullets.length) {
                    currentBullet = 0;
                }
            }
        },
        pos = {
            x: 0,
            y: 0
        },
        module = {
            gunType: 0,
            type: t,
            player: null,
            x: -100,
            y: -100,
            width: 30,
            height: 30,
            origin: {
                x: 15,
                y: 15
            },
            z: 0,
            speed: 2,
            life: 1,
            realLife: 3,
            hit: false,
            lines: {},
            isAmmo: false,
            activeBullets: [],
            init: function () {

                if (module.type === 0) {
                    image = ASSETS['enemy1'];
                } else {
                    image = ASSETS['enemy2'];
                    for (var i = 0; i < 20; ++i) {
                        var b = Bullet(this);
                        bullets.push(b);
                        STATE.add(b);
                    }
                    shootTimer = ms();
                }

                module.lines.top = {
                    x1: module.x,
                    y1: module.y,
                    x2: module.x + module.width,
                    y2: module.y
                };
                module.lines.bottom = {
                    x1: module.x,
                    y1: module.y + module.height,
                    x2: module.x + module.width,
                    y2: module.y + module.height
                };
                module.lines.left = {
                    x1: module.x,
                    y1: module.y,
                    x2: module.x,
                    y2: module.y + module.height
                };
                module.lines.right = {
                    x1: module.x + module.width,
                    y1: module.y,
                    x2: module.x + module.width,
                    y2: module.y + module.height
                };
                module.life = module.realLife;
            },
            set: function (x, y) {
                if (!active) {
                    active = true;
                    pos.x = x;
                    pos.y = y;
                    module.x = x;
                    module.y = y;
                    module.life = 3;
                    module.speed = rnd(1, 2);
                    if (module.type === 1) {
                        module.speed = 1;
                    }
                    if (rnd(0, 100) > 80) {
                        module.isAmmo = true;
                    } else {
                        module.isAmmo = false;
                    }
                    des = false;
                    module.gunType = Math.floor(rnd(0, 3));
                    shootTimer = ms();
                }
            },
            update: function () {
                if (active) {
                    if (module.player !== null) {
                        if (path.length > 0) {
                            var p = path[1];
                            if (p) {
                                var targetX = p[0] * 40,
                                    targetY = p[1] * 40,
                                    dx = targetX - (module.x + 15),
                                    dy = targetY - (module.y + 15),
                                    angle = Math.atan2(dy, dx),
                                    distance = Math.sqrt(dx * dx + dy * dy);

                                if (distance < module.speed) {
                                    path.splice(0, 1);
                                } else {
                                    module.x += Math.cos(angle) * module.speed;
                                    module.y += Math.sin(angle) * module.speed;
                                }
                            }
                        }
                        if (module.player.moving || path.length == 0) {
                            if (ms() - askPathTimer > askPathLife) {
                                path = findPath(
                                    STATE.baseLayer, [
                                        Math.floor(module.x / 40) + 1,
                                        Math.floor(module.y / 40) + 1
                                    ], [
                                        Math.floor((module.player.x + 15) / 40) + 1,
                                        Math.floor((module.player.y + 15) / 40) + 1
                                    ]
                                );
                            }
                        }
                        module.activeBullets.forEach(function (b) {
                            if (Collision.overlap(b, module.player)) {
                                b.kill(100);
                                module.player.kill();
                            }
                        });
                    }

                    if (ms() - shootTimer > shootRate) {
                        shoot();
                        shootTimer = ms();
                    }

                    if (module.life <= 0) {
                        active = false;
                        STATE.shake(2, 100);
                        SOUNDS.play('sg');
                        last.x = module.x;
                        last.y = module.y;
                        if (!module.isAmmo) {
                            module.x = module.y = -100;
                        } else {
                            image = ASSETS['ammo'];
                        }
                        KILLS++;
                    }
                    module.lines.top = {
                        x1: module.x,
                        y1: module.y,
                        x2: module.x + module.width,
                        y2: module.y
                    };
                    module.lines.bottom = {
                        x1: module.x,
                        y1: module.y + module.height,
                        x2: module.x + module.width,
                        y2: module.y + module.height
                    };
                    module.lines.left = {
                        x1: module.x,
                        y1: module.y,
                        x2: module.x,
                        y2: module.y + module.height
                    };
                    module.lines.right = {
                        x1: module.x + module.width,
                        y1: module.y,
                        x2: module.x + module.width,
                        y2: module.y + module.height
                    };
                }
            },
            kill: function () {
                active = false;
                module.x = -100;
                module.y = -100;
                module.lines.top = {
                    x1: module.x,
                    y1: module.y,
                    x2: module.x + module.width,
                    y2: module.y
                };
                module.lines.bottom = {
                    x1: module.x,
                    y1: module.y + module.height,
                    x2: module.x + module.width,
                    y2: module.y + module.height
                };
                module.lines.left = {
                    x1: module.x,
                    y1: module.y,
                    x2: module.x,
                    y2: module.y + module.height
                };
                module.lines.right = {
                    x1: module.x + module.width,
                    y1: module.y,
                    x2: module.x + module.width,
                    y2: module.y + module.height
                };
                rad = 100;
                des = true;
            },
            draw: function (g) {
                if (active) {
                    module.z = module.y;
                    g.color('#000');
                    g.alpha(0.2);
                    g.circle(module.x, module.y + 15, 10);
                    g.alpha(1);
                    g.context.save();
                    g.context.translate(module.x, module.y + Math.sin(a) * 5);
                    g.context.drawImage(image, 0, 0, 10, 10, -15, -15, module.width, module.width);
                    g.context.restore();

                } else {
                    if (module.life <= 0 && rad > 0 && !des) {
                        g.color('#fff');
                        g.circle(last.x + 15, last.y + 15, rad);
                        rad -= 20;
                        if (rad < 0) {
                            rad = 0;
                        }
                    }
                    if (module.isAmmo) {
                        g.context.save();
                        g.context.translate(module.x, module.y + Math.sin(a) * 5);
                        module.z = module.y;
                        if (module.type === 0) {
                            g.context.drawImage(image, 0, 0, 10, 10, 0, 0, module.width, module.width);
                        } else {
                            g.context.drawImage(
                                weaponImage,
                                module.gunType * 10,
                                0,
                                10,
                                7,
                                0,
                                0,
                                40,
                                28
                            );
                        }
                        g.context.restore();
                    }
                }
                a += 0.2;
            }
        };

    return module;
};
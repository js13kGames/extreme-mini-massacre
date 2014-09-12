Bullet = function (parent) {
    var image,
        shoot = false,
        timer = 0,
        showExp = false,
        color = 255,
        rad = 25,
        module = {
            life: 1000,
            parent: parent,
            x: 0,
            y: 0,
            width: 20,
            height: 15,
            angle: 0,
            origin: {
                x: 10,
                y: 6
            },
            speed: 25,
            vel: {
                x: 0,
                y: 0
            },
            z: 0,
            type: 0,
            init: function () {
                image = GFX.make(module.width, module.height, '#FFDE82');
            },
            kill: function (f) {
                if (shoot) {
                    rad = f || 25;
                    shoot = false;
                    var idx = parent.activeBullets.indexOf(module);
                    if (idx >= 0) {
                        parent.activeBullets.splice(idx, 1);
                    }
                    module.z = 10000000;
                    showExp = true;
                }
            },
            shoot: function (x, y, angle, rand) {
                if (!shoot) {
                    rand = rand || 1;
                    var r = rnd(-rand, rand);

                    rad = 25;
                    if (module.type === 2) {
                        rad = 4;
                        r = 0;
                    }
                    module.x = x;
                    module.y = y;
                    module.vel.x = Math.cos(angle) * module.speed + r;
                    module.vel.y = Math.sin(angle) * module.speed + r;
                    module.angle = angle;
                    timer = ms();
                    shoot = true;
                    color = 255;
                    
                }
                return module;
            },
            update: function () {
                if (shoot) {
                    module.z = module.y;
                    module.x += module.vel.x;
                    module.y += module.vel.y;
                    if (ms() - timer > module.life || (module.x < 0 || module.y < 0 || module.x > GAME_WIDTH || module.y > GAME_HEIGHT)) {
                        shoot = false;
                        var idx = parent.activeBullets.indexOf(module);
                        if (idx >= 0) {
                            parent.activeBullets.splice(idx, 1);
                        }
                    }
                }
            },
            draw: function (g) {

                if (module.type === 0) {
                    if (shoot) {
                        var ctx = g.context;
                        ctx.save();
                        ctx.translate(module.x, module.y);
                        ctx.rotate(module.angle);
                        ctx.translate(-module.width / 2, -module.height / 2);
                        g.drawImg(image, 0, 0);
                        g.color('#FFECC5');
                        g.circle(module.width, module.height / 2, module.height / 2);
                        ctx.restore();
                    } else {
                        if (showExp) {
                            g.color('#fff');
                            g.circle(module.x, module.y, 30);
                            showExp = false;
                        }
                    }
                } else if (module.type === 1) {
                    if (shoot) {
                        g.color('rgb(255,'+(color)+', 0)');
                        g.circle(module.x, module.y, rad);
                        if (color > 0) {
                            color -= 20;
                            rad -= 1.5;
                            if (color < 0) {
                                color = 0;
                            }
                        }
                    }
                }
            }
        };
    return module;
};
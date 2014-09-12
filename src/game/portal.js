Portal = function (x, y) {
    var active = true,
        rad = 100,
        timerLife = 0,
        timerCount = 0,
        spawnTimer = function () {
            if (STATE.addEnemy && module.life > 0) {
                timerLife = rnd(1500, 3000);
                STATE.addEnemy(module.x, module.y);
                timerCount = ms();
            }
        },
        timer,
        module = {
            x: x,
            y: y,
            width: 50,
            height: 60,
            life: 1,
            realLife: 30,
            origin: {
                x: 0,
                y: 0
            },
            hit: false,
            lines: {},
            init: function () {
                timerLife = rnd(1500, 3000);
                timerCount = ms();
                module.life = module.realLife;
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
            },
            draw: function (g) {
                if (active) {
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
                    if (module.life <= 0) {
                        module.width = module.height = 0;
                        active = false;
                        SOUNDS.play('ex');
                        STATE.shake(5, 300);
                        delete module.lines;
                    }
                    g.color('#D53E3C');
                    g.rect(module.x, module.y, module.width, module.height);
                    g.color('#000');
                    g.rect(module.x + 10, module.y + 10, module.width - 20, module.height - 10);
                    g.color('#5a5a5a');
                    g.rect(module.x - 5, module.y - 20, 60, 10);
                    g.color('#18943D')
                    g.rect(module.x - 5, module.y - 20, 60 * module.life / module.realLife, 10);
                    if (module.hit) {
                        module.hit = false;
                        g.color('#fff');
                        g.rect(module.x, module.y, module.width, module.height);
                    }
                    if (ms() - timerCount > timerLife) {
                        spawnTimer();
                    }
                } else {
                    if (rad > 0) {
                        g.color('#fff');
                        g.circle(module.x + 25, module.y + 30, rad);
                        rad -= 10;
                        if (rad < 0) {
                            rad = 0;
                        }
                    }
                }
            }
        };
    return module;
};
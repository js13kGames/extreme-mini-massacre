LAST_POS = {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2
};
LAST_SIDE = 0;
MOVES = [];
OLD_GUN = 0;
KILLS = 0;
PLAYED = false;
Room = function () {
    var ROOMS = [
            [
                [11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 11],
                [9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 7],
                [9, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7],
                [9, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7],
                [11, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            [
                [11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 11],
                [11, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 1, 11],
                [11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 11],
                [9, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7],
                [9, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7],
                [9, 1, 0, -1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7],
                [11, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            [
                [11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 1, 11],
                [9, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 7],
                [9, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 7],
                [9, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 7],
                [11, 1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 1, 11],
                [11, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ],
            [
                [11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 11],
                [9, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 7],
                [9, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, 0, 0, 0, 3, 7],
                [9, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 7],
                [9, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 7],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 11],
                [11, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                [11, 11, 11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            ]
        ],
        lastMouse = {
            x: 0,
            y: 0
        },
        baseLayer = ROOMS[Math.floor(rnd(0, 4))],
        tiles = [],
        collisionLayer = [],
        changeRoomLayer = [],
        player,
        fadeIn = true,
        alphaFade = 1,
        active = false,
        crosshair,
        crosshairAngle = 0,
        crosshairScale = 2,
        crosshairAdd = 0.02,
        shake = false,
        shakeForce = 2,
        shakeLife = 0,
        shakeTimer = 0,
        off = {
            x: 0,
            y: 0
        },
        portals = [],
        enemyIndex = 0,
        enemies = [],
        toRemove = 4,
        addEnemy = function (x, y) {
            enemies[enemyIndex].set(rnd(x - 20, x + 30), rnd(y - 20, y + 50));
            enemyIndex++;
            if (enemyIndex > enemies.length - 1) {
                enemyIndex = 0;
            }
        },
        s = State({
            create: function () {
                PLAYED = true;
                this.baseLayer = baseLayer;
                this.addEnemy = addEnemy;
                this.die = false;
                this.fadeOut = false;
                GFX.canvas.style.cursor = 'none'
                crosshair = _.createElement('canvas');
                crosshair.width = crosshair.height = 20;
                var ctx = crosshair.getContext('2d');
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(10, 0);
                ctx.lineTo(10, 20);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, 10);
                ctx.lineTo(20, 10);
                ctx.closePath();
                ctx.stroke();
                ctx.clearRect(6, 6, 8, 8);
                var a = Math.floor(rnd(7, 11));
                while (a == LAST_SIDE) {
                    a = Math.floor(rnd(7, 11));
                }
                player = Player(LAST_POS.x, LAST_POS.y);
                this.add(player);
                for (var i = 0; i < player.bullets.length; i++) {
                    this.add(player.bullets[i]);
                }
                toRemove = a - 4;
                var count = 2;
                while (count > 0) {
                    var r1 = Math.floor(rnd(4, 14)),
                        r2 = Math.floor(rnd(4, 11)),
                        t = baseLayer[r1];

                    if (!isDef(t)) continue;
                    t = t[r2];
                    if (t === 0) {
                        baseLayer[r1][r2] = 1;
                        count--;
                    }
                }
                for (var y = 0; y < baseLayer.length; ++y) {
                    for (var x = 0; x < baseLayer[y].length; ++x) {
                        if (baseLayer[y][x] > 0 || baseLayer[y][x] === null) {
                            var s = 0,
                                tile;
                            if (y === 1) {
                                s = 0;
                            } else if (y === baseLayer.length - 2) {
                                s = 1;
                            } else if (x === 1) {
                                s = 2;
                            } else if (x === baseLayer[y].length - 2) {
                                s = 3;
                            } else {
                                s = 1.5;
                            }
                            tile = Tile((x - 1) * 40, (y - 1) * 40, s, baseLayer[y][x] == null ? 1 : baseLayer[y][x]);
                            if (baseLayer[y][x] < 7) {
                                tiles.push(tile);
                                this.add(tile);
                            } else {
                                changeRoomLayer.push(tile);
                            }
                        } else if (baseLayer[y][x] === -1) {
                            var p = Portal((x) * 40, (y) * 32);

                            this.add(p);
                            tiles.push(p);
                            portals.push(p);

                        }
                    }
                }
                this.tiles = tiles;
                this.enemies = enemies;

                portals.forEach(function (n) {
                    portals.forEach(function (p) {
                        if (n !== p) {
                            Collision.separate(p, n);
                        }
                    });
                });

                tiles.forEach(function (n) {
                    portals.forEach(function (p) {
                        Collision.separate(p, n);
                    });
                });
                tiles.forEach(function (n) {
                    Collision.separate(player, n);
                });

                for (var i = 0; i < 100; ++i) {
                    var e = Enemy(Math.floor(rnd(0, 2)));
                    e.player = player;
                    this.add(e);
                    this.enemies.push(e);
                }
            },
            shake: function (f, t) {
                if (!shake) {
                    shakeForce = f;
                    shakeLife = t;
                    shakeTimer = ms();
                    shake = true;
                }
            },
            update: function () {
                off.x = -(player.x - GAME_WIDTH / 2);
                off.y = -(player.y - GAME_HEIGHT / 2);
                if (!active) return;
                if (mouse.x !== lastMouse.x || mouse.y !== lastMouse.y || player.moving) {
                    player.m.x = mouse.x;
                    player.m.y = mouse.y;
                    player.m.x -= off.x;
                    player.m.y -= off.y;
                    lastMouse.x = mouse.x;
                    lastMouse.y = mouse.y;
                }
                LAST_POS.x = player.x;
                LAST_POS.y = player.y;
                this.parent.update();
                tiles.forEach(function (n) {
                    Collision.separate(player, n);
                    STATE.enemies.forEach(function (e) {
                        if (!isDef(n.life)) {
                            Collision.separate(e, n);
                        }
                    });
                    player.activeBullets.forEach(function (b) {
                        if (b && Collision.overlap(b, n)) {
                            if (n.life && player.gunType !== 3 && player.gunType !== 2) {
                                n.life--;
                                n.hit = true;
                            } else if (n.life) {
                                n.life -= 0.2;
                                n.hit = true;
                                if (player.gunType === 2) {
                                    //n.life -= 2;
                                }
                            }
                            b.kill();
                        }
                        STATE.enemies.forEach(function (e) {
                            if (b && Collision.overlap(b, e)) {
                                if (e.life) {
                                    if (player.gunType === 0) {
                                        e.life = 0;
                                    } else if (player.gunType === 1) {
                                        e.life = 0;
                                    } else if (player.gunType === 2) {
                                        e.life--;
                                    } else if (player.gunType === 3) {
                                        e.life -= 0.8;
                                    }
                                }
                                if (!e.isAmmo) b.kill();
                            }
                        });
                    });
                });
                for (var i = 0; i < changeRoomLayer.length; ++i) {
                    var n = changeRoomLayer[i];

                    if (Collision.overlap(player, n)) {
                        SOUNDS.play('dr');
                        this.fadeOut = true;
                        active = false;
                        if (n.ID === 10) {
                            LAST_POS.y = GAME_HEIGHT - player.height - 20;
                            LAST_SIDE = 8;
                            MOVES.push(10);
                        } else if (n.ID === 8) {
                            LAST_POS.y = player.height + 20;
                            LAST_SIDE = 10;
                            MOVES.push(8);
                        }
                        if (n.ID === 9) {
                            LAST_POS.x = GAME_WIDTH - player.width - 20;
                            LAST_SIDE = 7;
                            MOVES.push(9);
                        } else if (n.ID === 7) {
                            LAST_POS.x = player.width + 20;
                            LAST_SIDE = 9;
                            MOVES.push(7);
                        }
                        return;
                    }
                }
                var c = 0;
                portals.forEach(function (p) {
                    if (p.life <= 0) {
                        c++;
                    }
                });
                if (c === portals.length) {
                    tiles.forEach(function (t) {
                        if (t.ID === toRemove) {
                            var i = tiles.indexOf(t),
                                j = portals.indexOf(t);
                            if (i >= 0) {
                                tiles.splice(i, 1);
                                portals.splice(j, 1);
                            }
                            STATE.remove(t);
                        }
                    });
                }
            },
            draw: function (g) {
                g.cls('#071A2B');

                g.context.save();
                g.context.beginPath();


                g.context.save();

                if (shake) {
                    off.x += shakeForce | 0;
                    off.y += shakeForce | 0;
                    shakeForce *= -1;
                    if (ms() - shakeTimer > shakeLife) {
                        shake = false;
                    }
                }

                g.context.translate(off.x | 0, off.y | 0);
                g.context.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                g.context.clip();
                g.color('#163338');
                g.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                g.color('#242938');
                g.rect(0, 0, GAME_WIDTH, 60);
                this.parent.draw(g);
                g.context.closePath();
                g.context.restore();
                g.context.save();
                g.context.translate(off.x | 0, off.y | 0);
                g.context.save();
                g.context.translate(player.m.x, player.m.y);
                g.context.rotate(crosshairAngle);
                g.context.scale(crosshairScale, crosshairScale);
                g.context.translate(-10, -10);
                g.drawImg(crosshair, 0, 0);
                g.context.restore();

                g.context.restore();

                crosshairAngle += 0.1;
                if (crosshairScale > 2.2 || crosshairScale < 1.8) {
                    crosshairAdd *= -1;
                }
                crosshairScale += crosshairAdd;
                if (fadeIn && alphaFade > 0) {
                    alphaFade -= 0.025;
                    if (alphaFade < 0) {
                        alphaFade = 0;
                        fadeIn = false;
                        active = true;
                    }
                    g.color('#000');
                    g.alpha(alphaFade);
                    g.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                    g.alpha(1);
                } else if (this.fadeOut && alphaFade < 1) {
                    alphaFade += 0.025;
                    if (alphaFade > 1) {
                        alphaFade = 1;
                        this.fadeOut = false;
                        if (this.die) {
                            setState(Map);
                            mouse.down = false;
                        } else {
                            setState(Room);
                        }
                    }
                    g.color('#000');
                    g.alpha(alphaFade);
                    g.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                    g.alpha(1);
                }
                g.text('ammo:' + AMMO[player.gunType], 0, 4, 0, 2, 2);
                g.text('ammo:' + AMMO[player.gunType], 0, 0, 1, 2, 2);
                //test
                //

            },
            destroy: function () {
                tiles.length = 0;
                changeRoomLayer.length = 0;
                this.clear();
                delete this.enemies;
                delete this.tiles;
            }
        });
    return s;
};
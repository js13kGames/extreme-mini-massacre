dm.mk(
    'PlayState',
    function () {
        return function () {
            var player,
                rect,
                geom = re('geom'),
                boxes = [],
                quadTree = re('QuadTree')(0, 0, G.width, G.height),
                onOverlap = function (n, m) {
                    if (m.kill) {
                        m.kill(true);
                    } else {
                        m.separate(n);
                    }
                },
                handleCollisionCallback = function (n, r, callback) {
                    r.forEach(function (x) {
                        if (x !== n) {
                            if (n.intersects) {
                                if (n.intersects(x) && callback) {
                                    callback(n, x);
                                }
                            }
                        }
                    });
                },
                startShake = false,
                shakeLife = 100,
                shakeTimer = 0,
                audio = new ArcadeAudio(),
                shake = re('geom')['Vec2'](),
                helloWorld = re('Text')(20, 20, 'Testing BitmapFont module.\nI can add new lines\n\nabcdefghijklmnopqrstuvwxyz \n0123456789:.!?'),
                PlayState = G.states.create({
                    onCreate: function () {
                        audio.add('shotgun', 10, [
                            [3,,0.3708,0.5822,0.3851,0.0584,,-0.0268,,,,-0.0749,1,,,,,,2,,,,,0.5]
                        ]);
                        audio.add('gun', 10, [
                            [1,,0.2,,,0.1,,,,,,,,,,,1,,0.5,,,,,0.5]
                        ]);
                        audio.add('flamethrower', 10, [
                            [3,,0.2,,,0.1,,,,,,,,,,,1,,0.5,,,,,0.5]
                        ]);
                        audio.play('gun');
                        helloWorld.scale.set(2, 2);
                        player = re('Player')(G.width / 2, G.height / 2);
                        player.audio = audio;
                        rect = re('geom')['Rectangle'](200, 200, 100, 80);
                        rect.solid = true;
                        rect.draw = function (g) {
                            g.lineRect(this.pos.x, this.pos.y, this.width, this.height);
                        };
                        this.add(player);
                        for (var i = 0; i < player.bullets().length; ++i) {
                            this.add(player.bullets()[i]);
                        }
                        this.add(rect);
                        player.addCollideObject(rect);
                        for (var i = 0; i < 10; ++i) {
                            var s = re('Sprite')(rnd(10, G.width - 10), rnd(10, G.height - 10));
                            s.makeImg(rnd(20, 40), rnd(20, 40));
                            this.add(s);
                            boxes.push(s);
                        }
                        $['sh'] = function (f) {
                            if (!startShake) {
                                startShake = true;
                                shake.set(f * sgn(rnd(-1, 1)), f * sgn(rnd(-1, 1)));
                                shakeTimer = ms();
                            }
                        };
                        $['qt'] = quadTree;
                        $['ov'] = function (n, m, callback, y) {
                            var r;
                            quadTree.clear();
                            if ((n instanceof Array) && (m instanceof Array)) {
                                n.forEach(function (b) {
                                    quadTree.insert(b);
                                });
                                m.forEach(function (b) {
                                    quadTree.insert(b);
                                });
                                n.forEach(function (b) {
                                    r = quadTree.retrieve(b);
                                    handleCollisionCallback(b, r, (function () {
                                        if (y) {
                                            return function (x, y) {
                                                if (x.kill && !y.kill) {
                                                    x.kill(true);
                                                }
                                            }
                                        } else {
                                            return onOverlap;
                                        }
                                    }()));
                                });
                            } else if (m instanceof Array && !(n instanceof Array)) {
                                quadTree.insert(n);
                                m.forEach(function (b) {
                                    quadTree.insert(b);
                                });
                                r = quadTree.retrieve(n);
                                handleCollisionCallback(n, r, callback);
                            } else if (n instanceof Array && !(m instanceof Array)) {
                                quadTree.insert(m);
                                n.forEach(function (b) {
                                    quadTree.insert(b);
                                });
                                r = quadTree.retrieve(m);
                                handleCollisionCallback(m, r, callback);
                            } else if (!(n instanceof Array) && !(m instanceof Array)) {
                                quadTree.insert(n);
                                quadTree.insert(m);
                                r = quadTree.retrieve(n);
                                handleCollisionCallback(n, r, callback);
                            }
                        };
                        $['cl'] = function (n, m, callback) {
                            var r;
                            quadTree.clear();
                            if (m instanceof Array) {
                                m.forEach(function (b) {
                                    quadTree.insert(b);
                                });
                            } else {
                                quadTree.insert(n);
                                quadTree.insert(m);
                                r = quadTree.retrieve(n);
                                r.forEach(function (x) {
                                    if (x !== n) {
                                        if (!n.solid) {

                                        }
                                        if (!x.solid) {
                                            geom.sep(x, n);
                                        }
                                    }
                                });
                            }
                        };
                        this.add(helloWorld);
                    },
                    onUpdate: function () {
                        this.parent.onUpdate();
                        //rect.separate(player.bounds);
                        rect.updateBounds();
                        ov(rect, player, onOverlap);
                        ov(rect, player.bullets(), onOverlap);
                        ov(boxes, boxes, onOverlap);
                        ov(boxes, player, onOverlap);
                        ov(player.bullets(), boxes, onOverlap, true);
                        helloWorld.setText(player.bulletIndex());
                    },
                    onRender: function (g) {
                        g.context.lineWidth = 5;
                        g.context.save();
                        if (startShake) {
                            g.context.translate(shake.x, shake.y);
                            if (shake.x > 0 || shake.x < 0) {
                                shake.x *= -1;
                            }
                            if (shake.y > 0 || shake.y < 0) {
                                shake.y *= -1;
                            }
                            if (ms() - shakeTimer > shakeLife) {
                                startShake = false;
                            }
                        }
                        this.parent.onRender(g);
                        g.context.restore();
                        g.context.lineWidth = 1;
                        //quadTree.debugDraw(g);
                    },
                    onDestroy: function () {
                        this.parent.onDestroy();
                        delete $['qd'];
                        delete $['cl'];
                        delete $['sh'];
                    }
                });

            return PlayState;
        };
    }
);
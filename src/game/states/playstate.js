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
                        m.kill();
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
                PlayState = G.states.create({
                    onCreate: function () {
                        player = re('Player')(G.width / 2, G.height / 2);
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
                            var s = re('Sprite')(rnd(10, G.width-10), rnd(10, G.height-10));
                            s.makeImg(rnd(20, 40), rnd(20, 40));
                            this.add(s);
                            boxes.push(s);
                        }
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
                                                if (x.kill) {
                                                    x.kill();
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
                    },
                    onRender: function (g) {
                        g.context.lineWidth = 5;
                        this.parent.onRender(g);
                        g.context.lineWidth = 1;
                        //quadTree.debugDraw(g);
                    },
                    onDestroy: function () {
                        this.parent.onDestroy();
                        delete $['qd'];
                        delete $['cl'];
                    }
                });

            return PlayState;
        };
    }
);
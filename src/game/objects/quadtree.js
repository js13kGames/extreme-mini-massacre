dm.mk(
    'QuadTree',
    function () {
        var QuadTree = function (_x, _y, _width, _height, _depth, _maxDepth, _maxChildren, _root) {
            var depth,
                maxDepth,
                maxChildren,
                children = [],
                nodes = [null, null, null, null],
                hWidth,
                hHeight,
                indexes = [-1, -1, -1, -1],
                returnObjects = [],
                root,
                rWidth,
                rHeight,
                // caching
                b,
                pos,
                bx,
                by,
                bw,
                bh,
                i,
                len,
                TOP_LEFT = 0,
                TOP_RIGHT = 1,
                BOTTOM_LEFT = 2,
                BOTTOM_RIGHT = 3,
                NONE = -1,
                init = function () {
                    depth = _depth || 0;
                    maxDepth = _maxDepth || 4;
                    maxChildren = _maxChildren || 4;
                    hWidth = _width / 2;
                    hHeight = _height / 2;
                    module.x = _x;
                    module.y = _y;
                    module.width = _width;
                    module.height = _height;
                    if (depth === 0) {
                        root = module;
                    } else {
                        root = _root;
                    }
                    rWidth = root.x + root.width;
                    rHeight = root.y + root.height;
                    defs(module, {
                        nodes: {
                            get: function () {
                                return nodes;
                            }
                        },
                        length: {
                            get: function () {
                                return children.length;
                            }
                        }
                    });
                },
                module = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    split: function () {
                        var d = depth + 1;
                        nodes[0] = QuadTree(this.x, this.y, hWidth, hHeight, d,
                            maxDepth, maxChildren, root);
                        nodes[1] = QuadTree(this.x + hWidth, this.y, hWidth, hHeight, d,
                            maxDepth, maxChildren, root);
                        nodes[2] = QuadTree(this.x, this.y + hHeight, hWidth, hHeight, d,
                            maxDepth, maxChildren, root);
                        nodes[3] = QuadTree(this.x + hWidth, this.y + hHeight, hWidth, hHeight, d,
                            maxDepth, maxChildren, root);
                    },
                    getIndexes: function (base) {
                        bx = base.pos.x;
                        by = base.pos.y;
                        bw = bx + base.width;
                        bh = by + base.height;
                        i = 0;
                        len = nodes.length;
                        indexes = [-1, -1, -1, -1];
                        if (bx > rWidth || bw < root.x ||
                            by > rHeight || bh < root.y) {
                            return [-1];
                        }
                        if (bx <= this.x + hWidth) {
                            if (by <= this.y + hHeight) {
                                for (i = 0; i < len; ++i) {
                                    if (indexes[i] === -1) {
                                        indexes[i] = TOP_LEFT;
                                        break;
                                    }
                                }
                                if (bw >= this.x + hWidth) {
                                    for (i = 0; i < len; ++i) {
                                        if (indexes[i] === -1) {
                                            indexes[i] = TOP_RIGHT;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (bh >= this.y + hHeight) {
                                for (i = 0; i < len; ++i) {
                                    if (indexes[i] === -1) {
                                        indexes[i] = BOTTOM_LEFT;
                                        break;
                                    }
                                }
                                if (bw >= this.x + hWidth) {
                                    for (i = 0; i < len; ++i) {
                                        if (indexes[i] === -1) {
                                            indexes[i] = BOTTOM_RIGHT;
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (by <= this.y + hHeight) {
                                for (i = 0; i < len; ++i) {
                                    if (indexes[i] === -1) {
                                        indexes[i] = TOP_RIGHT;
                                        break;
                                    }
                                }
                                if (bh > this.y + hHeight) {
                                    for (i = 0; i < len; ++i) {
                                        if (indexes[i] === -1) {
                                            indexes[i] = BOTTOM_RIGHT
                                            break;
                                        }
                                    }
                                }
                            }
                            if (by >= this.y + hHeight) {
                                for (i = 0; i < len; ++i) {
                                    if (indexes[i] === -1) {
                                        indexes[i] = BOTTOM_RIGHT;
                                        break;
                                    }
                                }
                            }
                        }

                        return indexes;
                    },
                    insert: function (base) {
                        var i,
                            len;

                        indexes = module.getIndexes(base);
                        if (nodes[0] !== null) {
                            len = indexes.length;
                            for (i = 0; i < len; ++i) {
                                if (indexes[i] !== -1) {
                                    nodes[indexes[i]].insert(base);
                                }
                            }
                        } else if (indexes[0] !== -1) {
                            children.push(base);
                            if (children.length > maxChildren && depth < maxDepth) {
                                module.split();
                                len = children.length;
                                for (i = 0; i < len; ++i) {
                                    module.insert(children[i]);
                                }
                                children.length = 0;
                            }
                        }
                    },
                    retrieve: function (base) {
                        returnObjects.length = 0;
                        indexes = module.getIndexes(base);
                        if (nodes[0] !== null) {
                            len = indexes.length;
                            for (i = 0; i < len; ++i) {
                                if (indexes[i] !== -1) {
                                    returnObjects = returnObjects.concat(nodes[indexes[i]].retrieve(base));
                                }
                            }
                        } else {
                            if (indexes[0] !== -1) {
                                returnObjects = returnObjects.concat(children);
                            }
                        }
                        return returnObjects;
                    },
                    clear: function () {
                        len = nodes.length;
                        for (i = 0; i < len; ++i) {
                            if (nodes[i] !== null) {
                                nodes[i].clear();
                                nodes[i] = null;
                            }
                        }
                        children.length = 0;
                    },
                    setBounds: function (x, y, w, h) {
                        this.x = x;
                        this.y = y;
                        this.width = w;
                        this.height = h;
                        hWidth = this.width / 2;
                        hHeight = this.height / 2;
                        rWidth = root.x + root.width;
                        rHeight = root.y + root.height;
                    },
                    debugDraw: function (g) {
                        var len = nodes.length;

                        if (nodes[0] !== null) {
                            for (i = 0; i < len; ++i) {
                                nodes[i].debugDraw(g);
                            }
                        }
                        g.line(this.x, this.y, this.x + this.width, this.y);
                        g.line(this.x + this.width, this.y, this.x + this.width, this.y + this.height);
                        g.line(this.x + this.width, this.y + this.height, this.x, this.y + this.height);
                        g.line(this.x, this.y + this.height, this.x, this.y);
                    }
                };

            init();
            return module;
        };

        return QuadTree;
    }
);
dm.mk(
    'State',
    function () {
        'use strict';
        return function () {
            var requestedState,
                states = {},
                currentState,
                stateChanged = false,
                changeState = true,
                swap = function () {
                    if (!requestedState) return;
                    if (currentState && isFunc(currentState.onDestroy)) {
                        currentState.onDestroy();
                        currentState.clear();
                    }
                    currentState = requestedState();
                    stateChanged = true;
                    changeState = false;
                    if (isFunc(currentState.onCreate)) {
                        currentState.onCreate();
                    }
                },
                init = function () {
                    def(m, 'current', {
                        get: function () {
                            return currentState;
                        }
                    });
                },
                m = {
                    add: function (name, state) {
                        if (!states[name]) {
                            states[name] = state;
                        }
                    },
                    set: function (name) {
                        requestedState = states[name];
                        changeState = true;
                    },
                    reset: function () {
                        swap();
                    },
                    update: function () {
                        if (stateChanged) {
                            stateChanged = false;
                        }
                        if (currentState && isFunc(currentState.onUpdate)) {
                            currentState.onUpdate();
                        }
                    },
                    render: function (gfx) {
                        if (currentState && isFunc(currentState.onRender)) {
                            currentState.onRender(gfx);
                        }
                        if (changeState) {
                            swap();
                        }
                    },
                    create: function (prop) {
                        var children = [],
                            init = function () {
                                defs(module, {
                                    size: {
                                        get: function () {
                                            return children.length;
                                        }
                                    }
                                });
                                module = mix(module, prop);
                            },
                            module = {
                                getChildren: function () {
                                    return children;
                                },
                                add: function (base) {
                                    children.push(base);
                                    if (isFunc(base.init)) {
                                        base.init();
                                    }
                                },
                                remove: function (base) {
                                    var i = children.indexOf(base),
                                        t;

                                    if (i >= 0) {
                                        t = children.splice(i, 1);
                                        if (isFunc(base.destroy)) {
                                            base.destroy();
                                        }
                                    }
                                },
                                clear: function () {
                                    var i,
                                        l = children.length;

                                    for (i = 0; i < l; ++i) {
                                        if (isFunc(children[i].destroy)) {
                                            children[i].destroy();
                                        }
                                    }
                                    children.length = 0;
                                },
                                onUpdate: function () {
                                    var i,
                                        l = children.length,
                                        o;
                                    for (i = 0; i < l; ++i) {
                                        o = children[i];
                                        if (isFunc(o.update)) {
                                            o.update();
                                        }
                                    }
                                },
                                onRender: function (gfx) {
                                    var i,
                                        l = children.length,
                                        o;
                                    for (i = 0; i < l; ++i) {
                                        o = children[i];
                                        if (isFunc(o.draw)) {
                                            o.draw(gfx);
                                        }
                                    }
                                }
                            };

                        init();
                        return module;
                    }
                };

            return m;
        };
    }
);
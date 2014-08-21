(function ($, _) {
    'use strict';
    var include = {},
        moduleQueue = [],
        onDomLoaded = function () {
            moduleQueue.forEach(function (n) {
                n(include);
            });
            moduleQueue.length = 0;
        },
        mixin = function (o1, o2) {
            var name,
                dummy = clone(o1),
                allow,
                func,
                prop;

            for (name in o2) {
                if (typeof (o2[name]) !== 'undefined') {
                    if (dummy.hasOwnProperty(name)) {
                        prop = Object.getOwnPropertyDescriptor(dummy, name);
                        if (typeof dummy[name] === 'function') {
                            func = dummy[name].bind(dummy);
                            prop.value = func;
                        }
                        dummy['parent'] = dummy['parent'] || {};
                        def(dummy['parent'], name, prop);
                    }
                    if (typeof o2[name] === 'object') {
                        dummy[name] = mixin({}, o2[name]);
                    } else {
                        prop = Object.getOwnPropertyDescriptor(o2, name);
                        def(dummy, name, prop);
                    }
                }
            }

            return dummy;
        },
        clone = function (o) {
            var name,
                dummy = {};

            for (name in o) {
                def(dummy, name, Object.getOwnPropertyDescriptor(o, name));
            }

            return dummy;
        },
        Base = function (p) {
            var init = function () {
                    module = mixin(module, p);
                },
                module = {
                    add: function (prop) {
                        module = mixin(module, prop);
                        return module;
                    }
                };

            init();
            return module;
        },
        module = {
            go: function (callback) {
                moduleQueue.push(callback);
                return module;
            },
            mk: function (name, mod) {
                include[name] = mod(include);
                return include;
            }
        };

    $['re'] = function (name) {
        return include[name];
    };
    $['dm'] = module;
    $.onload = onDomLoaded;
    $['def'] = Object.defineProperty;
    $['defs'] = Object.defineProperties;
    $['get'] = function (i) {
        return _.getElementById(i);
    };
    $['make'] = function (t) {
        return _.createElement(t);
    };
    $['$'] = $;
    $['_'] = _;
    include['Base'] = Base;
    $['mix'] = mixin;
    $['isFunc'] = function (n) {
        return typeof n === 'function';
    };

    $['isNum'] = function (n) {
        return typeof n === 'number';
    };
    $['sgn'] = function (n) {
        if (n > 0) {
            return 1;
        } else if (n < 0) {
            return -1;
        } else {
            return 0;
        }
    };
    $['ms'] = function () {
        return new Date().getTime();
    };
    $['rnd'] = function (min, max) {
        return min + Math.random() * (max - min);
    };
}(window, document));
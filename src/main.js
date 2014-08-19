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
        Base = function () {
            var module = {
                add: function (prop) {
                    module = mixin(module, prop);
                    return module;
                },
                extend: function () {
                    var elements = Array.prototype.slice.call(arguments),
                        child = clone(module),
                        element = elements[0],
                        component,
                        i,
                        len;

                    if (element instanceof Array) {
                        len = element.length;
                        for (i = 0; i < len; ++i) {
                            element[i](child);
                        }
                        element = elements[1];
                        if (typeof element === 'object') {
                            return mixin(child, element);
                        }
                    } else if (typeof element === 'object') {
                        return mixin(child, element);
                    }

                    return child;
                }
            };

            return module;
        },
        module = {
            go: function (callback) {
                moduleQueue.push(callback);
                return module;
            },
            do :
            function (name, mod) {
                include[name] = mod(include);
                return include;
            }
        };

    $.inc = include;
    $.dm = module;
    $.onload = onDomLoaded;
    $.def = Object.defineProperty;
    $.defs = Object.defineProperties;
    $.get = function (i) {
        return _.getElementById(i);
    };
    $.make = function (t) {
        return _.createElement(t);
    };
    $.$ = $;
    $._ = _;
    inc.Base = Base;
    $.mix = mixin;
    $.isFunc = function (n) {
        return typeof n === 'function';
    };

    $.isNum = function (n) {
        return typeof n === 'number';
    };

}(window, document));
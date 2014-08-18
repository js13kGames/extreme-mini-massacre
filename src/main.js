(function ($, _) {
    var moduleQueue = [],
        onDomLoaded = function () {
            moduleQueue.forEach(function (n) {
                n(module);
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
                    allow = !reservedWords.test(name);
                    if (dummy.hasOwnProperty(name) && allow) {
                        prop = Object.getOwnPropertyDescriptor(dummy, name);
                        if (typeof dummy[name] === 'function') {
                            func = dummy[name].bind(dummy);
                            prop.value = func;
                        }
                        dummy['parent'] = dummy['parent'] || {};
                        Object.defineProperty(dummy['parent'], name, prop);
                    } else {
                        if (!allow) {
                            throw new Error('You used a reserved word ' + name + '.');
                        }
                    }
                    if (typeof o2[name] === 'object') {
                        dummy[name] = mixin({}, o2[name]);
                    } else {
                        prop = Object.getOwnPropertyDescriptor(o2, name);
                        Object.defineProperty(dummy, name, prop);
                    }
                }
            }

            return dummy;
        },
        clone = function (o) {
            var name,
                dummy = {};

            for (name in object) {
                Object.defineProperty(dummy, name, Object.getOwnPropertyDescriptor(object, name));
            }

            return dummy;
        },
        GameObject = function () {
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
                module[name] = mod(module);
                return module;
            }
        };

    $.mod = module;
    $.onload = onDomLoaded;
    $.GameObject = GameObject;
}(window, document));
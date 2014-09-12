dm.mk(
    'Game',
    function () {
        'use strict';
        return function () {
            var gfx = re('Graphics')('c'),
                raf = (function () {
                    return $.requestAnimationFrame ||
                        $.webkitRequestAnimationFrame ||
                        $.mozRequestAnimationFrame ||
                        $.msRequestAnimationFrame ||
                        $.oRequestAnimationFrame ||
                        function (n) {
                            $.setTimeout(n, 1000 / 60);
                        }
                }()),
                mainLoop = function () {
                    raf(mainLoop);
                    gfx.cls();                    
                    module.states.update();
                    module.states.render(gfx);
                    module.gamepad.update();
                },
                onResize = function () {
                    var w = window,
                        ratio = Math.min(
                            $.innerWidth / module.width,
                            $.innerHeight / module.height
                        );

                    gfx.canvas.style.width = (module.width * ratio) + 'px';
                    gfx.canvas.style.height = (module.height * ratio) + 'px';
                    module.mouse.ratio.x = module.width / (module.width * ratio);
                    module.mouse.ratio.y = module.height / (module.height * ratio);
                },
                init = function () {
                    mainLoop();
                    $.addEventListener('resize', onResize);
                    onResize();
                },
                module = {
                    width: 800,
                    height: 480,
                    gfx: gfx,
                    keyboard: re('Keyboard')($),
                    mouse: re('Mouse')(gfx.canvas),
                    states: re('State')(),
                    gamepad: re('GamePad')()
                };

            init();
            return module;
        };
    }
);
$ = window;
_ = document;
GFX = null;
ASSETS = {};
SOUNDS = null;
STATE = null;
mouse = {
    x: 0,
    y: 0,
    down: false
};
ratio = {
    x: 1,
    y: 1
};
keyboard = {};
pads = {};
(function () {
    var assetList = ['font.png', 'player.png', 'guns.png', 'enemy1.png', 'ammo.png', 'enemy2.png'],
        tempImage = null,
        loadCount = 0,
        makeImage = function (data) {
            var i = new Image();
            i.src = data;
            return i;
        };

    $.onload = function () {
        assetList.forEach(function (n) {
            tempImage = new Image();
            tempImage.onload = function (e) {
                ASSETS[(e.target.src.match(/([^\/]+)(?=\.\w+$)?([^/]+?(\.png))/g) + '').replace('.png', '')] = e.target;
                loadCount++;
                if (loadCount >= assetList.length) {
                    main();
                }
            };
            tempImage.src = 'assets/' + n;
        });
    };
}());

mainLoop = function () {
    requestAnimationFrame(mainLoop);
    if (!!navigator['getGamepads']) {
        var p = navigator['getGamepads'](),
            i,
            len = p.length;

        for (i = 0; i < len; ++i) {
            if (p[i]) {
                pads[p[i].index] = p[i];
            }
        }
    }
    GFX.cls();
    if (STATE && STATE !== null) {
        if (isFunc(STATE.update)) {
            STATE.update();
        }
        if (isFunc(STATE.draw)) {
            STATE.draw(GFX);
        }
    }
};

setState = function (state) {
    var s = state();
    if (STATE && STATE.destroy) {
        STATE.destroy();
    }
    STATE = s;
    if (STATE.create) {
        STATE.create();
    }
};

main = function () {
    var set = function (e) {
        mouse.x = e.clientX - GFX.canvas.offsetLeft;
        mouse.y = e.clientY - GFX.canvas.offsetTop;
        mouse.x *= ratio.x;
        mouse.y *= ratio.y;
    },
    handleMouseMove = function (e) {
        set(e);
    },
    handleMouseDown = function (e) {
        set(e);
        mouse.down = true;
    },
    handleMouseUp = function (e) {
        set(e);
        mouse.down = false;
    },
    handleKeyboardDown = function (e) {
        keyboard[e.keyCode] = true;
    },
    handleKeyboardUp = function (e) {
        keyboard[e.keyCode] = false;
    },
    onResize = function () {
        var ratio = Math.min(
            $.innerWidth / GAME_WIDTH,
            $.innerHeight / GAME_HEIGHT
        );

        GFX.canvas.style.width = (GAME_WIDTH * ratio) + 'px';
        GFX.canvas.style.height = (GAME_HEIGHT * ratio) + 'px';
        ratio.x = GAME_WIDTH / (GAME_WIDTH * ratio);
        ratio.y = GAME_HEIGHT / (GAME_HEIGHT * ratio);
    };

    window.onresize = onResize;
    SOUNDS = new Sounds();
    SOUNDS.add('mg', 10, [
        [0, , 0.1898, 0.123, 0.1973, 0.3901, 0.0381, -0.6025, , , , , , 0.6192, -0.5134, , , , 1, , , , , 0.5]
    ]);
    SOUNDS.add('sg', 10, [
        [3, , 0.2739, 0.4903, 0.161, 0.1388, , -0.3744, , , , , , , , , 0.3948, -0.1186, 1, , , , , 0.5]
    ]);
    SOUNDS.add('ft', 10, [
        [3, , 0.3976, 0.3243, 0.1494, 0.0926, , , , , , , , , , , , , 1, , , , , 0.5]
    ]);
    SOUNDS.add('sw', 10, [
        [3, 0.1385, 0.1007, 0.1, 0.34, 0.42, , 0.06, -0.3, , , -0.3, -0.6024, , 0.0001, , -0.16, -0.02, 0.71, -0.26, , 0.84, -0.7, 0.3]
    ]);
    SOUNDS.add('dr', 10, [
        [3, , 0.0259, , 0.2126, 0.4486, , -0.6876, , , , , , , , , , , 1, , , 0.2362, , 0.5]
    ]);
    SOUNDS.add('ex', 10, [
        [3, , 0.3825, 0.4313, 0.3835, 0.7215, , -0.3735, , , , , , , , , 0.0109, -0.0889, 1, , , , , 0.5]
    ]);
    SOUNDS.add('am', 10, [
        [3, , 0.0781, , 0.1428, 0.4633, , -0.5926, , , , , , , , , , , 1, , , , , 0.5]
    ]);
    SOUNDS.add('em', 10, [
        [0, , 0.0963, , 0.2931, 0.6198, , -0.6907, , , , , , 0.1502, , , , , 1, , , 0.2864, , 0.5]
    ]);

    GFX = Graphics('c');
    $.onkeydown = handleKeyboardDown;
    $.onkeyup = handleKeyboardUp;
    $.addEventListener("gamepaddisconnected", function (e) {
        delete pads[e.gampad.index];
    });
    GFX.canvas.onmousemove = handleMouseMove;
    GFX.canvas.onmousedown = handleMouseDown;
    GFX.canvas.onmouseup = handleMouseUp;
    GFX.smooth(false);
    mainLoop();
    setState(Map);
    onResize();
};
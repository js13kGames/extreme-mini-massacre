Map = function () {
    var count,
        kills,
        str,
        title,
        show = true,
        timer = ms(),
        instr,
        credits,
        state = State({
            create: function () {
                AMMO = [150, 15, 500, 0];
                GFX.canvas.style.cursor = 'auto'
                LAST_POS.x = GAME_WIDTH / 2;
                LAST_POS.y = GAME_HEIGHT / 2;
                mouse.down = false;
                OLD_GUN = 0;
                count = MOVES.length;
                kills = KILLS;
                MOVES.length = 0;
                KILLS = 0;
                str = 'You survived ' + count + ' rooms and killed ' + kills + ' enemies!';
                title = 'extreme mini massacre';
                instr = 'Controls \n  Keyboard: MOVE with WASD and AIM with MOUSE and SHOOT with mouse button.\n  Q and E to change weapon.\n\n  Gamepad: LEFT AXIS to MOVE and RIGHT AXIS to AIM, RB to SHOOT.\n  LEFT and RIGHT to change weapon'
                credits = 'developed by Felipe alfonso for JS13kgames 2014';
            },
            draw: function (g) {
                g.text(title, GAME_WIDTH / 2 - title.length * 32 / 2, 26, 1, 4, 4);
                g.text(instr, 20, 100, 1, 1, 1);
                g.alpha(0.5);
                g.text(credits, 0, GAME_HEIGHT - 8, 1, 1, 1);
                g.alpha(1);
                if (PLAYED) {
                    g.text(str, GAME_WIDTH / 2 - str.length * (8 * 1.5) / 2, GAME_HEIGHT / 2, 1, 1.5, 1.5)
                }
                if (show) {
                    g.text('Click to continue', GAME_WIDTH / 2 - (8 * 16), GAME_HEIGHT - 100, 1, 2, 2);
                }
                if (ms() - timer > 500) {
                    if (show) show = false;
                    else show = true;
                    timer = ms();
                }
                if (mouse.down) {
                    setState(Room);
                } else if (pads[0]) {
                    if (pads[0]['buttons'][7]['pressed'] || pads[0]['buttons'][0]['pressed']) {
                        setState(Room);
                    }
                }
            }
        });

    return state;
};
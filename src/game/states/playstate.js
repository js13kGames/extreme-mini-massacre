dm.do(
    'PlayState',
    function () {
        return function () {
            var r1 = inc.geom.Rect(200, 200, 50, 50),
                r2 = inc.geom.Rect(0, 0, 40, 80),
                r3,
                c = inc.geom.Vec2(0, 0),
                PlayState = G.states.create({
                    onUpdate: function () {
                        r2.pos.copy(G.mouse);
                        r3 = r1.intersection(r2);
                        r1.separate(r2);
                    },
                    onRender: function (gfx) {
                        gfx.lineRect(r1.pos.x, r1.pos.y, r1.width, r1.height);
                        gfx.lineRect(r2.pos.x, r2.pos.y, r2.width, r2.height);
                        gfx.setColor('#ff0000');
                        gfx.drawRect(r3.pos.x, r3.pos.y, r3.width, r3.height);
                        gfx.setColor('#fff');
                    }
                });

            return PlayState;
        };
    }
);
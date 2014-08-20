dm.mk(
    'PlayState',
    function () {
        return function () {
            var player,
                rect,
                PlayState = G.states.create({
                    onCreate: function () {
                        player = re('Player')(G.width / 2, G.height / 2);
                        rect = re('geom')['Rect'](200, 200, 100, 80);
                        rect.draw = function (g) {
                            g.lineRect(this.pos.x, this.pos.y, this.width, this.height);
                        };
                        this.add(player); 
                        this.add(rect);
                        player.addCollideObject(rect);
                    },
                    onUpdate: function () {
                        this.parent.onUpdate();
                        rect.separate(player.bounds);
                        rect.updateBounds();
                    }
                });

            return PlayState;
        };
    }
);
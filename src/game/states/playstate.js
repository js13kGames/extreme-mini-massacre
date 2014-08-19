dm.mk(
    'PlayState',
    function () {
        return function () {
            var player,
                PlayState = G.states.create({
                    onCreate: function () {
                        player = re('Player')(G.width / 2, G.height / 2);
                        this.add(player); 
                    }
                });

            return PlayState;
        };
    }
);
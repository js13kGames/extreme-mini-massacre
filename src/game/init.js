dm.go(
    function () {
        'use strict';
        $.G = inc.Game();
        G.states.add('PlayState', inc.PlayState);
        G.states.set('PlayState');
    }
);
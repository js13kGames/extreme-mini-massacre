dm.go(
    function () {
        'use strict';
        $['font'] = new Image();
        $['font'].onload = function () {
            $['G'] = re('Game')();
            G.states.add('PlayState', re('PlayState'));
            G.states.set('PlayState');
        };
        $['font'].src = 'assets/font.png';
    }
);
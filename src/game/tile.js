Tile = function (x, y, side, id) {
    var image,
        a = 1,
        module = {
            x: x,
            y: y,
            ID: id,
            width: 40,
            height: 40,
            origin: {
                x: 0,
                y: 0
            },
            z: 0,
            lines: {},
            init: function () {
                module.z = module.y;
                var h = 40;
                if (id < 7) {
                    image = GFX.make(module.width, module.height, '#F2E4A4');
                } else {
                    image = GFX.make(40, 40, '#000');
                }
                module.lines.top = {x1: module.x, y1: module.y, x2: module.x + module.width, y2: module.y};
                module.lines.bottom = {x1: module.x, y1: module.y + module.height, x2: module.x + module.width, y2: module.y + module.height};
                module.lines.left = {x1: module.x, y1: module.y, x2: module.x, y2: module.y + module.height};
                module.lines.right = {x1: module.x + module.width, y1: module.y, x2: module.x + module.width, y2: module.y + module.height};
            },
            draw: function (g) {
                if (id < 7) {
                    g.context.save();
                    g.context.translate(module.x, module.y);
                    g.drawImg(image, 0, 0);

                    g.context.restore();
                    g.color('#B83C2A');
                    g.rect(module.x, module.y + module.height , module.width, module.height / 2);
                    a += 0.05;
                }
            }
        };
    return module;
};
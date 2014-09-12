Collision = {
    overlap: function (a, b) {
        return a.x - a.origin.x < b.x - b.origin.x + b.width &&
            a.x - a.origin.x + a.width > b.x - b.origin.x &&
            a.y - a.origin.y < b.y - b.origin.y + b.height &&
            a.y - a.origin.y + a.height > b.y - b.origin.y;
    },
    intersection: function (a, b) {
        var inter;
        if (Collision.overlap(a, b)) {
            inter = {};
            inter.x = Math.max(a.x - a.origin.x, b.x - b.origin.x);
            inter.y = Math.max(a.y - a.origin.y, b.y - b.origin.y);
            inter.width = Math.min(a.x - a.origin.x + a.width, b.x - b.origin.x + b.width) - inter.x;
            inter.height = Math.min(a.y - a.origin.y + a.height, b.y - b.origin.y + b.height) - inter.y;
        }
        return inter;
    },
    separate: function (a, b) {
        var inter = Collision.intersection(a, b),
            d = 0;
        if (inter) {
            if (inter.width > inter.height) {
                d = sgn(a.y - b.y);
                a.y += inter.height * d;
            } else {
                d = sgn(a.x - b.x);
                a.x += inter.width * d;
            }
            return true;
        }
        return false;
    }
};

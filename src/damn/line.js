dm.mk(
    'Line',
    function () {
        return function (x1, y1, x2, y2) {
            var geom = re('geom'),
                A = geom['Vec2'](x1, y1),
                B = geom['Vec2'](x2, y2),
                bx,
                by,
                dx,
                dy,
                cross,
                cx,
                cy,
                t,
                u,
                object = {
                    A: A,
                    B: B,
                    draw: function (gfx) {
                        gfx.line(A.x, A.y, B.x, B.y);
                    },
                    intersectionPoint: function (line) {
                        bx = B.x - A.x;
                        by = B.y - A.y;
                        dx = line.B.x - line.A.x;
                        dy = line.B.y - line.A.y;
                        cross = bx * dy - by * dx;
                        if (cross === 0) {
                            return null;
                        } else {
                            cx = line.A.x - A.x;
                            cy = line.A.y - A.y;
                            t = (cx * dy - cy * dx) / cross;
                            if (t < 0 || t > 1) {
                                return null;
                            }
                            u = (cx * by - cy * bx) / cross;
                            if (u < 0 || u > 1) {
                                return null;
                            }
                            return geom['Vec2'](A.x + t * bx, A.y + t * by);
                        }
                    },
                    length: function () {
                        return A.distance(B);
                    }
                };

            return object;
        };
    }
);
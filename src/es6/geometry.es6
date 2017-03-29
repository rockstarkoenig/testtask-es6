
// Вычисляет расстояние между двумя точками (либо от xy1 до начала координат)
function getDistance(xy1, xy2) {
    if (!xy1) {
        return 0;
    }

    if (xy2) {
        let dx = xy2.x - xy1.x;
        let dy = xy2.y - xy1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    else
    {
        return Math.sqrt(Math.pow(xy1.x, 2) + Math.pow(xy1.y, 2));
    }
}

// Ориентированная площадь треугольника [a, b, c]
function getTriangleOrientedSquare(a, b, c) {
    return 0.5 * (a.x * b.y + b.x * c.y + c.x * a.y - a.y * b.x - b.y * c.x - c.y * a.x);
}

// Возвращает знак числа
function getSign(value) {
    return value < 0 ? -1 : 1;
}

// Вычисляет угол наклона отрезка [basePoint, remotePoint]
function getAngle(basePoint, remotePoint)
{
    if (!remotePoint)
    {
        return Math.atan2(basePoint.y, basePoint.x);
    }

    return Math.atan2(remotePoint.y - basePoint.y, remotePoint.x - basePoint.x);
}

// Вычисляет координаты точки, лежащей на расстоянии radius и по направлению angle по отношению к точке center (либо к {0, 0})
function getPointFromRAC(radius, angle, center) {
    if (center == null) {
        return {x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    } else {
        return {x: center.x + radius * Math.cos(angle), y: center.y + radius * Math.sin(angle) };
    }
}

// Определяет, принадлежит ли величина value отрезку [a, b]
function isValueBetween(value, a, b) {
    let valMin = Math.min(a, b);
    let valMax = Math.max(a, b);

    let o = 0.0000001;
    return (value >= valMin) && (value <= valMax) || Math.abs(value - a) < o || Math.abs(value - b) < o;
}

// Находит точку пересечения отрезков [a, b] и [c, d]
function getIntersectionPoint(a, b, c, d) {
    let dA = ((d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y));
    let dB = ((d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y));

    if (dA == 0 || dB == 0) {
        return null;
    }

    let uA = ((d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)) / dA;
    let uB = ((b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x)) / dB;

    let rx = a.x + uA * (b.x - a.x);
    let ry = a.y + uA * (b.y - a.y);

    let hasIntersection = isValueBetween(rx, a.x, b.x) && isValueBetween(rx, c.x, d.x) && isValueBetween(ry, a.y, b.y) && isValueBetween(ry, c.y, d.y);

    return hasIntersection ? { x:rx, y:ry } : null;
}

// Вычисляет расстояние от точки {px, py} до отрезка [{x1, y1}, {x2, y2}]
function getDistanceFromPointToInterval(px, py, x1, y1, x2, y2) {
    let a = y2 - y1;
    let b = x1 - x2;
    let c = y1 * (x2 - x1) - x1 * (y2 - y1);

    let p = getIntersectionPoint( { x:x1, y:y1 }, { x:x2, y:y2 }, { x:px - a, y:py - b }, { x:px + a, y:py + b });

    if (!p){
        let d1 = getDistance( { x:px, y:py }, { x:x1, y:y1 } );
        let d2 = getDistance( { x:px, y:py }, { x:x2, y:y2 } );
        return Math.min(d1, d2);
    }

    return getDistance(p, {x:px, y:py});
}

// Исходя из позиции p, вычисляет ближайшую к ней точку, расстояние от которой до center не больше radius
function getNearestAvailablePointToPoint(p, center, radius, flip) {
    if (getDistance(p, center) >= radius) {
        return p;
    }

    let a = getAngle(center, p);
    return getPointFromRAC(radius, a, center);
}


// Исходя из позиции p, вычисляет ближайшую к ней точку, расстояние от которой до отрезка [a, b] не больше radius
// Если передан параметр currentPosition, предложенная точка будет по ту же сторону отрезка [a, b], что и currentPosition
function getNearestAvailablePointToInterval(p, a, b, radius, currentPosition) {

    // Выясняем, лежат ли p и currentPositon по одну сторону от отрезка [a, b]
    let otherSides = false;
    if (currentPosition) {
        let s1 = getTriangleOrientedSquare(a, b, p);
        let s2 = getTriangleOrientedSquare(a, b, currentPosition);

        otherSides = getSign(s1) != getSign(s2);
    }

    let k1 = b.y - a.y;
    let k2 = a.x - b.x;
    let k3 = a.y * (b.x - a.x) - a.x * k1;

    let ip = getIntersectionPoint( { x:a.x, y:a.y }, { x:b.x, y:b.y }, { x:p.x - k1, y:p.y - k2 }, { x:p.x + k1, y:p.y + k2 });

    // Лежит ли точка пересечения за пределами отрезка [a, b]
    let hasIntersection = ip != null;
    if (!hasIntersection) {
        let da = getDistance( { x:p.x, y:p.y }, { x:a.x, y:a.y } );
        let db = getDistance( { x:p.x, y:p.y }, { x:b.x, y:b.y } );

        ip = da < db ? a : b;
    }

    if (otherSides && hasIntersection) {
        p = getPointFromRAC(getDistance(p, ip), getAngle(ip, p) + Math.PI, ip);
    }

    return getNearestAvailablePointToPoint(p, ip, radius);
}


export {
    getIntersectionPoint,
    getDistanceFromPointToInterval,
    getNearestAvailablePointToInterval,
    getDistance
};

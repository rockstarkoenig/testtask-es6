(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Box = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DisplayObject2 = require('./DisplayObject.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Box = exports.Box = function (_DisplayObject) {
    _inherits(Box, _DisplayObject);

    function Box() {
        _classCallCheck(this, Box);

        // Данные о границах для обработки коллизий
        var _this = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this));

        _this.bordersData = [{ x1: 0, y1: 0, x2: 0, y2: 1 }, { x1: 0, y1: 1, x2: 1, y2: 1 }, { x1: 0, y1: 0.6, x2: 1, y2: 0.6 }, { x1: 1, y1: 1, x2: 1, y2: 0 }];
        return _this;
    }

    _createClass(Box, [{
        key: 'createHtml',
        value: function createHtml() {
            _get(Box.prototype.__proto__ || Object.getPrototypeOf(Box.prototype), 'createHtml', this).call(this);

            var html = document.createElement('div');
            html.className = "box";

            return html;
        }
    }]);

    return Box;
}(_DisplayObject2.DisplayObject);

},{"./DisplayObject.es6":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DisplayObject = exports.DisplayObject = function () {
    function DisplayObject() {
        _classCallCheck(this, DisplayObject);

        this.appContainer = document.getElementById("appContainer");
        this.html = this.createHtml();

        this.appContainer.appendChild(this.html);
    }

    _createClass(DisplayObject, [{
        key: "createHtml",
        value: function createHtml() {}
    }]);

    return DisplayObject;
}();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Box = require('./Box.es6');

var _Smile = require('./Smile.es6');

var _geometry = require('./geometry.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main() {
        var _this = this;

        _classCallCheck(this, Main);

        this.appContainer = document.getElementById("appContainer");

        // Данные о границах для обработки коллизий
        this.bordersData = [{ x1: 0, y1: 0, x2: 0, y2: 1 }, { x1: 0, y1: 1, x2: 1, y2: 1 }, { x1: 1, y1: 1, x2: 1, y2: 0 }, { x1: 1, y1: 0, x2: 0, y2: 0 }];

        this.smile = new _Smile.Smile(this);
        this.box = new _Box.Box();

        window.onresize = function (event) {
            _this.onResize(event);
        };

        // Создаем границы в форме отрезков
        this.createBorderIntervals();
    }

    _createClass(Main, [{
        key: 'onResize',
        value: function onResize() {
            this.createBorderIntervals();
        }
    }, {
        key: 'createBorderIntervals',
        value: function createBorderIntervals() {
            var appRect = this.appContainer.getBoundingClientRect();
            var boxRect = this.box.html.getBoundingClientRect();

            this.borderIntervals = [];
            for (var i = 0; i < this.bordersData.length; i++) {
                var interval = {
                    a: { x: appRect.left + this.bordersData[i].x1 * appRect.width, y: appRect.top + this.bordersData[i].y1 * appRect.height },
                    b: { x: appRect.left + this.bordersData[i].x2 * appRect.width, y: appRect.top + this.bordersData[i].y2 * appRect.height }
                };

                this.borderIntervals.push(interval);
            }
            for (var _i = 0; _i < this.box.bordersData.length; _i++) {
                var _interval = {
                    a: { x: boxRect.left + this.box.bordersData[_i].x1 * boxRect.width, y: boxRect.top + this.box.bordersData[_i].y1 * boxRect.height },
                    b: { x: boxRect.left + this.box.bordersData[_i].x2 * boxRect.width, y: boxRect.top + this.box.bordersData[_i].y2 * boxRect.height }
                };

                this.borderIntervals.push(_interval);
            }
        }

        // Проверяет, можно ли разместить смайл в предложенной точке {x,y}. Если нет, возвращает ближайшую к {x,y} точку, в которой можно разместить смайл

    }, {
        key: 'getAvailablePointForSmile',
        value: function getAvailablePointForSmile(x, y, cx, cy) {
            var r = this.smile.radius;
            var futureSmileCenter = { x: x + r, y: y + r };
            var currentSmileCenter = { x: cx + r, y: cy + r };

            var intervals = this.getIntersectedBorders(futureSmileCenter.x, futureSmileCenter.y);
            if (intervals.length == 0) {
                return { x: x, y: y };
            }

            var result = null;
            for (var i = 0; i < intervals.length; i++) {
                var interval = intervals[i];
                var p = (0, _geometry.getNearestAvailablePointToInterval)(futureSmileCenter, interval.a, interval.b, r, currentSmileCenter);

                var tmp = this.getIntersectedBorders(p.x, p.y, r);
                if (tmp.length == 0 || tmp[0] == interval && tmp.length == 1) {
                    result = p;
                    result.x -= r;
                    result.y -= r;
                    break;
                }
            }

            return result;
        }

        // Возвращает список всех граничных отрезков, с которыми пересечется смайл, если его разместить в точке {x,y}

    }, {
        key: 'getIntersectedBorders',
        value: function getIntersectedBorders(x, y) {
            var r = this.smile.radius;

            var result = [];
            for (var i = 0; i < this.borderIntervals.length; i++) {
                var interval = this.borderIntervals[i];
                if ((0, _geometry.getDistanceFromPointToInterval)(x, y, interval.a.x, interval.a.y, interval.b.x, interval.b.y) < r) {
                    result.push(interval);
                }
            }

            return result;
        }
    }]);

    return Main;
}();

exports.default = Main;


window.Main = Main;

},{"./Box.es6":1,"./Smile.es6":4,"./geometry.es6":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Smile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DisplayObject2 = require('./DisplayObject.es6');

var _geometry = require('./geometry.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Smile = exports.Smile = function (_DisplayObject) {
        _inherits(Smile, _DisplayObject);

        function Smile(main) {
                _classCallCheck(this, Smile);

                var _this = _possibleConstructorReturn(this, (Smile.__proto__ || Object.getPrototypeOf(Smile)).call(this));

                _this.colors = ["#ffcc00", "#ff5500"];
                _this.colorIndex = 0;

                _this.dragOn = false;
                _this.main = main;
                _this.motion = false;

                var rect = _this.html.getBoundingClientRect();
                _this.radius = rect.width / 2;

                _this.html.onmousedown = function (event) {
                        _this.onMouseDown(event);
                };

                window.onmousemove = function (event) {
                        _this.onMouseMove(event);
                };

                _this.appContainer.onmouseup = function (event) {
                        _this.onMouseUp(event);
                };

                return _this;
        }

        _createClass(Smile, [{
                key: 'createHtml',
                value: function createHtml() {
                        _get(Smile.prototype.__proto__ || Object.getPrototypeOf(Smile.prototype), 'createHtml', this).call(this);

                        var html = document.createElement('div');
                        html.className = "smile-base";

                        var eyeLeft = document.createElement('div');
                        eyeLeft.className = "smile-eye-left";
                        html.appendChild(eyeLeft);

                        var eyeRight = document.createElement('div');
                        eyeRight.className = "smile-eye-right";
                        html.appendChild(eyeRight);

                        var mouth = document.createElement('div');
                        mouth.className = "smile-mouth";
                        html.appendChild(mouth);

                        return html;
                }
        }, {
                key: 'switchColor',
                value: function switchColor() {
                        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
                        var color = this.colors[this.colorIndex];
                        this.html.style['background-color'] = color;
                }
        }, {
                key: 'onMouseMove',
                value: function onMouseMove(event) {
                        if (!this.dragOn) {
                                return;
                        }

                        // Предполагаемые будущие координаты для this.html.style
                        var x = event.screenX - this.mx;
                        var y = event.screenY - this.my;

                        // Текущие координаты для this.html.style
                        var styleX = parseInt(this.html.style.left) || 0;
                        var styleY = parseInt(this.html.style.top) || 0;

                        // Сдвиг
                        var dx = x - styleX;
                        var dy = y - styleY;

                        // Будущая позиция относительно client
                        var rect = this.html.getBoundingClientRect();
                        var nextX = rect.left + dx;
                        var nextY = rect.top + dy;

                        // Делаем поправку на границы, вычисляем новое значение сдвига
                        var p = this.main.getAvailablePointForSmile(nextX, nextY, rect.left, rect.top);
                        if (!p) {
                                return;
                        }
                        dx = p.x - rect.left;
                        dy = p.y - rect.top;

                        // Если мы двинули смайл на два радиуса и более, есть подозрение, что мы пытаемся пройти сквозь стену
                        var motionDistanceCritical = this.radius * 1.8;
                        if ((0, _geometry.getDistance)({ x: dx, y: dy }) > motionDistanceCritical) {
                                return;
                        }

                        // Обновляем координаты для this.html.style
                        x = styleX + dx;
                        y = styleY + dy;

                        this.motion = true;

                        this.html.style.left = x + 'px';
                        this.html.style.top = y + 'px';
                }
        }, {
                key: 'onMouseDown',
                value: function onMouseDown(event) {
                        this.dragOn = true;
                        this.motion = false;

                        this.mx = event.screenX - (parseInt(this.html.style.left) || 0);
                        this.my = event.screenY - (parseInt(this.html.style.top) || 0);
                }
        }, {
                key: 'onMouseUp',
                value: function onMouseUp(event) {
                        if (!this.motion) {
                                this.switchColor();
                        }

                        this.dragOn = false;
                }
        }]);

        return Smile;
}(_DisplayObject2.DisplayObject);

},{"./DisplayObject.es6":2,"./geometry.es6":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

// Вычисляет расстояние между двумя точками (либо от xy1 до начала координат)
function getDistance(xy1, xy2) {
    if (!xy1) {
        return 0;
    }

    if (xy2) {
        var dx = xy2.x - xy1.x;
        var dy = xy2.y - xy1.y;
        return Math.sqrt(dx * dx + dy * dy);
    } else {
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
function getAngle(basePoint, remotePoint) {
    if (!remotePoint) {
        return Math.atan2(basePoint.y, basePoint.x);
    }

    return Math.atan2(remotePoint.y - basePoint.y, remotePoint.x - basePoint.x);
}

// Вычисляет координаты точки, лежащей на расстоянии radius и по направлению angle по отношению к точке center (либо к {0, 0})
function getPointFromRAC(radius, angle, center) {
    if (center == null) {
        return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    } else {
        return { x: center.x + radius * Math.cos(angle), y: center.y + radius * Math.sin(angle) };
    }
}

// Определяет, принадлежит ли величина value отрезку [a, b]
function isValueBetween(value, a, b) {
    var valMin = Math.min(a, b);
    var valMax = Math.max(a, b);

    var o = 0.0000001;
    return value >= valMin && value <= valMax || Math.abs(value - a) < o || Math.abs(value - b) < o;
}

// Находит точку пересечения отрезков [a, b] и [c, d]
function getIntersectionPoint(a, b, c, d) {
    var dA = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);
    var dB = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

    if (dA == 0 || dB == 0) {
        return null;
    }

    var uA = ((d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)) / dA;
    var uB = ((b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x)) / dB;

    var rx = a.x + uA * (b.x - a.x);
    var ry = a.y + uA * (b.y - a.y);

    var hasIntersection = isValueBetween(rx, a.x, b.x) && isValueBetween(rx, c.x, d.x) && isValueBetween(ry, a.y, b.y) && isValueBetween(ry, c.y, d.y);

    return hasIntersection ? { x: rx, y: ry } : null;
}

// Вычисляет расстояние от точки {px, py} до отрезка [{x1, y1}, {x2, y2}]
function getDistanceFromPointToInterval(px, py, x1, y1, x2, y2) {
    var a = y2 - y1;
    var b = x1 - x2;
    var c = y1 * (x2 - x1) - x1 * (y2 - y1);

    var p = getIntersectionPoint({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: px - a, y: py - b }, { x: px + a, y: py + b });

    if (!p) {
        var d1 = getDistance({ x: px, y: py }, { x: x1, y: y1 });
        var d2 = getDistance({ x: px, y: py }, { x: x2, y: y2 });
        return Math.min(d1, d2);
    }

    return getDistance(p, { x: px, y: py });
}

// Исходя из позиции p, вычисляет ближайшую к ней точку, расстояние от которой до center не больше radius
function getNearestAvailablePointToPoint(p, center, radius, flip) {
    if (getDistance(p, center) >= radius) {
        return p;
    }

    var a = getAngle(center, p);
    return getPointFromRAC(radius, a, center);
}

// Исходя из позиции p, вычисляет ближайшую к ней точку, расстояние от которой до отрезка [a, b] не больше radius
// Если передан параметр currentPosition, предложенная точка будет по ту же сторону отрезка [a, b], что и currentPosition
function getNearestAvailablePointToInterval(p, a, b, radius, currentPosition) {

    // Выясняем, лежат ли p и currentPositon по одну сторону от отрезка [a, b]
    var otherSides = false;
    if (currentPosition) {
        var s1 = getTriangleOrientedSquare(a, b, p);
        var s2 = getTriangleOrientedSquare(a, b, currentPosition);

        otherSides = getSign(s1) != getSign(s2);
    }

    var k1 = b.y - a.y;
    var k2 = a.x - b.x;
    var k3 = a.y * (b.x - a.x) - a.x * k1;

    var ip = getIntersectionPoint({ x: a.x, y: a.y }, { x: b.x, y: b.y }, { x: p.x - k1, y: p.y - k2 }, { x: p.x + k1, y: p.y + k2 });

    // Лежит ли точка пересечения за пределами отрезка [a, b]
    var hasIntersection = ip != null;
    if (!hasIntersection) {
        var da = getDistance({ x: p.x, y: p.y }, { x: a.x, y: a.y });
        var db = getDistance({ x: p.x, y: p.y }, { x: b.x, y: b.y });

        ip = da < db ? a : b;
    }

    if (otherSides && hasIntersection) {
        p = getPointFromRAC(getDistance(p, ip), getAngle(ip, p) + Math.PI, ip);
    }

    return getNearestAvailablePointToPoint(p, ip, radius);
}

exports.getIntersectionPoint = getIntersectionPoint;
exports.getDistanceFromPointToInterval = getDistanceFromPointToInterval;
exports.getNearestAvailablePointToInterval = getNearestAvailablePointToInterval;
exports.getDistance = getDistance;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGVzNlxcQm94LmVzNiIsInNyY1xcZXM2XFxEaXNwbGF5T2JqZWN0LmVzNiIsInNyY1xcZXM2XFxNYWluLmVzNiIsInNyY1xcZXM2XFxTbWlsZS5lczYiLCJzcmNcXGVzNlxcZ2VvbWV0cnkuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFYSxHLFdBQUEsRzs7O0FBRVQsbUJBQWM7QUFBQTs7QUFHVjtBQUhVOztBQUlWLGNBQUssV0FBTCxHQUFtQixDQUNmLEVBQUUsSUFBSSxDQUFOLEVBQVMsSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsSUFBSSxDQUEzQixFQURlLEVBRWYsRUFBRSxJQUFJLENBQU4sRUFBUyxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixJQUFJLENBQTNCLEVBRmUsRUFHZixFQUFFLElBQUksQ0FBTixFQUFTLElBQUksR0FBYixFQUFrQixJQUFJLENBQXRCLEVBQXlCLElBQUksR0FBN0IsRUFIZSxFQUlmLEVBQUUsSUFBSSxDQUFOLEVBQVMsSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsSUFBSSxDQUEzQixFQUplLENBQW5CO0FBSlU7QUFVYjs7OztxQ0FFWTtBQUNUOztBQUVBLGdCQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQSxpQkFBSyxTQUFMLEdBQWlCLEtBQWpCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2QlEsYSxXQUFBLGE7QUFDVCw2QkFBYztBQUFBOztBQUNWLGFBQUssWUFBTCxHQUFvQixTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBcEI7QUFDQSxhQUFLLElBQUwsR0FBWSxLQUFLLFVBQUwsRUFBWjs7QUFFQSxhQUFLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBOEIsS0FBSyxJQUFuQztBQUNI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SjtBQUNIOztBQUVELFdBQU8sZ0NBQWdDLENBQWhDLEVBQW1DLEVBQW5DLEVBQXVDLE1BQXZDLENBQVA7QUFDSDs7UUFJRyxvQixHQUFBLG9CO1FBQ0EsOEIsR0FBQSw4QjtRQUNBLGtDLEdBQUEsa0M7UUFDQSxXLEdBQUEsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBEaXNwbGF5T2JqZWN0IH0gZnJvbSAnLi9EaXNwbGF5T2JqZWN0LmVzNic7XHJcblxyXG5leHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgRGlzcGxheU9iamVjdHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvLyDQlNCw0L3QvdGL0LUg0L4g0LPRgNCw0L3QuNGG0LDRhSDQtNC70Y8g0L7QsdGA0LDQsdC+0YLQutC4INC60L7Qu9C70LjQt9C40LlcclxuICAgICAgICB0aGlzLmJvcmRlcnNEYXRhID0gW1xyXG4gICAgICAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDAsIHkyOiAxIH0sXHJcbiAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAxLCB4MjogMSwgeTI6IDEgfSxcclxuICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAuNiwgeDI6IDEsIHkyOiAwLjYgfSxcclxuICAgICAgICAgICAgeyB4MTogMSwgeTE6IDEsIHgyOiAxLCB5MjogMCB9XHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVIdG1sKCkge1xyXG4gICAgICAgIHN1cGVyLmNyZWF0ZUh0bWwoKTtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBodG1sLmNsYXNzTmFtZSA9IFwiYm94XCI7XHJcblxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIERpc3BsYXlPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcENvbnRhaW5lclwiKTtcclxuICAgICAgICB0aGlzLmh0bWwgPSB0aGlzLmNyZWF0ZUh0bWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5odG1sKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVIdG1sKCkge1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBCb3ggfSBmcm9tICcuL0JveC5lczYnO1xyXG5pbXBvcnQgeyBTbWlsZSB9IGZyb20gJy4vU21pbGUuZXM2JztcclxuaW1wb3J0IHtnZXROZWFyZXN0QXZhaWxhYmxlUG9pbnRUb0ludGVydmFsLCBnZXREaXN0YW5jZUZyb21Qb2ludFRvSW50ZXJ2YWx9IGZyb20gJy4vZ2VvbWV0cnkuZXM2JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYXBwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBDb250YWluZXJcIik7XHJcblxyXG4gICAgICAgIC8vINCU0LDQvdC90YvQtSDQviDQs9GA0LDQvdC40YbQsNGFINC00LvRjyDQvtCx0YDQsNCx0L7RgtC60Lgg0LrQvtC70LvQuNC30LjQuVxyXG4gICAgICAgIHRoaXMuYm9yZGVyc0RhdGEgPSBbXHJcbiAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogMCwgeTI6IDEgfSxcclxuICAgICAgICAgICAgeyB4MTogMCwgeTE6IDEsIHgyOiAxLCB5MjogMSB9LFxyXG4gICAgICAgICAgICB7IHgxOiAxLCB5MTogMSwgeDI6IDEsIHkyOiAwIH0sXHJcbiAgICAgICAgICAgIHsgeDE6IDEsIHkxOiAwLCB4MjogMCwgeTI6IDAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMuc21pbGUgPSBuZXcgU21pbGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5ib3ggPSBuZXcgQm94KCk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplKGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCh0L7Qt9C00LDQtdC8INCz0YDQsNC90LjRhtGLINCyINGE0L7RgNC80LUg0L7RgtGA0LXQt9C60L7QslxyXG4gICAgICAgIHRoaXMuY3JlYXRlQm9yZGVySW50ZXJ2YWxzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZXNpemUoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCb3JkZXJJbnRlcnZhbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCb3JkZXJJbnRlcnZhbHMoKSB7XHJcbiAgICAgICAgbGV0IGFwcFJlY3QgPSB0aGlzLmFwcENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQgYm94UmVjdCA9IHRoaXMuYm94Lmh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYm9yZGVySW50ZXJ2YWxzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvcmRlcnNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHtcclxuICAgICAgICAgICAgICAgIGE6IHsgeDogYXBwUmVjdC5sZWZ0ICsgdGhpcy5ib3JkZXJzRGF0YVtpXS54MSAqIGFwcFJlY3Qud2lkdGgsIHk6IGFwcFJlY3QudG9wICsgdGhpcy5ib3JkZXJzRGF0YVtpXS55MSAqIGFwcFJlY3QuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICBiOiB7IHg6IGFwcFJlY3QubGVmdCArIHRoaXMuYm9yZGVyc0RhdGFbaV0ueDIgKiBhcHBSZWN0LndpZHRoLCB5OiBhcHBSZWN0LnRvcCArIHRoaXMuYm9yZGVyc0RhdGFbaV0ueTIgKiBhcHBSZWN0LmhlaWdodCB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvcmRlckludGVydmFscy5wdXNoKGludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJveC5ib3JkZXJzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSB7XHJcbiAgICAgICAgICAgICAgICBhOiB7IHg6IGJveFJlY3QubGVmdCArIHRoaXMuYm94LmJvcmRlcnNEYXRhW2ldLngxICogYm94UmVjdC53aWR0aCwgeTogYm94UmVjdC50b3AgKyB0aGlzLmJveC5ib3JkZXJzRGF0YVtpXS55MSAqIGJveFJlY3QuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICBiOiB7IHg6IGJveFJlY3QubGVmdCArIHRoaXMuYm94LmJvcmRlcnNEYXRhW2ldLngyICogYm94UmVjdC53aWR0aCwgeTogYm94UmVjdC50b3AgKyB0aGlzLmJveC5ib3JkZXJzRGF0YVtpXS55MiAqIGJveFJlY3QuaGVpZ2h0IH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYm9yZGVySW50ZXJ2YWxzLnB1c2goaW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDQn9GA0L7QstC10YDRj9C10YIsINC80L7QttC90L4g0LvQuCDRgNCw0LfQvNC10YHRgtC40YLRjCDRgdC80LDQudC7INCyINC/0YDQtdC00LvQvtC20LXQvdC90L7QuSDRgtC+0YfQutC1IHt4LHl9LiDQldGB0LvQuCDQvdC10YIsINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINCx0LvQuNC20LDQudGI0YPRjiDQuiB7eCx5fSDRgtC+0YfQutGDLCDQsiDQutC+0YLQvtGA0L7QuSDQvNC+0LbQvdC+INGA0LDQt9C80LXRgdGC0LjRgtGMINGB0LzQsNC50LtcclxuICAgIGdldEF2YWlsYWJsZVBvaW50Rm9yU21pbGUoeCwgeSwgY3gsIGN5KSB7XHJcbiAgICAgICAgbGV0IHIgPSB0aGlzLnNtaWxlLnJhZGl1cztcclxuICAgICAgICBsZXQgZnV0dXJlU21pbGVDZW50ZXIgPSB7eDp4ICsgciwgeTp5ICsgcn07XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTbWlsZUNlbnRlciA9IHt4OmN4ICsgciwgeTpjeSArIHJ9O1xyXG5cclxuICAgICAgICBsZXQgaW50ZXJ2YWxzID0gdGhpcy5nZXRJbnRlcnNlY3RlZEJvcmRlcnMoZnV0dXJlU21pbGVDZW50ZXIueCwgZnV0dXJlU21pbGVDZW50ZXIueSk7XHJcbiAgICAgICAgaWYgKGludGVydmFscy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3g6eCwgeTp5fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW50ZXJ2YWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IGludGVydmFsc1tpXTtcclxuICAgICAgICAgICAgbGV0IHAgPSBnZXROZWFyZXN0QXZhaWxhYmxlUG9pbnRUb0ludGVydmFsKGZ1dHVyZVNtaWxlQ2VudGVyLCBpbnRlcnZhbC5hLCBpbnRlcnZhbC5iLCByLCBjdXJyZW50U21pbGVDZW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRtcCA9IHRoaXMuZ2V0SW50ZXJzZWN0ZWRCb3JkZXJzKHAueCwgcC55LCByKTtcclxuICAgICAgICAgICAgaWYgKHRtcC5sZW5ndGggPT0gMCB8fCB0bXBbMF0gPT0gaW50ZXJ2YWwgJiYgdG1wLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnggLT0gcjtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC55IC09IHI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQktC+0LfQstGA0LDRidCw0LXRgiDRgdC/0LjRgdC+0Log0LLRgdC10YUg0LPRgNCw0L3QuNGH0L3Ri9GFINC+0YLRgNC10LfQutC+0LIsINGBINC60L7RgtC+0YDRi9C80Lgg0L/QtdGA0LXRgdC10YfQtdGC0YHRjyDRgdC80LDQudC7LCDQtdGB0LvQuCDQtdCz0L4g0YDQsNC30LzQtdGB0YLQuNGC0Ywg0LIg0YLQvtGH0LrQtSB7eCx5fVxyXG4gICAgZ2V0SW50ZXJzZWN0ZWRCb3JkZXJzKHgsIHkpIHtcclxuICAgICAgICBsZXQgciA9IHRoaXMuc21pbGUucmFkaXVzO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvcmRlckludGVydmFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLmJvcmRlckludGVydmFsc1tpXTtcclxuICAgICAgICAgICAgaWYgKGdldERpc3RhbmNlRnJvbVBvaW50VG9JbnRlcnZhbCh4LCB5LCBpbnRlcnZhbC5hLngsIGludGVydmFsLmEueSwgaW50ZXJ2YWwuYi54LCBpbnRlcnZhbC5iLnkpIDwgcikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cuTWFpbiA9IE1haW47IiwiaW1wb3J0IHsgRGlzcGxheU9iamVjdCB9IGZyb20gJy4vRGlzcGxheU9iamVjdC5lczYnO1xyXG5pbXBvcnQge2dldERpc3RhbmNlfSBmcm9tICcuL2dlb21ldHJ5LmVzNic7XHJcblxyXG5leHBvcnQgY2xhc3MgU21pbGUgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYWluKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xvcnMgPSBbXCIjZmZjYzAwXCIsIFwiI2ZmNTUwMFwiXTtcclxuICAgICAgICB0aGlzLmNvbG9ySW5kZXggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmRyYWdPbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFpbiA9IG1haW47XHJcbiAgICAgICAgdGhpcy5tb3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmh0bWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByZWN0LndpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgdGhpcy5odG1sLm9ubW91c2Vkb3duID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZURvd24oZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5vbm1vdXNlbW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFwcENvbnRhaW5lci5vbm1vdXNldXAgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlVXAoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUh0bWwoKSB7XHJcbiAgICAgICAgc3VwZXIuY3JlYXRlSHRtbCgpO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGh0bWwuY2xhc3NOYW1lID0gXCJzbWlsZS1iYXNlXCI7XHJcblxyXG4gICAgICAgIGxldCBleWVMZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZXllTGVmdC5jbGFzc05hbWUgPSBcInNtaWxlLWV5ZS1sZWZ0XCI7XHJcbiAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChleWVMZWZ0KTtcclxuXHJcbiAgICAgICAgbGV0IGV5ZVJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZXllUmlnaHQuY2xhc3NOYW1lID0gXCJzbWlsZS1leWUtcmlnaHRcIjtcclxuICAgICAgICBodG1sLmFwcGVuZENoaWxkKGV5ZVJpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IG1vdXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbW91dGguY2xhc3NOYW1lID0gXCJzbWlsZS1tb3V0aFwiO1xyXG4gICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQobW91dGgpO1xyXG5cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2hDb2xvcigpIHtcclxuICAgICAgICB0aGlzLmNvbG9ySW5kZXggPSAodGhpcy5jb2xvckluZGV4ICsgMSkgJSB0aGlzLmNvbG9ycy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvcnNbdGhpcy5jb2xvckluZGV4XTtcclxuICAgICAgICB0aGlzLmh0bWwuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VNb3ZlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdPbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9GA0LXQtNC/0L7Qu9Cw0LPQsNC10LzRi9C1INCx0YPQtNGD0YnQuNC1INC60L7QvtGA0LTQuNC90LDRgtGLINC00LvRjyB0aGlzLmh0bWwuc3R5bGVcclxuICAgICAgICBsZXQgeCA9IGV2ZW50LnNjcmVlblggLSB0aGlzLm14O1xyXG4gICAgICAgIGxldCB5ID0gZXZlbnQuc2NyZWVuWSAtIHRoaXMubXk7XHJcblxyXG4gICAgICAgIC8vINCi0LXQutGD0YnQuNC1INC60L7QvtGA0LTQuNC90LDRgtGLINC00LvRjyB0aGlzLmh0bWwuc3R5bGVcclxuICAgICAgICBsZXQgc3R5bGVYID0gcGFyc2VJbnQodGhpcy5odG1sLnN0eWxlLmxlZnQpIHx8IDA7XHJcbiAgICAgICAgbGV0IHN0eWxlWSA9IHBhcnNlSW50KHRoaXMuaHRtbC5zdHlsZS50b3ApIHx8IDA7XHJcblxyXG4gICAgICAgIC8vINCh0LTQstC40LNcclxuICAgICAgICBsZXQgZHggPSB4IC0gc3R5bGVYO1xyXG4gICAgICAgIGxldCBkeSA9IHkgLSBzdHlsZVk7XHJcblxyXG4gICAgICAgIC8vINCR0YPQtNGD0YnQsNGPINC/0L7Qt9C40YbQuNGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviBjbGllbnRcclxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQgbmV4dFggPSByZWN0LmxlZnQgKyBkeDtcclxuICAgICAgICBsZXQgbmV4dFkgPSByZWN0LnRvcCArIGR5O1xyXG5cclxuICAgICAgICAvLyDQlNC10LvQsNC10Lwg0L/QvtC/0YDQsNCy0LrRgyDQvdCwINCz0YDQsNC90LjRhtGLLCDQstGL0YfQuNGB0LvRj9C10Lwg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INGB0LTQstC40LPQsFxyXG4gICAgICAgIGxldCBwID0gdGhpcy5tYWluLmdldEF2YWlsYWJsZVBvaW50Rm9yU21pbGUobmV4dFgsIG5leHRZLCByZWN0LmxlZnQsIHJlY3QudG9wKTtcclxuICAgICAgICBpZiAoIXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkeCA9IHAueCAtIHJlY3QubGVmdDtcclxuICAgICAgICBkeSA9IHAueSAtIHJlY3QudG9wO1xyXG5cclxuICAgICAgICAvLyDQldGB0LvQuCDQvNGLINC00LLQuNC90YPQu9C4INGB0LzQsNC50Lsg0L3QsCDQtNCy0LAg0YDQsNC00LjRg9GB0LAg0Lgg0LHQvtC70LXQtSwg0LXRgdGC0Ywg0L/QvtC00L7Qt9GA0LXQvdC40LUsINGH0YLQviDQvNGLINC/0YvRgtCw0LXQvNGB0Y8g0L/RgNC+0LnRgtC4INGB0LrQstC+0LfRjCDRgdGC0LXQvdGDXHJcbiAgICAgICAgbGV0IG1vdGlvbkRpc3RhbmNlQ3JpdGljYWwgPSB0aGlzLnJhZGl1cyAqIDEuODtcclxuICAgICAgICBpZiAoZ2V0RGlzdGFuY2Uoe3g6ZHgsIHk6ZHl9KSA+IG1vdGlvbkRpc3RhbmNlQ3JpdGljYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J7QsdC90L7QstC70Y/QtdC8INC60L7QvtGA0LTQuNC90LDRgtGLINC00LvRjyB0aGlzLmh0bWwuc3R5bGVcclxuICAgICAgICB4ID0gc3R5bGVYICsgZHg7XHJcbiAgICAgICAgeSA9IHN0eWxlWSArIGR5O1xyXG5cclxuICAgICAgICB0aGlzLm1vdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbC5zdHlsZS5sZWZ0ID0geCArICdweCc7XHJcbiAgICAgICAgdGhpcy5odG1sLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VEb3duKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kcmFnT24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW90aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMubXggPSBldmVudC5zY3JlZW5YIC0gKHBhcnNlSW50KHRoaXMuaHRtbC5zdHlsZS5sZWZ0KSB8fCAwKTtcclxuICAgICAgICB0aGlzLm15ID0gZXZlbnQuc2NyZWVuWSAtIChwYXJzZUludCh0aGlzLmh0bWwuc3R5bGUudG9wKSB8fCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMubW90aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQ29sb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ09uID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJcclxuLy8g0JLRi9GH0LjRgdC70Y/QtdGCINGA0LDRgdGB0YLQvtGP0L3QuNC1INC80LXQttC00YMg0LTQstGD0LzRjyDRgtC+0YfQutCw0LzQuCAo0LvQuNCx0L4g0L7RgiB4eTEg0LTQviDQvdCw0YfQsNC70LAg0LrQvtC+0YDQtNC40L3QsNGCKVxyXG5mdW5jdGlvbiBnZXREaXN0YW5jZSh4eTEsIHh5Mikge1xyXG4gICAgaWYgKCF4eTEpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeHkyKSB7XHJcbiAgICAgICAgbGV0IGR4ID0geHkyLnggLSB4eTEueDtcclxuICAgICAgICBsZXQgZHkgPSB4eTIueSAtIHh5MS55O1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeHkxLngsIDIpICsgTWF0aC5wb3coeHkxLnksIDIpKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g0J7RgNC40LXQvdGC0LjRgNC+0LLQsNC90L3QsNGPINC/0LvQvtGJ0LDQtNGMINGC0YDQtdGD0LPQvtC70YzQvdC40LrQsCBbYSwgYiwgY11cclxuZnVuY3Rpb24gZ2V0VHJpYW5nbGVPcmllbnRlZFNxdWFyZShhLCBiLCBjKSB7XHJcbiAgICByZXR1cm4gMC41ICogKGEueCAqIGIueSArIGIueCAqIGMueSArIGMueCAqIGEueSAtIGEueSAqIGIueCAtIGIueSAqIGMueCAtIGMueSAqIGEueCk7XHJcbn1cclxuXHJcbi8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC30L3QsNC6INGH0LjRgdC70LBcclxuZnVuY3Rpb24gZ2V0U2lnbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlIDwgMCA/IC0xIDogMTtcclxufVxyXG5cclxuLy8g0JLRi9GH0LjRgdC70Y/QtdGCINGD0LPQvtC7INC90LDQutC70L7QvdCwINC+0YLRgNC10LfQutCwIFtiYXNlUG9pbnQsIHJlbW90ZVBvaW50XVxyXG5mdW5jdGlvbiBnZXRBbmdsZShiYXNlUG9pbnQsIHJlbW90ZVBvaW50KVxyXG57XHJcbiAgICBpZiAoIXJlbW90ZVBvaW50KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKGJhc2VQb2ludC55LCBiYXNlUG9pbnQueCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1hdGguYXRhbjIocmVtb3RlUG9pbnQueSAtIGJhc2VQb2ludC55LCByZW1vdGVQb2ludC54IC0gYmFzZVBvaW50LngpO1xyXG59XHJcblxyXG4vLyDQktGL0YfQuNGB0LvRj9C10YIg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0YLQvtGH0LrQuCwg0LvQtdC20LDRidC10Lkg0L3QsCDRgNCw0YHRgdGC0L7Rj9C90LjQuCByYWRpdXMg0Lgg0L/QviDQvdCw0L/RgNCw0LLQu9C10L3QuNGOIGFuZ2xlINC/0L4g0L7RgtC90L7RiNC10L3QuNGOINC6INGC0L7Rh9C60LUgY2VudGVyICjQu9C40LHQviDQuiB7MCwgMH0pXHJcbmZ1bmN0aW9uIGdldFBvaW50RnJvbVJBQyhyYWRpdXMsIGFuZ2xlLCBjZW50ZXIpIHtcclxuICAgIGlmIChjZW50ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7eDogcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpLCB5OiByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSkgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHt4OiBjZW50ZXIueCArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSwgeTogY2VudGVyLnkgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSkgfTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g0J7Qv9GA0LXQtNC10LvRj9C10YIsINC/0YDQuNC90LDQtNC70LXQttC40YIg0LvQuCDQstC10LvQuNGH0LjQvdCwIHZhbHVlINC+0YLRgNC10LfQutGDIFthLCBiXVxyXG5mdW5jdGlvbiBpc1ZhbHVlQmV0d2Vlbih2YWx1ZSwgYSwgYikge1xyXG4gICAgbGV0IHZhbE1pbiA9IE1hdGgubWluKGEsIGIpO1xyXG4gICAgbGV0IHZhbE1heCA9IE1hdGgubWF4KGEsIGIpO1xyXG5cclxuICAgIGxldCBvID0gMC4wMDAwMDAxO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSB2YWxNaW4pICYmICh2YWx1ZSA8PSB2YWxNYXgpIHx8IE1hdGguYWJzKHZhbHVlIC0gYSkgPCBvIHx8IE1hdGguYWJzKHZhbHVlIC0gYikgPCBvO1xyXG59XHJcblxyXG4vLyDQndCw0YXQvtC00LjRgiDRgtC+0YfQutGDINC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0L7RgtGA0LXQt9C60L7QsiBbYSwgYl0g0LggW2MsIGRdXHJcbmZ1bmN0aW9uIGdldEludGVyc2VjdGlvblBvaW50KGEsIGIsIGMsIGQpIHtcclxuICAgIGxldCBkQSA9ICgoZC55IC0gYy55KSAqIChiLnggLSBhLngpIC0gKGQueCAtIGMueCkgKiAoYi55IC0gYS55KSk7XHJcbiAgICBsZXQgZEIgPSAoKGQueSAtIGMueSkgKiAoYi54IC0gYS54KSAtIChkLnggLSBjLngpICogKGIueSAtIGEueSkpO1xyXG5cclxuICAgIGlmIChkQSA9PSAwIHx8IGRCID09IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdUEgPSAoKGQueCAtIGMueCkgKiAoYS55IC0gYy55KSAtIChkLnkgLSBjLnkpICogKGEueCAtIGMueCkpIC8gZEE7XHJcbiAgICBsZXQgdUIgPSAoKGIueCAtIGEueCkgKiAoYS55IC0gYy55KSAtIChiLnkgLSBhLnkpICogKGEueCAtIGMueCkpIC8gZEI7XHJcblxyXG4gICAgbGV0IHJ4ID0gYS54ICsgdUEgKiAoYi54IC0gYS54KTtcclxuICAgIGxldCByeSA9IGEueSArIHVBICogKGIueSAtIGEueSk7XHJcblxyXG4gICAgbGV0IGhhc0ludGVyc2VjdGlvbiA9IGlzVmFsdWVCZXR3ZWVuKHJ4LCBhLngsIGIueCkgJiYgaXNWYWx1ZUJldHdlZW4ocngsIGMueCwgZC54KSAmJiBpc1ZhbHVlQmV0d2VlbihyeSwgYS55LCBiLnkpICYmIGlzVmFsdWVCZXR3ZWVuKHJ5LCBjLnksIGQueSk7XHJcblxyXG4gICAgcmV0dXJuIGhhc0ludGVyc2VjdGlvbiA/IHsgeDpyeCwgeTpyeSB9IDogbnVsbDtcclxufVxyXG5cclxuLy8g0JLRi9GH0LjRgdC70Y/QtdGCINGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0YLQvtGH0LrQuCB7cHgsIHB5fSDQtNC+INC+0YLRgNC10LfQutCwIFt7eDEsIHkxfSwge3gyLCB5Mn1dXHJcbmZ1bmN0aW9uIGdldERpc3RhbmNlRnJvbVBvaW50VG9JbnRlcnZhbChweCwgcHksIHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICBsZXQgYSA9IHkyIC0geTE7XHJcbiAgICBsZXQgYiA9IHgxIC0geDI7XHJcbiAgICBsZXQgYyA9IHkxICogKHgyIC0geDEpIC0geDEgKiAoeTIgLSB5MSk7XHJcblxyXG4gICAgbGV0IHAgPSBnZXRJbnRlcnNlY3Rpb25Qb2ludCggeyB4OngxLCB5OnkxIH0sIHsgeDp4MiwgeTp5MiB9LCB7IHg6cHggLSBhLCB5OnB5IC0gYiB9LCB7IHg6cHggKyBhLCB5OnB5ICsgYiB9KTtcclxuXHJcbiAgICBpZiAoIXApe1xyXG4gICAgICAgIGxldCBkMSA9IGdldERpc3RhbmNlKCB7IHg6cHgsIHk6cHkgfSwgeyB4OngxLCB5OnkxIH0gKTtcclxuICAgICAgICBsZXQgZDIgPSBnZXREaXN0YW5jZSggeyB4OnB4LCB5OnB5IH0sIHsgeDp4MiwgeTp5MiB9ICk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGQxLCBkMik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdldERpc3RhbmNlKHAsIHt4OnB4LCB5OnB5fSk7XHJcbn1cclxuXHJcbi8vINCY0YHRhdC+0LTRjyDQuNC3INC/0L7Qt9C40YbQuNC4IHAsINCy0YvRh9C40YHQu9GP0LXRgiDQsdC70LjQttCw0LnRiNGD0Y4g0Log0L3QtdC5INGC0L7Rh9C60YMsINGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0LrQvtGC0L7RgNC+0Lkg0LTQviBjZW50ZXIg0L3QtSDQsdC+0LvRjNGI0LUgcmFkaXVzXHJcbmZ1bmN0aW9uIGdldE5lYXJlc3RBdmFpbGFibGVQb2ludFRvUG9pbnQocCwgY2VudGVyLCByYWRpdXMsIGZsaXApIHtcclxuICAgIGlmIChnZXREaXN0YW5jZShwLCBjZW50ZXIpID49IHJhZGl1cykge1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhID0gZ2V0QW5nbGUoY2VudGVyLCBwKTtcclxuICAgIHJldHVybiBnZXRQb2ludEZyb21SQUMocmFkaXVzLCBhLCBjZW50ZXIpO1xyXG59XHJcblxyXG5cclxuLy8g0JjRgdGF0L7QtNGPINC40Lcg0L/QvtC30LjRhtC40LggcCwg0LLRi9GH0LjRgdC70Y/QtdGCINCx0LvQuNC20LDQudGI0YPRjiDQuiDQvdC10Lkg0YLQvtGH0LrRgywg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQutC+0YLQvtGA0L7QuSDQtNC+INC+0YLRgNC10LfQutCwIFthLCBiXSDQvdC1INCx0L7Qu9GM0YjQtSByYWRpdXNcclxuLy8g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L0g0L/QsNGA0LDQvNC10YLRgCBjdXJyZW50UG9zaXRpb24sINC/0YDQtdC00LvQvtC20LXQvdC90LDRjyDRgtC+0YfQutCwINCx0YPQtNC10YIg0L/QviDRgtGDINC20LUg0YHRgtC+0YDQvtC90YMg0L7RgtGA0LXQt9C60LAgW2EsIGJdLCDRh9GC0L4g0LggY3VycmVudFBvc2l0aW9uXHJcbmZ1bmN0aW9uIGdldE5lYXJlc3RBdmFpbGFibGVQb2ludFRvSW50ZXJ2YWwocCwgYSwgYiwgcmFkaXVzLCBjdXJyZW50UG9zaXRpb24pIHtcclxuXHJcbiAgICAvLyDQktGL0Y/RgdC90Y/QtdC8LCDQu9C10LbQsNGCINC70LggcCDQuCBjdXJyZW50UG9zaXRvbiDQv9C+INC+0LTQvdGDINGB0YLQvtGA0L7QvdGDINC+0YIg0L7RgtGA0LXQt9C60LAgW2EsIGJdXHJcbiAgICBsZXQgb3RoZXJTaWRlcyA9IGZhbHNlO1xyXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbikge1xyXG4gICAgICAgIGxldCBzMSA9IGdldFRyaWFuZ2xlT3JpZW50ZWRTcXVhcmUoYSwgYiwgcCk7XHJcbiAgICAgICAgbGV0IHMyID0gZ2V0VHJpYW5nbGVPcmllbnRlZFNxdWFyZShhLCBiLCBjdXJyZW50UG9zaXRpb24pO1xyXG5cclxuICAgICAgICBvdGhlclNpZGVzID0gZ2V0U2lnbihzMSkgIT0gZ2V0U2lnbihzMik7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGsxID0gYi55IC0gYS55O1xyXG4gICAgbGV0IGsyID0gYS54IC0gYi54O1xyXG4gICAgbGV0IGszID0gYS55ICogKGIueCAtIGEueCkgLSBhLnggKiBrMTtcclxuXHJcbiAgICBsZXQgaXAgPSBnZXRJbnRlcnNlY3Rpb25Qb2ludCggeyB4OmEueCwgeTphLnkgfSwgeyB4OmIueCwgeTpiLnkgfSwgeyB4OnAueCAtIGsxLCB5OnAueSAtIGsyIH0sIHsgeDpwLnggKyBrMSwgeTpwLnkgKyBrMiB9KTtcclxuXHJcbiAgICAvLyDQm9C10LbQuNGCINC70Lgg0YLQvtGH0LrQsCDQv9C10YDQtdGB0LXRh9C10L3QuNGPINC30LAg0L/RgNC10LTQtdC70LDQvNC4INC+0YLRgNC10LfQutCwIFthLCBiXVxyXG4gICAgbGV0IGhhc0ludGVyc2VjdGlvbiA9IGlwICE9IG51bGw7XHJcbiAgICBpZiAoIWhhc0ludGVyc2VjdGlvbikge1xyXG4gICAgICAgIGxldCBkYSA9IGdldERpc3RhbmNlKCB7IHg6cC54LCB5OnAueSB9LCB7IHg6YS54LCB5OmEueSB9ICk7XHJcbiAgICAgICAgbGV0IGRiID0gZ2V0RGlzdGFuY2UoIHsgeDpwLngsIHk6cC55IH0sIHsgeDpiLngsIHk6Yi55IH0gKTtcclxuXHJcbiAgICAgICAgaXAgPSBkYSA8IGRiID8gYSA6IGI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG90aGVyU2lkZXMgJiYgaGFzSW50ZXJzZWN0aW9uKSB7XHJcbiAgICAgICAgcCA9IGdldFBvaW50RnJvbVJBQyhnZXREaXN0YW5jZShwLCBpcCksIGdldEFuZ2xlKGlwLCBwKSArIE1hdGguUEksIGlwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2V0TmVhcmVzdEF2YWlsYWJsZVBvaW50VG9Qb2ludChwLCBpcCwgcmFkaXVzKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBnZXRJbnRlcnNlY3Rpb25Qb2ludCxcclxuICAgIGdldERpc3RhbmNlRnJvbVBvaW50VG9JbnRlcnZhbCxcclxuICAgIGdldE5lYXJlc3RBdmFpbGFibGVQb2ludFRvSW50ZXJ2YWwsXHJcbiAgICBnZXREaXN0YW5jZVxyXG59O1xyXG4iXX0=

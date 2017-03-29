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

                        event.preventDefault();
                }
        }, {
                key: 'onMouseUp',
                value: function onMouseUp(event) {
                        if (!this.motion && this.dragOn) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGVzNlxcQm94LmVzNiIsInNyY1xcZXM2XFxEaXNwbGF5T2JqZWN0LmVzNiIsInNyY1xcZXM2XFxNYWluLmVzNiIsInNyY1xcZXM2XFxTbWlsZS5lczYiLCJzcmNcXGVzNlxcZ2VvbWV0cnkuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFYSxHLFdBQUEsRzs7O0FBRVQsbUJBQWM7QUFBQTs7QUFHVjtBQUhVOztBQUlWLGNBQUssV0FBTCxHQUFtQixDQUNmLEVBQUUsSUFBSSxDQUFOLEVBQVMsSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsSUFBSSxDQUEzQixFQURlLEVBRWYsRUFBRSxJQUFJLENBQU4sRUFBUyxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixJQUFJLENBQTNCLEVBRmUsRUFHZixFQUFFLElBQUksQ0FBTixFQUFTLElBQUksR0FBYixFQUFrQixJQUFJLENBQXRCLEVBQXlCLElBQUksR0FBN0IsRUFIZSxFQUlmLEVBQUUsSUFBSSxDQUFOLEVBQVMsSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsSUFBSSxDQUEzQixFQUplLENBQW5CO0FBSlU7QUFVYjs7OztxQ0FFWTtBQUNUOztBQUVBLGdCQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQSxpQkFBSyxTQUFMLEdBQWlCLEtBQWpCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2QlEsYSxXQUFBLGE7QUFDVCw2QkFBYztBQUFBOztBQUNWLGFBQUssWUFBTCxHQUFvQixTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBcEI7QUFDQSxhQUFLLElBQUwsR0FBWSxLQUFLLFVBQUwsRUFBWjs7QUFFQSxhQUFLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBOEIsS0FBSyxJQUFuQztBQUNI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QWIsSUFBa0IsS0FBSyxFQUEzRCxFQUErRCxFQUEvRCxDQUFKO0FBQ0g7O0FBRUQsV0FBTyxnQ0FBZ0MsQ0FBaEMsRUFBbUMsRUFBbkMsRUFBdUMsTUFBdkMsQ0FBUDtBQUNIOztRQUlHLG9CLEdBQUEsb0I7UUFDQSw4QixHQUFBLDhCO1FBQ0Esa0MsR0FBQSxrQztRQUNBLFcsR0FBQSxXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IERpc3BsYXlPYmplY3QgfSBmcm9tICcuL0Rpc3BsYXlPYmplY3QuZXM2JztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBEaXNwbGF5T2JqZWN0e1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vINCU0LDQvdC90YvQtSDQviDQs9GA0LDQvdC40YbQsNGFINC00LvRjyDQvtCx0YDQsNCx0L7RgtC60Lgg0LrQvtC70LvQuNC30LjQuVxyXG4gICAgICAgIHRoaXMuYm9yZGVyc0RhdGEgPSBbXHJcbiAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogMCwgeTI6IDEgfSxcclxuICAgICAgICAgICAgeyB4MTogMCwgeTE6IDEsIHgyOiAxLCB5MjogMSB9LFxyXG4gICAgICAgICAgICB7IHgxOiAwLCB5MTogMC42LCB4MjogMSwgeTI6IDAuNiB9LFxyXG4gICAgICAgICAgICB7IHgxOiAxLCB5MTogMSwgeDI6IDEsIHkyOiAwIH1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUh0bWwoKSB7XHJcbiAgICAgICAgc3VwZXIuY3JlYXRlSHRtbCgpO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGh0bWwuY2xhc3NOYW1lID0gXCJib3hcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgRGlzcGxheU9iamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFwcENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwQ29udGFpbmVyXCIpO1xyXG4gICAgICAgIHRoaXMuaHRtbCA9IHRoaXMuY3JlYXRlSHRtbCgpO1xyXG5cclxuICAgICAgICB0aGlzLmFwcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmh0bWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUh0bWwoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEJveCB9IGZyb20gJy4vQm94LmVzNic7XHJcbmltcG9ydCB7IFNtaWxlIH0gZnJvbSAnLi9TbWlsZS5lczYnO1xyXG5pbXBvcnQge2dldE5lYXJlc3RBdmFpbGFibGVQb2ludFRvSW50ZXJ2YWwsIGdldERpc3RhbmNlRnJvbVBvaW50VG9JbnRlcnZhbH0gZnJvbSAnLi9nZW9tZXRyeS5lczYnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcENvbnRhaW5lclwiKTtcclxuXHJcbiAgICAgICAgLy8g0JTQsNC90L3Ri9C1INC+INCz0YDQsNC90LjRhtCw0YUg0LTQu9GPINC+0LHRgNCw0LHQvtGC0LrQuCDQutC+0LvQu9C40LfQuNC5XHJcbiAgICAgICAgdGhpcy5ib3JkZXJzRGF0YSA9IFtcclxuICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiAwLCB5MjogMSB9LFxyXG4gICAgICAgICAgICB7IHgxOiAwLCB5MTogMSwgeDI6IDEsIHkyOiAxIH0sXHJcbiAgICAgICAgICAgIHsgeDE6IDEsIHkxOiAxLCB4MjogMSwgeTI6IDAgfSxcclxuICAgICAgICAgICAgeyB4MTogMSwgeTE6IDAsIHgyOiAwLCB5MjogMCB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5zbWlsZSA9IG5ldyBTbWlsZSh0aGlzKTtcclxuICAgICAgICB0aGlzLmJveCA9IG5ldyBCb3goKTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZXNpemUoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0KHQvtC30LTQsNC10Lwg0LPRgNCw0L3QuNGG0Ysg0LIg0YTQvtGA0LzQtSDQvtGC0YDQtdC30LrQvtCyXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCb3JkZXJJbnRlcnZhbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJvcmRlckludGVydmFscygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJvcmRlckludGVydmFscygpIHtcclxuICAgICAgICBsZXQgYXBwUmVjdCA9IHRoaXMuYXBwQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGxldCBib3hSZWN0ID0gdGhpcy5ib3guaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ib3JkZXJJbnRlcnZhbHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYm9yZGVyc0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsID0ge1xyXG4gICAgICAgICAgICAgICAgYTogeyB4OiBhcHBSZWN0LmxlZnQgKyB0aGlzLmJvcmRlcnNEYXRhW2ldLngxICogYXBwUmVjdC53aWR0aCwgeTogYXBwUmVjdC50b3AgKyB0aGlzLmJvcmRlcnNEYXRhW2ldLnkxICogYXBwUmVjdC5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIGI6IHsgeDogYXBwUmVjdC5sZWZ0ICsgdGhpcy5ib3JkZXJzRGF0YVtpXS54MiAqIGFwcFJlY3Qud2lkdGgsIHk6IGFwcFJlY3QudG9wICsgdGhpcy5ib3JkZXJzRGF0YVtpXS55MiAqIGFwcFJlY3QuaGVpZ2h0IH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYm9yZGVySW50ZXJ2YWxzLnB1c2goaW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYm94LmJvcmRlcnNEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHtcclxuICAgICAgICAgICAgICAgIGE6IHsgeDogYm94UmVjdC5sZWZ0ICsgdGhpcy5ib3guYm9yZGVyc0RhdGFbaV0ueDEgKiBib3hSZWN0LndpZHRoLCB5OiBib3hSZWN0LnRvcCArIHRoaXMuYm94LmJvcmRlcnNEYXRhW2ldLnkxICogYm94UmVjdC5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIGI6IHsgeDogYm94UmVjdC5sZWZ0ICsgdGhpcy5ib3guYm9yZGVyc0RhdGFbaV0ueDIgKiBib3hSZWN0LndpZHRoLCB5OiBib3hSZWN0LnRvcCArIHRoaXMuYm94LmJvcmRlcnNEYXRhW2ldLnkyICogYm94UmVjdC5oZWlnaHQgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ib3JkZXJJbnRlcnZhbHMucHVzaChpbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINCf0YDQvtCy0LXRgNGP0LXRgiwg0LzQvtC20L3QviDQu9C4INGA0LDQt9C80LXRgdGC0LjRgtGMINGB0LzQsNC50Lsg0LIg0L/RgNC10LTQu9C+0LbQtdC90L3QvtC5INGC0L7Rh9C60LUge3gseX0uINCV0YHQu9C4INC90LXRgiwg0LLQvtC30LLRgNCw0YnQsNC10YIg0LHQu9C40LbQsNC50YjRg9GOINC6IHt4LHl9INGC0L7Rh9C60YMsINCyINC60L7RgtC+0YDQvtC5INC80L7QttC90L4g0YDQsNC30LzQtdGB0YLQuNGC0Ywg0YHQvNCw0LnQu1xyXG4gICAgZ2V0QXZhaWxhYmxlUG9pbnRGb3JTbWlsZSh4LCB5LCBjeCwgY3kpIHtcclxuICAgICAgICBsZXQgciA9IHRoaXMuc21pbGUucmFkaXVzO1xyXG4gICAgICAgIGxldCBmdXR1cmVTbWlsZUNlbnRlciA9IHt4OnggKyByLCB5OnkgKyByfTtcclxuICAgICAgICBsZXQgY3VycmVudFNtaWxlQ2VudGVyID0ge3g6Y3ggKyByLCB5OmN5ICsgcn07XHJcblxyXG4gICAgICAgIGxldCBpbnRlcnZhbHMgPSB0aGlzLmdldEludGVyc2VjdGVkQm9yZGVycyhmdXR1cmVTbWlsZUNlbnRlci54LCBmdXR1cmVTbWlsZUNlbnRlci55KTtcclxuICAgICAgICBpZiAoaW50ZXJ2YWxzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7eDp4LCB5Onl9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnRlcnZhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsID0gaW50ZXJ2YWxzW2ldO1xyXG4gICAgICAgICAgICBsZXQgcCA9IGdldE5lYXJlc3RBdmFpbGFibGVQb2ludFRvSW50ZXJ2YWwoZnV0dXJlU21pbGVDZW50ZXIsIGludGVydmFsLmEsIGludGVydmFsLmIsIHIsIGN1cnJlbnRTbWlsZUNlbnRlcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG1wID0gdGhpcy5nZXRJbnRlcnNlY3RlZEJvcmRlcnMocC54LCBwLnksIHIpO1xyXG4gICAgICAgICAgICBpZiAodG1wLmxlbmd0aCA9PSAwIHx8IHRtcFswXSA9PSBpbnRlcnZhbCAmJiB0bXAubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHA7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQueCAtPSByO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnkgLT0gcjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0L/QuNGB0L7QuiDQstGB0LXRhSDQs9GA0LDQvdC40YfQvdGL0YUg0L7RgtGA0LXQt9C60L7Qsiwg0YEg0LrQvtGC0L7RgNGL0LzQuCDQv9C10YDQtdGB0LXRh9C10YLRgdGPINGB0LzQsNC50LssINC10YHQu9C4INC10LPQviDRgNCw0LfQvNC10YHRgtC40YLRjCDQsiDRgtC+0YfQutC1IHt4LHl9XHJcbiAgICBnZXRJbnRlcnNlY3RlZEJvcmRlcnMoeCwgeSkge1xyXG4gICAgICAgIGxldCByID0gdGhpcy5zbWlsZS5yYWRpdXM7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYm9yZGVySW50ZXJ2YWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHRoaXMuYm9yZGVySW50ZXJ2YWxzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZ2V0RGlzdGFuY2VGcm9tUG9pbnRUb0ludGVydmFsKHgsIHksIGludGVydmFsLmEueCwgaW50ZXJ2YWwuYS55LCBpbnRlcnZhbC5iLngsIGludGVydmFsLmIueSkgPCByKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5NYWluID0gTWFpbjsiLCJpbXBvcnQgeyBEaXNwbGF5T2JqZWN0IH0gZnJvbSAnLi9EaXNwbGF5T2JqZWN0LmVzNic7XHJcbmltcG9ydCB7Z2V0RGlzdGFuY2V9IGZyb20gJy4vZ2VvbWV0cnkuZXM2JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTbWlsZSBleHRlbmRzIERpc3BsYXlPYmplY3Qge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1haW4pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbG9ycyA9IFtcIiNmZmNjMDBcIiwgXCIjZmY1NTAwXCJdO1xyXG4gICAgICAgIHRoaXMuY29sb3JJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ09uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tYWluID0gbWFpbjtcclxuICAgICAgICB0aGlzLm1vdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IHJlY3Qud2lkdGggLyAyO1xyXG5cclxuICAgICAgICB0aGlzLmh0bWwub25tb3VzZWRvd24gPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlRG93bihldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmUoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYXBwQ29udGFpbmVyLm9ubW91c2V1cCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW91c2VVcChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlSHRtbCgpIHtcclxuICAgICAgICBzdXBlci5jcmVhdGVIdG1sKCk7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaHRtbC5jbGFzc05hbWUgPSBcInNtaWxlLWJhc2VcIjtcclxuXHJcbiAgICAgICAgbGV0IGV5ZUxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBleWVMZWZ0LmNsYXNzTmFtZSA9IFwic21pbGUtZXllLWxlZnRcIjtcclxuICAgICAgICBodG1sLmFwcGVuZENoaWxkKGV5ZUxlZnQpO1xyXG5cclxuICAgICAgICBsZXQgZXllUmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBleWVSaWdodC5jbGFzc05hbWUgPSBcInNtaWxlLWV5ZS1yaWdodFwiO1xyXG4gICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoZXllUmlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgbW91dGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBtb3V0aC5jbGFzc05hbWUgPSBcInNtaWxlLW1vdXRoXCI7XHJcbiAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChtb3V0aCk7XHJcblxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaENvbG9yKCkge1xyXG4gICAgICAgIHRoaXMuY29sb3JJbmRleCA9ICh0aGlzLmNvbG9ySW5kZXggKyAxKSAlIHRoaXMuY29sb3JzLmxlbmd0aDtcclxuICAgICAgICBsZXQgY29sb3IgPSB0aGlzLmNvbG9yc1t0aGlzLmNvbG9ySW5kZXhdO1xyXG4gICAgICAgIHRoaXMuaHRtbC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZHJhZ09uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCf0YDQtdC00L/QvtC70LDQs9Cw0LXQvNGL0LUg0LHRg9C00YPRidC40LUg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LTQu9GPIHRoaXMuaHRtbC5zdHlsZVxyXG4gICAgICAgIGxldCB4ID0gZXZlbnQuc2NyZWVuWCAtIHRoaXMubXg7XHJcbiAgICAgICAgbGV0IHkgPSBldmVudC5zY3JlZW5ZIC0gdGhpcy5teTtcclxuXHJcbiAgICAgICAgLy8g0KLQtdC60YPRidC40LUg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LTQu9GPIHRoaXMuaHRtbC5zdHlsZVxyXG4gICAgICAgIGxldCBzdHlsZVggPSBwYXJzZUludCh0aGlzLmh0bWwuc3R5bGUubGVmdCkgfHwgMDtcclxuICAgICAgICBsZXQgc3R5bGVZID0gcGFyc2VJbnQodGhpcy5odG1sLnN0eWxlLnRvcCkgfHwgMDtcclxuXHJcbiAgICAgICAgLy8g0KHQtNCy0LjQs1xyXG4gICAgICAgIGxldCBkeCA9IHggLSBzdHlsZVg7XHJcbiAgICAgICAgbGV0IGR5ID0geSAtIHN0eWxlWTtcclxuXHJcbiAgICAgICAgLy8g0JHRg9C00YPRidCw0Y8g0L/QvtC30LjRhtC40Y8g0L7RgtC90L7RgdC40YLQtdC70YzQvdC+IGNsaWVudFxyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5odG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGxldCBuZXh0WCA9IHJlY3QubGVmdCArIGR4O1xyXG4gICAgICAgIGxldCBuZXh0WSA9IHJlY3QudG9wICsgZHk7XHJcblxyXG4gICAgICAgIC8vINCU0LXQu9Cw0LXQvCDQv9C+0L/RgNCw0LLQutGDINC90LAg0LPRgNCw0L3QuNGG0YssINCy0YvRh9C40YHQu9GP0LXQvCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0YHQtNCy0LjQs9CwXHJcbiAgICAgICAgbGV0IHAgPSB0aGlzLm1haW4uZ2V0QXZhaWxhYmxlUG9pbnRGb3JTbWlsZShuZXh0WCwgbmV4dFksIHJlY3QubGVmdCwgcmVjdC50b3ApO1xyXG4gICAgICAgIGlmICghcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGR4ID0gcC54IC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgIGR5ID0gcC55IC0gcmVjdC50b3A7XHJcblxyXG4gICAgICAgIC8vINCV0YHQu9C4INC80Ysg0LTQstC40L3Rg9C70Lgg0YHQvNCw0LnQuyDQvdCwINC00LLQsCDRgNCw0LTQuNGD0YHQsCDQuCDQsdC+0LvQtdC1LCDQtdGB0YLRjCDQv9C+0LTQvtC30YDQtdC90LjQtSwg0YfRgtC+INC80Ysg0L/Ri9GC0LDQtdC80YHRjyDQv9GA0L7QudGC0Lgg0YHQutCy0L7Qt9GMINGB0YLQtdC90YNcclxuICAgICAgICBsZXQgbW90aW9uRGlzdGFuY2VDcml0aWNhbCA9IHRoaXMucmFkaXVzICogMS44O1xyXG4gICAgICAgIGlmIChnZXREaXN0YW5jZSh7eDpkeCwgeTpkeX0pID4gbW90aW9uRGlzdGFuY2VDcml0aWNhbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQntCx0L3QvtCy0LvRj9C10Lwg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LTQu9GPIHRoaXMuaHRtbC5zdHlsZVxyXG4gICAgICAgIHggPSBzdHlsZVggKyBkeDtcclxuICAgICAgICB5ID0gc3R5bGVZICsgZHk7XHJcblxyXG4gICAgICAgIHRoaXMubW90aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5odG1sLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcclxuICAgICAgICB0aGlzLmh0bWwuc3R5bGUudG9wID0geSArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VzZURvd24oZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRyYWdPbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5teCA9IGV2ZW50LnNjcmVlblggLSAocGFyc2VJbnQodGhpcy5odG1sLnN0eWxlLmxlZnQpIHx8IDApO1xyXG4gICAgICAgIHRoaXMubXkgPSBldmVudC5zY3JlZW5ZIC0gKHBhcnNlSW50KHRoaXMuaHRtbC5zdHlsZS50b3ApIHx8IDApO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VVcChldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5tb3Rpb24gJiYgdGhpcy5kcmFnT24pIHtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hDb2xvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kcmFnT24gPSBmYWxzZTtcclxuICAgIH1cclxufSIsIlxyXG4vLyDQktGL0YfQuNGB0LvRj9C10YIg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0LzQtdC20LTRgyDQtNCy0YPQvNGPINGC0L7Rh9C60LDQvNC4ICjQu9C40LHQviDQvtGCIHh5MSDQtNC+INC90LDRh9Cw0LvQsCDQutC+0L7RgNC00LjQvdCw0YIpXHJcbmZ1bmN0aW9uIGdldERpc3RhbmNlKHh5MSwgeHkyKSB7XHJcbiAgICBpZiAoIXh5MSkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh4eTIpIHtcclxuICAgICAgICBsZXQgZHggPSB4eTIueCAtIHh5MS54O1xyXG4gICAgICAgIGxldCBkeSA9IHh5Mi55IC0geHkxLnk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4eTEueCwgMikgKyBNYXRoLnBvdyh4eTEueSwgMikpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDQntGA0LjQtdC90YLQuNGA0L7QstCw0L3QvdCw0Y8g0L/Qu9C+0YnQsNC00Ywg0YLRgNC10YPQs9C+0LvRjNC90LjQutCwIFthLCBiLCBjXVxyXG5mdW5jdGlvbiBnZXRUcmlhbmdsZU9yaWVudGVkU3F1YXJlKGEsIGIsIGMpIHtcclxuICAgIHJldHVybiAwLjUgKiAoYS54ICogYi55ICsgYi54ICogYy55ICsgYy54ICogYS55IC0gYS55ICogYi54IC0gYi55ICogYy54IC0gYy55ICogYS54KTtcclxufVxyXG5cclxuLy8g0JLQvtC30LLRgNCw0YnQsNC10YIg0LfQvdCw0Log0YfQuNGB0LvQsFxyXG5mdW5jdGlvbiBnZXRTaWduKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgPCAwID8gLTEgOiAxO1xyXG59XHJcblxyXG4vLyDQktGL0YfQuNGB0LvRj9C10YIg0YPQs9C+0Lsg0L3QsNC60LvQvtC90LAg0L7RgtGA0LXQt9C60LAgW2Jhc2VQb2ludCwgcmVtb3RlUG9pbnRdXHJcbmZ1bmN0aW9uIGdldEFuZ2xlKGJhc2VQb2ludCwgcmVtb3RlUG9pbnQpXHJcbntcclxuICAgIGlmICghcmVtb3RlUG9pbnQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoYmFzZVBvaW50LnksIGJhc2VQb2ludC54KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTWF0aC5hdGFuMihyZW1vdGVQb2ludC55IC0gYmFzZVBvaW50LnksIHJlbW90ZVBvaW50LnggLSBiYXNlUG9pbnQueCk7XHJcbn1cclxuXHJcbi8vINCS0YvRh9C40YHQu9GP0LXRgiDQutC+0L7RgNC00LjQvdCw0YLRiyDRgtC+0YfQutC4LCDQu9C10LbQsNGJ0LXQuSDQvdCwINGA0LDRgdGB0YLQvtGP0L3QuNC4IHJhZGl1cyDQuCDQv9C+INC90LDQv9GA0LDQstC70LXQvdC40Y4gYW5nbGUg0L/QviDQvtGC0L3QvtGI0LXQvdC40Y4g0Log0YLQvtGH0LrQtSBjZW50ZXIgKNC70LjQsdC+INC6IHswLCAwfSlcclxuZnVuY3Rpb24gZ2V0UG9pbnRGcm9tUkFDKHJhZGl1cywgYW5nbGUsIGNlbnRlcikge1xyXG4gICAgaWYgKGNlbnRlciA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHt4OiByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSksIHk6IHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4ge3g6IGNlbnRlci54ICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpLCB5OiBjZW50ZXIueSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDQntC/0YDQtdC00LXQu9GP0LXRgiwg0L/RgNC40L3QsNC00LvQtdC20LjRgiDQu9C4INCy0LXQu9C40YfQuNC90LAgdmFsdWUg0L7RgtGA0LXQt9C60YMgW2EsIGJdXHJcbmZ1bmN0aW9uIGlzVmFsdWVCZXR3ZWVuKHZhbHVlLCBhLCBiKSB7XHJcbiAgICBsZXQgdmFsTWluID0gTWF0aC5taW4oYSwgYik7XHJcbiAgICBsZXQgdmFsTWF4ID0gTWF0aC5tYXgoYSwgYik7XHJcblxyXG4gICAgbGV0IG8gPSAwLjAwMDAwMDE7XHJcbiAgICByZXR1cm4gKHZhbHVlID49IHZhbE1pbikgJiYgKHZhbHVlIDw9IHZhbE1heCkgfHwgTWF0aC5hYnModmFsdWUgLSBhKSA8IG8gfHwgTWF0aC5hYnModmFsdWUgLSBiKSA8IG87XHJcbn1cclxuXHJcbi8vINCd0LDRhdC+0LTQuNGCINGC0L7Rh9C60YMg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDQvtGC0YDQtdC30LrQvtCyIFthLCBiXSDQuCBbYywgZF1cclxuZnVuY3Rpb24gZ2V0SW50ZXJzZWN0aW9uUG9pbnQoYSwgYiwgYywgZCkge1xyXG4gICAgbGV0IGRBID0gKChkLnkgLSBjLnkpICogKGIueCAtIGEueCkgLSAoZC54IC0gYy54KSAqIChiLnkgLSBhLnkpKTtcclxuICAgIGxldCBkQiA9ICgoZC55IC0gYy55KSAqIChiLnggLSBhLngpIC0gKGQueCAtIGMueCkgKiAoYi55IC0gYS55KSk7XHJcblxyXG4gICAgaWYgKGRBID09IDAgfHwgZEIgPT0gMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1QSA9ICgoZC54IC0gYy54KSAqIChhLnkgLSBjLnkpIC0gKGQueSAtIGMueSkgKiAoYS54IC0gYy54KSkgLyBkQTtcclxuICAgIGxldCB1QiA9ICgoYi54IC0gYS54KSAqIChhLnkgLSBjLnkpIC0gKGIueSAtIGEueSkgKiAoYS54IC0gYy54KSkgLyBkQjtcclxuXHJcbiAgICBsZXQgcnggPSBhLnggKyB1QSAqIChiLnggLSBhLngpO1xyXG4gICAgbGV0IHJ5ID0gYS55ICsgdUEgKiAoYi55IC0gYS55KTtcclxuXHJcbiAgICBsZXQgaGFzSW50ZXJzZWN0aW9uID0gaXNWYWx1ZUJldHdlZW4ocngsIGEueCwgYi54KSAmJiBpc1ZhbHVlQmV0d2VlbihyeCwgYy54LCBkLngpICYmIGlzVmFsdWVCZXR3ZWVuKHJ5LCBhLnksIGIueSkgJiYgaXNWYWx1ZUJldHdlZW4ocnksIGMueSwgZC55KTtcclxuXHJcbiAgICByZXR1cm4gaGFzSW50ZXJzZWN0aW9uID8geyB4OnJ4LCB5OnJ5IH0gOiBudWxsO1xyXG59XHJcblxyXG4vLyDQktGL0YfQuNGB0LvRj9C10YIg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDRgtC+0YfQutC4IHtweCwgcHl9INC00L4g0L7RgtGA0LXQt9C60LAgW3t4MSwgeTF9LCB7eDIsIHkyfV1cclxuZnVuY3Rpb24gZ2V0RGlzdGFuY2VGcm9tUG9pbnRUb0ludGVydmFsKHB4LCBweSwgeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIGxldCBhID0geTIgLSB5MTtcclxuICAgIGxldCBiID0geDEgLSB4MjtcclxuICAgIGxldCBjID0geTEgKiAoeDIgLSB4MSkgLSB4MSAqICh5MiAtIHkxKTtcclxuXHJcbiAgICBsZXQgcCA9IGdldEludGVyc2VjdGlvblBvaW50KCB7IHg6eDEsIHk6eTEgfSwgeyB4OngyLCB5OnkyIH0sIHsgeDpweCAtIGEsIHk6cHkgLSBiIH0sIHsgeDpweCArIGEsIHk6cHkgKyBiIH0pO1xyXG5cclxuICAgIGlmICghcCl7XHJcbiAgICAgICAgbGV0IGQxID0gZ2V0RGlzdGFuY2UoIHsgeDpweCwgeTpweSB9LCB7IHg6eDEsIHk6eTEgfSApO1xyXG4gICAgICAgIGxldCBkMiA9IGdldERpc3RhbmNlKCB7IHg6cHgsIHk6cHkgfSwgeyB4OngyLCB5OnkyIH0gKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5taW4oZDEsIGQyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2V0RGlzdGFuY2UocCwge3g6cHgsIHk6cHl9KTtcclxufVxyXG5cclxuLy8g0JjRgdGF0L7QtNGPINC40Lcg0L/QvtC30LjRhtC40LggcCwg0LLRi9GH0LjRgdC70Y/QtdGCINCx0LvQuNC20LDQudGI0YPRjiDQuiDQvdC10Lkg0YLQvtGH0LrRgywg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQutC+0YLQvtGA0L7QuSDQtNC+IGNlbnRlciDQvdC1INCx0L7Qu9GM0YjQtSByYWRpdXNcclxuZnVuY3Rpb24gZ2V0TmVhcmVzdEF2YWlsYWJsZVBvaW50VG9Qb2ludChwLCBjZW50ZXIsIHJhZGl1cywgZmxpcCkge1xyXG4gICAgaWYgKGdldERpc3RhbmNlKHAsIGNlbnRlcikgPj0gcmFkaXVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGEgPSBnZXRBbmdsZShjZW50ZXIsIHApO1xyXG4gICAgcmV0dXJuIGdldFBvaW50RnJvbVJBQyhyYWRpdXMsIGEsIGNlbnRlcik7XHJcbn1cclxuXHJcblxyXG4vLyDQmNGB0YXQvtC00Y8g0LjQtyDQv9C+0LfQuNGG0LjQuCBwLCDQstGL0YfQuNGB0LvRj9C10YIg0LHQu9C40LbQsNC50YjRg9GOINC6INC90LXQuSDRgtC+0YfQutGDLCDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60L7RgtC+0YDQvtC5INC00L4g0L7RgtGA0LXQt9C60LAgW2EsIGJdINC90LUg0LHQvtC70YzRiNC1IHJhZGl1c1xyXG4vLyDQldGB0LvQuCDQv9C10YDQtdC00LDQvSDQv9Cw0YDQsNC80LXRgtGAIGN1cnJlbnRQb3NpdGlvbiwg0L/RgNC10LTQu9C+0LbQtdC90L3QsNGPINGC0L7Rh9C60LAg0LHRg9C00LXRgiDQv9C+INGC0YMg0LbQtSDRgdGC0L7RgNC+0L3RgyDQvtGC0YDQtdC30LrQsCBbYSwgYl0sINGH0YLQviDQuCBjdXJyZW50UG9zaXRpb25cclxuZnVuY3Rpb24gZ2V0TmVhcmVzdEF2YWlsYWJsZVBvaW50VG9JbnRlcnZhbChwLCBhLCBiLCByYWRpdXMsIGN1cnJlbnRQb3NpdGlvbikge1xyXG5cclxuICAgIC8vINCS0YvRj9GB0L3Rj9C10LwsINC70LXQttCw0YIg0LvQuCBwINC4IGN1cnJlbnRQb3NpdG9uINC/0L4g0L7QtNC90YMg0YHRgtC+0YDQvtC90YMg0L7RgiDQvtGC0YDQtdC30LrQsCBbYSwgYl1cclxuICAgIGxldCBvdGhlclNpZGVzID0gZmFsc2U7XHJcbiAgICBpZiAoY3VycmVudFBvc2l0aW9uKSB7XHJcbiAgICAgICAgbGV0IHMxID0gZ2V0VHJpYW5nbGVPcmllbnRlZFNxdWFyZShhLCBiLCBwKTtcclxuICAgICAgICBsZXQgczIgPSBnZXRUcmlhbmdsZU9yaWVudGVkU3F1YXJlKGEsIGIsIGN1cnJlbnRQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIG90aGVyU2lkZXMgPSBnZXRTaWduKHMxKSAhPSBnZXRTaWduKHMyKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgazEgPSBiLnkgLSBhLnk7XHJcbiAgICBsZXQgazIgPSBhLnggLSBiLng7XHJcbiAgICBsZXQgazMgPSBhLnkgKiAoYi54IC0gYS54KSAtIGEueCAqIGsxO1xyXG5cclxuICAgIGxldCBpcCA9IGdldEludGVyc2VjdGlvblBvaW50KCB7IHg6YS54LCB5OmEueSB9LCB7IHg6Yi54LCB5OmIueSB9LCB7IHg6cC54IC0gazEsIHk6cC55IC0gazIgfSwgeyB4OnAueCArIGsxLCB5OnAueSArIGsyIH0pO1xyXG5cclxuICAgIC8vINCb0LXQttC40YIg0LvQuCDRgtC+0YfQutCwINC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LfQsCDQv9GA0LXQtNC10LvQsNC80Lgg0L7RgtGA0LXQt9C60LAgW2EsIGJdXHJcbiAgICBsZXQgaGFzSW50ZXJzZWN0aW9uID0gaXAgIT0gbnVsbDtcclxuICAgIGlmICghaGFzSW50ZXJzZWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGRhID0gZ2V0RGlzdGFuY2UoIHsgeDpwLngsIHk6cC55IH0sIHsgeDphLngsIHk6YS55IH0gKTtcclxuICAgICAgICBsZXQgZGIgPSBnZXREaXN0YW5jZSggeyB4OnAueCwgeTpwLnkgfSwgeyB4OmIueCwgeTpiLnkgfSApO1xyXG5cclxuICAgICAgICBpcCA9IGRhIDwgZGIgPyBhIDogYjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3RoZXJTaWRlcyAmJiBoYXNJbnRlcnNlY3Rpb24pIHtcclxuICAgICAgICBwID0gZ2V0UG9pbnRGcm9tUkFDKGdldERpc3RhbmNlKHAsIGlwKSwgZ2V0QW5nbGUoaXAsIHApICsgTWF0aC5QSSwgaXApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZXROZWFyZXN0QXZhaWxhYmxlUG9pbnRUb1BvaW50KHAsIGlwLCByYWRpdXMpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIGdldEludGVyc2VjdGlvblBvaW50LFxyXG4gICAgZ2V0RGlzdGFuY2VGcm9tUG9pbnRUb0ludGVydmFsLFxyXG4gICAgZ2V0TmVhcmVzdEF2YWlsYWJsZVBvaW50VG9JbnRlcnZhbCxcclxuICAgIGdldERpc3RhbmNlXHJcbn07XHJcbiJdfQ==

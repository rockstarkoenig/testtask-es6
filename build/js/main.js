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

                _this.appContainer.addEventListener("mouseleave", function (event) {
                        _this.onMouseUp(event);
                });
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
        var sign = getSign(a, b, currentPosition);
        p = getPointFromRAC(radius / 2, getAngle(a, b) + Math.PI / 2 * sign, ip);
    }

    return getNearestAvailablePointToPoint(p, ip, radius);
}

exports.getIntersectionPoint = getIntersectionPoint;
exports.getDistanceFromPointToInterval = getDistanceFromPointToInterval;
exports.getNearestAvailablePointToInterval = getNearestAvailablePointToInterval;
exports.getDistance = getDistance;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGVzNlxcQm94LmVzNiIsInNyY1xcZXM2XFxEaXNwbGF5T2JqZWN0LmVzNiIsInNyY1xcZXM2XFxNYWluLmVzNiIsInNyY1xcZXM2XFxTbWlsZS5lczYiLCJzcmNcXGVzNlxcZ2VvbWV0cnkuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7SUFFYSxHLFdBQUEsRzs7O0FBRVQsbUJBQWM7QUFBQTs7QUFHVjtBQUhVOztBQUlWLGNBQUssV0FBTCxHQUFtQixDQUNmLEVBQUUsSUFBSSxDQUFOLEVBQVMsSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsSUFBSSxDQUEzQixFQURlLEVBRWYsRUFBRSxJQUFJLENBQU4sRUFBUyxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixJQUFJLENBQTNCLEVBRmUsRUFHZixFQUFFLElBQUksQ0FBTixFQUFTLElBQUksR0FBYixFQUFrQixJQUFJLENBQXRCLEVBQXlCLElBQUksR0FBN0IsRUFIZSxFQUlmLEVBQUUsSUFBSSxDQUFOLEVBQVMsSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsSUFBSSxDQUEzQixFQUplLENBQW5CO0FBSlU7QUFVYjs7OztxQ0FFWTtBQUNUOztBQUVBLGdCQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQSxpQkFBSyxTQUFMLEdBQWlCLEtBQWpCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2QlEsYSxXQUFBLGE7QUFDVCw2QkFBYztBQUFBOztBQUNWLGFBQUssWUFBTCxHQUFvQixTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBcEI7QUFDQSxhQUFLLElBQUwsR0FBWSxLQUFLLFVBQUwsRUFBWjs7QUFFQSxhQUFLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBOEIsS0FBSyxJQUFuQztBQUNI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QUFDSDs7QUFFRCxRQUFJLGNBQWMsZUFBbEIsRUFBbUM7QUFDL0IsWUFBSSxPQUFPLFFBQVEsQ0FBUixFQUFXLENBQVgsRUFBYyxlQUFkLENBQVg7QUFDQSxZQUFJLGdCQUFnQixTQUFTLENBQXpCLEVBQTRCLFNBQVMsQ0FBVCxFQUFZLENBQVosSUFBaUIsS0FBSyxFQUFMLEdBQVUsQ0FBVixHQUFjLElBQTNELEVBQWlFLEVBQWpFLENBQUo7QUFDSDs7QUFFRCxXQUFPLGdDQUFnQyxDQUFoQyxFQUFtQyxFQUFuQyxFQUF1QyxNQUF2QyxDQUFQO0FBQ0g7O1FBSUcsb0IsR0FBQSxvQjtRQUNBLDhCLEdBQUEsOEI7UUFDQSxrQyxHQUFBLGtDO1FBQ0EsVyxHQUFBLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgRGlzcGxheU9iamVjdCB9IGZyb20gJy4vRGlzcGxheU9iamVjdC5lczYnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIERpc3BsYXlPYmplY3R7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgLy8g0JTQsNC90L3Ri9C1INC+INCz0YDQsNC90LjRhtCw0YUg0LTQu9GPINC+0LHRgNCw0LHQvtGC0LrQuCDQutC+0LvQu9C40LfQuNC5XHJcbiAgICAgICAgdGhpcy5ib3JkZXJzRGF0YSA9IFtcclxuICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiAwLCB5MjogMSB9LFxyXG4gICAgICAgICAgICB7IHgxOiAwLCB5MTogMSwgeDI6IDEsIHkyOiAxIH0sXHJcbiAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLjYsIHgyOiAxLCB5MjogMC42IH0sXHJcbiAgICAgICAgICAgIHsgeDE6IDEsIHkxOiAxLCB4MjogMSwgeTI6IDAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlSHRtbCgpIHtcclxuICAgICAgICBzdXBlci5jcmVhdGVIdG1sKCk7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaHRtbC5jbGFzc05hbWUgPSBcImJveFwiO1xyXG5cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBEaXNwbGF5T2JqZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYXBwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBDb250YWluZXJcIik7XHJcbiAgICAgICAgdGhpcy5odG1sID0gdGhpcy5jcmVhdGVIdG1sKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlSHRtbCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQm94IH0gZnJvbSAnLi9Cb3guZXM2JztcclxuaW1wb3J0IHsgU21pbGUgfSBmcm9tICcuL1NtaWxlLmVzNic7XHJcbmltcG9ydCB7Z2V0TmVhcmVzdEF2YWlsYWJsZVBvaW50VG9JbnRlcnZhbCwgZ2V0RGlzdGFuY2VGcm9tUG9pbnRUb0ludGVydmFsfSBmcm9tICcuL2dlb21ldHJ5LmVzNic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFwcENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwQ29udGFpbmVyXCIpO1xyXG5cclxuICAgICAgICAvLyDQlNCw0L3QvdGL0LUg0L4g0LPRgNCw0L3QuNGG0LDRhSDQtNC70Y8g0L7QsdGA0LDQsdC+0YLQutC4INC60L7Qu9C70LjQt9C40LlcclxuICAgICAgICB0aGlzLmJvcmRlcnNEYXRhID0gW1xyXG4gICAgICAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDAsIHkyOiAxIH0sXHJcbiAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAxLCB4MjogMSwgeTI6IDEgfSxcclxuICAgICAgICAgICAgeyB4MTogMSwgeTE6IDEsIHgyOiAxLCB5MjogMCB9LFxyXG4gICAgICAgICAgICB7IHgxOiAxLCB5MTogMCwgeDI6IDAsIHkyOiAwIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLnNtaWxlID0gbmV3IFNtaWxlKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYm94ID0gbmV3IEJveCgpO1xyXG5cclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZShldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQodC+0LfQtNCw0LXQvCDQs9GA0LDQvdC40YbRiyDQsiDRhNC+0YDQvNC1INC+0YLRgNC10LfQutC+0LJcclxuICAgICAgICB0aGlzLmNyZWF0ZUJvcmRlckludGVydmFscygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQm9yZGVySW50ZXJ2YWxzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQm9yZGVySW50ZXJ2YWxzKCkge1xyXG4gICAgICAgIGxldCBhcHBSZWN0ID0gdGhpcy5hcHBDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IGJveFJlY3QgPSB0aGlzLmJveC5odG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJvcmRlckludGVydmFscyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3JkZXJzRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSB7XHJcbiAgICAgICAgICAgICAgICBhOiB7IHg6IGFwcFJlY3QubGVmdCArIHRoaXMuYm9yZGVyc0RhdGFbaV0ueDEgKiBhcHBSZWN0LndpZHRoLCB5OiBhcHBSZWN0LnRvcCArIHRoaXMuYm9yZGVyc0RhdGFbaV0ueTEgKiBhcHBSZWN0LmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgYjogeyB4OiBhcHBSZWN0LmxlZnQgKyB0aGlzLmJvcmRlcnNEYXRhW2ldLngyICogYXBwUmVjdC53aWR0aCwgeTogYXBwUmVjdC50b3AgKyB0aGlzLmJvcmRlcnNEYXRhW2ldLnkyICogYXBwUmVjdC5oZWlnaHQgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ib3JkZXJJbnRlcnZhbHMucHVzaChpbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3guYm9yZGVyc0RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsID0ge1xyXG4gICAgICAgICAgICAgICAgYTogeyB4OiBib3hSZWN0LmxlZnQgKyB0aGlzLmJveC5ib3JkZXJzRGF0YVtpXS54MSAqIGJveFJlY3Qud2lkdGgsIHk6IGJveFJlY3QudG9wICsgdGhpcy5ib3guYm9yZGVyc0RhdGFbaV0ueTEgKiBib3hSZWN0LmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgYjogeyB4OiBib3hSZWN0LmxlZnQgKyB0aGlzLmJveC5ib3JkZXJzRGF0YVtpXS54MiAqIGJveFJlY3Qud2lkdGgsIHk6IGJveFJlY3QudG9wICsgdGhpcy5ib3guYm9yZGVyc0RhdGFbaV0ueTIgKiBib3hSZWN0LmhlaWdodCB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvcmRlckludGVydmFscy5wdXNoKGludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0J/RgNC+0LLQtdGA0Y/QtdGCLCDQvNC+0LbQvdC+INC70Lgg0YDQsNC30LzQtdGB0YLQuNGC0Ywg0YHQvNCw0LnQuyDQsiDQv9GA0LXQtNC70L7QttC10L3QvdC+0Lkg0YLQvtGH0LrQtSB7eCx5fS4g0JXRgdC70Lgg0L3QtdGCLCDQstC+0LfQstGA0LDRidCw0LXRgiDQsdC70LjQttCw0LnRiNGD0Y4g0Loge3gseX0g0YLQvtGH0LrRgywg0LIg0LrQvtGC0L7RgNC+0Lkg0LzQvtC20L3QviDRgNCw0LfQvNC10YHRgtC40YLRjCDRgdC80LDQudC7XHJcbiAgICBnZXRBdmFpbGFibGVQb2ludEZvclNtaWxlKHgsIHksIGN4LCBjeSkge1xyXG4gICAgICAgIGxldCByID0gdGhpcy5zbWlsZS5yYWRpdXM7XHJcbiAgICAgICAgbGV0IGZ1dHVyZVNtaWxlQ2VudGVyID0ge3g6eCArIHIsIHk6eSArIHJ9O1xyXG4gICAgICAgIGxldCBjdXJyZW50U21pbGVDZW50ZXIgPSB7eDpjeCArIHIsIHk6Y3kgKyByfTtcclxuXHJcbiAgICAgICAgbGV0IGludGVydmFscyA9IHRoaXMuZ2V0SW50ZXJzZWN0ZWRCb3JkZXJzKGZ1dHVyZVNtaWxlQ2VudGVyLngsIGZ1dHVyZVNtaWxlQ2VudGVyLnkpO1xyXG4gICAgICAgIGlmIChpbnRlcnZhbHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt4OngsIHk6eX07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGludGVydmFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSBpbnRlcnZhbHNbaV07XHJcbiAgICAgICAgICAgIGxldCBwID0gZ2V0TmVhcmVzdEF2YWlsYWJsZVBvaW50VG9JbnRlcnZhbChmdXR1cmVTbWlsZUNlbnRlciwgaW50ZXJ2YWwuYSwgaW50ZXJ2YWwuYiwgciwgY3VycmVudFNtaWxlQ2VudGVyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLmdldEludGVyc2VjdGVkQm9yZGVycyhwLngsIHAueSwgcik7XHJcbiAgICAgICAgICAgIGlmICh0bXAubGVuZ3RoID09IDAgfHwgdG1wWzBdID09IGludGVydmFsICYmIHRtcC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcDtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC54IC09IHI7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQueSAtPSByO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQv9C40YHQvtC6INCy0YHQtdGFINCz0YDQsNC90LjRh9C90YvRhSDQvtGC0YDQtdC30LrQvtCyLCDRgSDQutC+0YLQvtGA0YvQvNC4INC/0LXRgNC10YHQtdGH0LXRgtGB0Y8g0YHQvNCw0LnQuywg0LXRgdC70Lgg0LXQs9C+INGA0LDQt9C80LXRgdGC0LjRgtGMINCyINGC0L7Rh9C60LUge3gseX1cclxuICAgIGdldEludGVyc2VjdGVkQm9yZGVycyh4LCB5KSB7XHJcbiAgICAgICAgbGV0IHIgPSB0aGlzLnNtaWxlLnJhZGl1cztcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3JkZXJJbnRlcnZhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGludGVydmFsID0gdGhpcy5ib3JkZXJJbnRlcnZhbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChnZXREaXN0YW5jZUZyb21Qb2ludFRvSW50ZXJ2YWwoeCwgeSwgaW50ZXJ2YWwuYS54LCBpbnRlcnZhbC5hLnksIGludGVydmFsLmIueCwgaW50ZXJ2YWwuYi55KSA8IHIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGludGVydmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93Lk1haW4gPSBNYWluOyIsImltcG9ydCB7IERpc3BsYXlPYmplY3QgfSBmcm9tICcuL0Rpc3BsYXlPYmplY3QuZXM2JztcclxuaW1wb3J0IHtnZXREaXN0YW5jZX0gZnJvbSAnLi9nZW9tZXRyeS5lczYnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNtaWxlIGV4dGVuZHMgRGlzcGxheU9iamVjdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFpbikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sb3JzID0gW1wiI2ZmY2MwMFwiLCBcIiNmZjU1MDBcIl07XHJcbiAgICAgICAgdGhpcy5jb2xvckluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5kcmFnT24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1haW4gPSBtYWluO1xyXG4gICAgICAgIHRoaXMubW90aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5odG1sLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gcmVjdC53aWR0aCAvIDI7XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbC5vbm1vdXNlZG93biA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW91c2VEb3duKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25tb3VzZW1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZShldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBDb250YWluZXIub25tb3VzZXVwID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZVVwKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFwcENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlVXAoZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUh0bWwoKSB7XHJcbiAgICAgICAgc3VwZXIuY3JlYXRlSHRtbCgpO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGh0bWwuY2xhc3NOYW1lID0gXCJzbWlsZS1iYXNlXCI7XHJcblxyXG4gICAgICAgIGxldCBleWVMZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZXllTGVmdC5jbGFzc05hbWUgPSBcInNtaWxlLWV5ZS1sZWZ0XCI7XHJcbiAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChleWVMZWZ0KTtcclxuXHJcbiAgICAgICAgbGV0IGV5ZVJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZXllUmlnaHQuY2xhc3NOYW1lID0gXCJzbWlsZS1leWUtcmlnaHRcIjtcclxuICAgICAgICBodG1sLmFwcGVuZENoaWxkKGV5ZVJpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IG1vdXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbW91dGguY2xhc3NOYW1lID0gXCJzbWlsZS1tb3V0aFwiO1xyXG4gICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQobW91dGgpO1xyXG5cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2hDb2xvcigpIHtcclxuICAgICAgICB0aGlzLmNvbG9ySW5kZXggPSAodGhpcy5jb2xvckluZGV4ICsgMSkgJSB0aGlzLmNvbG9ycy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvcnNbdGhpcy5jb2xvckluZGV4XTtcclxuICAgICAgICB0aGlzLmh0bWwuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VNb3ZlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdPbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9GA0LXQtNC/0L7Qu9Cw0LPQsNC10LzRi9C1INCx0YPQtNGD0YnQuNC1INC60L7QvtGA0LTQuNC90LDRgtGLINC00LvRjyB0aGlzLmh0bWwuc3R5bGVcclxuICAgICAgICBsZXQgeCA9IGV2ZW50LnNjcmVlblggLSB0aGlzLm14O1xyXG4gICAgICAgIGxldCB5ID0gZXZlbnQuc2NyZWVuWSAtIHRoaXMubXk7XHJcblxyXG4gICAgICAgIC8vINCi0LXQutGD0YnQuNC1INC60L7QvtGA0LTQuNC90LDRgtGLINC00LvRjyB0aGlzLmh0bWwuc3R5bGVcclxuICAgICAgICBsZXQgc3R5bGVYID0gcGFyc2VJbnQodGhpcy5odG1sLnN0eWxlLmxlZnQpIHx8IDA7XHJcbiAgICAgICAgbGV0IHN0eWxlWSA9IHBhcnNlSW50KHRoaXMuaHRtbC5zdHlsZS50b3ApIHx8IDA7XHJcblxyXG4gICAgICAgIC8vINCh0LTQstC40LNcclxuICAgICAgICBsZXQgZHggPSB4IC0gc3R5bGVYO1xyXG4gICAgICAgIGxldCBkeSA9IHkgLSBzdHlsZVk7XHJcblxyXG4gICAgICAgIC8vINCR0YPQtNGD0YnQsNGPINC/0L7Qt9C40YbQuNGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviBjbGllbnRcclxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuaHRtbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQgbmV4dFggPSByZWN0LmxlZnQgKyBkeDtcclxuICAgICAgICBsZXQgbmV4dFkgPSByZWN0LnRvcCArIGR5O1xyXG5cclxuICAgICAgICAvLyDQlNC10LvQsNC10Lwg0L/QvtC/0YDQsNCy0LrRgyDQvdCwINCz0YDQsNC90LjRhtGLLCDQstGL0YfQuNGB0LvRj9C10Lwg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INGB0LTQstC40LPQsFxyXG4gICAgICAgIGxldCBwID0gdGhpcy5tYWluLmdldEF2YWlsYWJsZVBvaW50Rm9yU21pbGUobmV4dFgsIG5leHRZLCByZWN0LmxlZnQsIHJlY3QudG9wKTtcclxuICAgICAgICBpZiAoIXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkeCA9IHAueCAtIHJlY3QubGVmdDtcclxuICAgICAgICBkeSA9IHAueSAtIHJlY3QudG9wO1xyXG5cclxuICAgICAgICAvLyDQldGB0LvQuCDQvNGLINC00LLQuNC90YPQu9C4INGB0LzQsNC50Lsg0L3QsCDQtNCy0LAg0YDQsNC00LjRg9GB0LAg0Lgg0LHQvtC70LXQtSwg0LXRgdGC0Ywg0L/QvtC00L7Qt9GA0LXQvdC40LUsINGH0YLQviDQvNGLINC/0YvRgtCw0LXQvNGB0Y8g0L/RgNC+0LnRgtC4INGB0LrQstC+0LfRjCDRgdGC0LXQvdGDXHJcbiAgICAgICAgbGV0IG1vdGlvbkRpc3RhbmNlQ3JpdGljYWwgPSB0aGlzLnJhZGl1cyAqIDEuODtcclxuICAgICAgICBpZiAoZ2V0RGlzdGFuY2Uoe3g6ZHgsIHk6ZHl9KSA+IG1vdGlvbkRpc3RhbmNlQ3JpdGljYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J7QsdC90L7QstC70Y/QtdC8INC60L7QvtGA0LTQuNC90LDRgtGLINC00LvRjyB0aGlzLmh0bWwuc3R5bGVcclxuICAgICAgICB4ID0gc3R5bGVYICsgZHg7XHJcbiAgICAgICAgeSA9IHN0eWxlWSArIGR5O1xyXG5cclxuICAgICAgICB0aGlzLm1vdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbC5zdHlsZS5sZWZ0ID0geCArICdweCc7XHJcbiAgICAgICAgdGhpcy5odG1sLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VEb3duKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kcmFnT24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW90aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMubXggPSBldmVudC5zY3JlZW5YIC0gKHBhcnNlSW50KHRoaXMuaHRtbC5zdHlsZS5sZWZ0KSB8fCAwKTtcclxuICAgICAgICB0aGlzLm15ID0gZXZlbnQuc2NyZWVuWSAtIChwYXJzZUludCh0aGlzLmh0bWwuc3R5bGUudG9wKSB8fCAwKTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlVXAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMubW90aW9uICYmIHRoaXMuZHJhZ09uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQ29sb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ09uID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJcclxuLy8g0JLRi9GH0LjRgdC70Y/QtdGCINGA0LDRgdGB0YLQvtGP0L3QuNC1INC80LXQttC00YMg0LTQstGD0LzRjyDRgtC+0YfQutCw0LzQuCAo0LvQuNCx0L4g0L7RgiB4eTEg0LTQviDQvdCw0YfQsNC70LAg0LrQvtC+0YDQtNC40L3QsNGCKVxyXG5mdW5jdGlvbiBnZXREaXN0YW5jZSh4eTEsIHh5Mikge1xyXG4gICAgaWYgKCF4eTEpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeHkyKSB7XHJcbiAgICAgICAgbGV0IGR4ID0geHkyLnggLSB4eTEueDtcclxuICAgICAgICBsZXQgZHkgPSB4eTIueSAtIHh5MS55O1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeHkxLngsIDIpICsgTWF0aC5wb3coeHkxLnksIDIpKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g0J7RgNC40LXQvdGC0LjRgNC+0LLQsNC90L3QsNGPINC/0LvQvtGJ0LDQtNGMINGC0YDQtdGD0LPQvtC70YzQvdC40LrQsCBbYSwgYiwgY11cclxuZnVuY3Rpb24gZ2V0VHJpYW5nbGVPcmllbnRlZFNxdWFyZShhLCBiLCBjKSB7XHJcbiAgICByZXR1cm4gMC41ICogKGEueCAqIGIueSArIGIueCAqIGMueSArIGMueCAqIGEueSAtIGEueSAqIGIueCAtIGIueSAqIGMueCAtIGMueSAqIGEueCk7XHJcbn1cclxuXHJcbi8vINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC30L3QsNC6INGH0LjRgdC70LBcclxuZnVuY3Rpb24gZ2V0U2lnbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlIDwgMCA/IC0xIDogMTtcclxufVxyXG5cclxuLy8g0JLRi9GH0LjRgdC70Y/QtdGCINGD0LPQvtC7INC90LDQutC70L7QvdCwINC+0YLRgNC10LfQutCwIFtiYXNlUG9pbnQsIHJlbW90ZVBvaW50XVxyXG5mdW5jdGlvbiBnZXRBbmdsZShiYXNlUG9pbnQsIHJlbW90ZVBvaW50KVxyXG57XHJcbiAgICBpZiAoIXJlbW90ZVBvaW50KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKGJhc2VQb2ludC55LCBiYXNlUG9pbnQueCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1hdGguYXRhbjIocmVtb3RlUG9pbnQueSAtIGJhc2VQb2ludC55LCByZW1vdGVQb2ludC54IC0gYmFzZVBvaW50LngpO1xyXG59XHJcblxyXG4vLyDQktGL0YfQuNGB0LvRj9C10YIg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0YLQvtGH0LrQuCwg0LvQtdC20LDRidC10Lkg0L3QsCDRgNCw0YHRgdGC0L7Rj9C90LjQuCByYWRpdXMg0Lgg0L/QviDQvdCw0L/RgNCw0LLQu9C10L3QuNGOIGFuZ2xlINC/0L4g0L7RgtC90L7RiNC10L3QuNGOINC6INGC0L7Rh9C60LUgY2VudGVyICjQu9C40LHQviDQuiB7MCwgMH0pXHJcbmZ1bmN0aW9uIGdldFBvaW50RnJvbVJBQyhyYWRpdXMsIGFuZ2xlLCBjZW50ZXIpIHtcclxuICAgIGlmIChjZW50ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7eDogcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpLCB5OiByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSkgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHt4OiBjZW50ZXIueCArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSwgeTogY2VudGVyLnkgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSkgfTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g0J7Qv9GA0LXQtNC10LvRj9C10YIsINC/0YDQuNC90LDQtNC70LXQttC40YIg0LvQuCDQstC10LvQuNGH0LjQvdCwIHZhbHVlINC+0YLRgNC10LfQutGDIFthLCBiXVxyXG5mdW5jdGlvbiBpc1ZhbHVlQmV0d2Vlbih2YWx1ZSwgYSwgYikge1xyXG4gICAgbGV0IHZhbE1pbiA9IE1hdGgubWluKGEsIGIpO1xyXG4gICAgbGV0IHZhbE1heCA9IE1hdGgubWF4KGEsIGIpO1xyXG5cclxuICAgIGxldCBvID0gMC4wMDAwMDAxO1xyXG4gICAgcmV0dXJuICh2YWx1ZSA+PSB2YWxNaW4pICYmICh2YWx1ZSA8PSB2YWxNYXgpIHx8IE1hdGguYWJzKHZhbHVlIC0gYSkgPCBvIHx8IE1hdGguYWJzKHZhbHVlIC0gYikgPCBvO1xyXG59XHJcblxyXG4vLyDQndCw0YXQvtC00LjRgiDRgtC+0YfQutGDINC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0L7RgtGA0LXQt9C60L7QsiBbYSwgYl0g0LggW2MsIGRdXHJcbmZ1bmN0aW9uIGdldEludGVyc2VjdGlvblBvaW50KGEsIGIsIGMsIGQpIHtcclxuICAgIGxldCBkQSA9ICgoZC55IC0gYy55KSAqIChiLnggLSBhLngpIC0gKGQueCAtIGMueCkgKiAoYi55IC0gYS55KSk7XHJcbiAgICBsZXQgZEIgPSAoKGQueSAtIGMueSkgKiAoYi54IC0gYS54KSAtIChkLnggLSBjLngpICogKGIueSAtIGEueSkpO1xyXG5cclxuICAgIGlmIChkQSA9PSAwIHx8IGRCID09IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdUEgPSAoKGQueCAtIGMueCkgKiAoYS55IC0gYy55KSAtIChkLnkgLSBjLnkpICogKGEueCAtIGMueCkpIC8gZEE7XHJcbiAgICBsZXQgdUIgPSAoKGIueCAtIGEueCkgKiAoYS55IC0gYy55KSAtIChiLnkgLSBhLnkpICogKGEueCAtIGMueCkpIC8gZEI7XHJcblxyXG4gICAgbGV0IHJ4ID0gYS54ICsgdUEgKiAoYi54IC0gYS54KTtcclxuICAgIGxldCByeSA9IGEueSArIHVBICogKGIueSAtIGEueSk7XHJcblxyXG4gICAgbGV0IGhhc0ludGVyc2VjdGlvbiA9IGlzVmFsdWVCZXR3ZWVuKHJ4LCBhLngsIGIueCkgJiYgaXNWYWx1ZUJldHdlZW4ocngsIGMueCwgZC54KSAmJiBpc1ZhbHVlQmV0d2VlbihyeSwgYS55LCBiLnkpICYmIGlzVmFsdWVCZXR3ZWVuKHJ5LCBjLnksIGQueSk7XHJcblxyXG4gICAgcmV0dXJuIGhhc0ludGVyc2VjdGlvbiA/IHsgeDpyeCwgeTpyeSB9IDogbnVsbDtcclxufVxyXG5cclxuLy8g0JLRi9GH0LjRgdC70Y/QtdGCINGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0YLQvtGH0LrQuCB7cHgsIHB5fSDQtNC+INC+0YLRgNC10LfQutCwIFt7eDEsIHkxfSwge3gyLCB5Mn1dXHJcbmZ1bmN0aW9uIGdldERpc3RhbmNlRnJvbVBvaW50VG9JbnRlcnZhbChweCwgcHksIHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICBsZXQgYSA9IHkyIC0geTE7XHJcbiAgICBsZXQgYiA9IHgxIC0geDI7XHJcbiAgICBsZXQgYyA9IHkxICogKHgyIC0geDEpIC0geDEgKiAoeTIgLSB5MSk7XHJcblxyXG4gICAgbGV0IHAgPSBnZXRJbnRlcnNlY3Rpb25Qb2ludCggeyB4OngxLCB5OnkxIH0sIHsgeDp4MiwgeTp5MiB9LCB7IHg6cHggLSBhLCB5OnB5IC0gYiB9LCB7IHg6cHggKyBhLCB5OnB5ICsgYiB9KTtcclxuXHJcbiAgICBpZiAoIXApe1xyXG4gICAgICAgIGxldCBkMSA9IGdldERpc3RhbmNlKCB7IHg6cHgsIHk6cHkgfSwgeyB4OngxLCB5OnkxIH0gKTtcclxuICAgICAgICBsZXQgZDIgPSBnZXREaXN0YW5jZSggeyB4OnB4LCB5OnB5IH0sIHsgeDp4MiwgeTp5MiB9ICk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGQxLCBkMik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdldERpc3RhbmNlKHAsIHt4OnB4LCB5OnB5fSk7XHJcbn1cclxuXHJcbi8vINCY0YHRhdC+0LTRjyDQuNC3INC/0L7Qt9C40YbQuNC4IHAsINCy0YvRh9C40YHQu9GP0LXRgiDQsdC70LjQttCw0LnRiNGD0Y4g0Log0L3QtdC5INGC0L7Rh9C60YMsINGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0LrQvtGC0L7RgNC+0Lkg0LTQviBjZW50ZXIg0L3QtSDQsdC+0LvRjNGI0LUgcmFkaXVzXHJcbmZ1bmN0aW9uIGdldE5lYXJlc3RBdmFpbGFibGVQb2ludFRvUG9pbnQocCwgY2VudGVyLCByYWRpdXMsIGZsaXApIHtcclxuICAgIGlmIChnZXREaXN0YW5jZShwLCBjZW50ZXIpID49IHJhZGl1cykge1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhID0gZ2V0QW5nbGUoY2VudGVyLCBwKTtcclxuICAgIHJldHVybiBnZXRQb2ludEZyb21SQUMocmFkaXVzLCBhLCBjZW50ZXIpO1xyXG59XHJcblxyXG5cclxuLy8g0JjRgdGF0L7QtNGPINC40Lcg0L/QvtC30LjRhtC40LggcCwg0LLRi9GH0LjRgdC70Y/QtdGCINCx0LvQuNC20LDQudGI0YPRjiDQuiDQvdC10Lkg0YLQvtGH0LrRgywg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQutC+0YLQvtGA0L7QuSDQtNC+INC+0YLRgNC10LfQutCwIFthLCBiXSDQvdC1INCx0L7Qu9GM0YjQtSByYWRpdXNcclxuLy8g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L0g0L/QsNGA0LDQvNC10YLRgCBjdXJyZW50UG9zaXRpb24sINC/0YDQtdC00LvQvtC20LXQvdC90LDRjyDRgtC+0YfQutCwINCx0YPQtNC10YIg0L/QviDRgtGDINC20LUg0YHRgtC+0YDQvtC90YMg0L7RgtGA0LXQt9C60LAgW2EsIGJdLCDRh9GC0L4g0LggY3VycmVudFBvc2l0aW9uXHJcbmZ1bmN0aW9uIGdldE5lYXJlc3RBdmFpbGFibGVQb2ludFRvSW50ZXJ2YWwocCwgYSwgYiwgcmFkaXVzLCBjdXJyZW50UG9zaXRpb24pIHtcclxuXHJcbiAgICAvLyDQktGL0Y/RgdC90Y/QtdC8LCDQu9C10LbQsNGCINC70LggcCDQuCBjdXJyZW50UG9zaXRvbiDQv9C+INC+0LTQvdGDINGB0YLQvtGA0L7QvdGDINC+0YIg0L7RgtGA0LXQt9C60LAgW2EsIGJdXHJcbiAgICBsZXQgb3RoZXJTaWRlcyA9IGZhbHNlO1xyXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbikge1xyXG4gICAgICAgIGxldCBzMSA9IGdldFRyaWFuZ2xlT3JpZW50ZWRTcXVhcmUoYSwgYiwgcCk7XHJcbiAgICAgICAgbGV0IHMyID0gZ2V0VHJpYW5nbGVPcmllbnRlZFNxdWFyZShhLCBiLCBjdXJyZW50UG9zaXRpb24pO1xyXG5cclxuICAgICAgICBvdGhlclNpZGVzID0gZ2V0U2lnbihzMSkgIT0gZ2V0U2lnbihzMik7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGsxID0gYi55IC0gYS55O1xyXG4gICAgbGV0IGsyID0gYS54IC0gYi54O1xyXG4gICAgbGV0IGszID0gYS55ICogKGIueCAtIGEueCkgLSBhLnggKiBrMTtcclxuXHJcbiAgICBsZXQgaXAgPSBnZXRJbnRlcnNlY3Rpb25Qb2ludCggeyB4OmEueCwgeTphLnkgfSwgeyB4OmIueCwgeTpiLnkgfSwgeyB4OnAueCAtIGsxLCB5OnAueSAtIGsyIH0sIHsgeDpwLnggKyBrMSwgeTpwLnkgKyBrMiB9KTtcclxuXHJcbiAgICAvLyDQm9C10LbQuNGCINC70Lgg0YLQvtGH0LrQsCDQv9C10YDQtdGB0LXRh9C10L3QuNGPINC30LAg0L/RgNC10LTQtdC70LDQvNC4INC+0YLRgNC10LfQutCwIFthLCBiXVxyXG4gICAgbGV0IGhhc0ludGVyc2VjdGlvbiA9IGlwICE9IG51bGw7XHJcbiAgICBpZiAoIWhhc0ludGVyc2VjdGlvbikge1xyXG4gICAgICAgIGxldCBkYSA9IGdldERpc3RhbmNlKCB7IHg6cC54LCB5OnAueSB9LCB7IHg6YS54LCB5OmEueSB9ICk7XHJcbiAgICAgICAgbGV0IGRiID0gZ2V0RGlzdGFuY2UoIHsgeDpwLngsIHk6cC55IH0sIHsgeDpiLngsIHk6Yi55IH0gKTtcclxuXHJcbiAgICAgICAgaXAgPSBkYSA8IGRiID8gYSA6IGI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG90aGVyU2lkZXMgJiYgaGFzSW50ZXJzZWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHNpZ24gPSBnZXRTaWduKGEsIGIsIGN1cnJlbnRQb3NpdGlvbik7XHJcbiAgICAgICAgcCA9IGdldFBvaW50RnJvbVJBQyhyYWRpdXMgLyAyLCBnZXRBbmdsZShhLCBiKSArIE1hdGguUEkgLyAyICogc2lnbiwgaXApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZXROZWFyZXN0QXZhaWxhYmxlUG9pbnRUb1BvaW50KHAsIGlwLCByYWRpdXMpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtcclxuICAgIGdldEludGVyc2VjdGlvblBvaW50LFxyXG4gICAgZ2V0RGlzdGFuY2VGcm9tUG9pbnRUb0ludGVydmFsLFxyXG4gICAgZ2V0TmVhcmVzdEF2YWlsYWJsZVBvaW50VG9JbnRlcnZhbCxcclxuICAgIGdldERpc3RhbmNlXHJcbn07XHJcbiJdfQ==

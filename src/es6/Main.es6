import { Box } from './Box.es6';
import { Smile } from './Smile.es6';
import {getNearestAvailablePointToInterval, getDistanceFromPointToInterval} from './geometry.es6';

export default class Main {

    constructor() {
        this.appContainer = document.getElementById("appContainer");

        // Данные о границах для обработки коллизий
        this.bordersData = [
            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 0, y1: 1, x2: 1, y2: 1 },
            { x1: 1, y1: 1, x2: 1, y2: 0 },
            { x1: 1, y1: 0, x2: 0, y2: 0 }
        ];

        this.smile = new Smile(this);
        this.box = new Box();

        window.onresize = (event) => {
            this.onResize(event);
        }

        // Создаем границы в форме отрезков
        this.createBorderIntervals();
    }

    onResize() {
        this.createBorderIntervals();
    }

    createBorderIntervals() {
        let appRect = this.appContainer.getBoundingClientRect();
        let boxRect = this.box.html.getBoundingClientRect();

        this.borderIntervals = [];
        for (let i = 0; i < this.bordersData.length; i++) {
            let interval = {
                a: { x: appRect.left + this.bordersData[i].x1 * appRect.width, y: appRect.top + this.bordersData[i].y1 * appRect.height },
                b: { x: appRect.left + this.bordersData[i].x2 * appRect.width, y: appRect.top + this.bordersData[i].y2 * appRect.height }
            };

            this.borderIntervals.push(interval);
        }
        for (let i = 0; i < this.box.bordersData.length; i++) {
            let interval = {
                a: { x: boxRect.left + this.box.bordersData[i].x1 * boxRect.width, y: boxRect.top + this.box.bordersData[i].y1 * boxRect.height },
                b: { x: boxRect.left + this.box.bordersData[i].x2 * boxRect.width, y: boxRect.top + this.box.bordersData[i].y2 * boxRect.height }
            };

            this.borderIntervals.push(interval);
        }
    }

    // Проверяет, можно ли разместить смайл в предложенной точке {x,y}. Если нет, возвращает ближайшую к {x,y} точку, в которой можно разместить смайл
    getAvailablePointForSmile(x, y, cx, cy) {
        let r = this.smile.radius;
        let futureSmileCenter = {x:x + r, y:y + r};
        let currentSmileCenter = {x:cx + r, y:cy + r};

        let intervals = this.getIntersectedBorders(futureSmileCenter.x, futureSmileCenter.y);
        if (intervals.length == 0) {
            return {x:x, y:y};
        }

        let result = null;
        for (let i = 0; i < intervals.length; i++) {
            let interval = intervals[i];
            let p = getNearestAvailablePointToInterval(futureSmileCenter, interval.a, interval.b, r, currentSmileCenter);

            let tmp = this.getIntersectedBorders(p.x, p.y, r);
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
    getIntersectedBorders(x, y) {
        let r = this.smile.radius;

        let result = [];
        for (let i = 0; i < this.borderIntervals.length; i++) {
            let interval = this.borderIntervals[i];
            if (getDistanceFromPointToInterval(x, y, interval.a.x, interval.a.y, interval.b.x, interval.b.y) < r) {
                result.push(interval);
            }
        }

        return result;
    }
}

window.Main = Main;
import { DisplayObject } from './DisplayObject.es6';
import {getDistance} from './geometry.es6';

export class Smile extends DisplayObject {

    constructor(main) {
        super();

        this.colors = ["#ffcc00", "#ff5500"];
        this.colorIndex = 0;

        this.dragOn = false;
        this.main = main;
        this.motion = false;

        let rect = this.html.getBoundingClientRect();
        this.radius = rect.width / 2;

        this.html.onmousedown = (event) => {
            this.onMouseDown(event);
        };

        window.onmousemove = (event) => {
            this.onMouseMove(event);
        };

        this.appContainer.onmouseup = (event) => {
            this.onMouseUp(event);
        };

    }

    createHtml() {
        super.createHtml();

        let html = document.createElement('div');
        html.className = "smile-base";

        let eyeLeft = document.createElement('div');
        eyeLeft.className = "smile-eye-left";
        html.appendChild(eyeLeft);

        let eyeRight = document.createElement('div');
        eyeRight.className = "smile-eye-right";
        html.appendChild(eyeRight);

        let mouth = document.createElement('div');
        mouth.className = "smile-mouth";
        html.appendChild(mouth);

        return html;
    }

    switchColor() {
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        let color = this.colors[this.colorIndex];
        this.html.style['background-color'] = color;
    }

    onMouseMove(event) {
        if (!this.dragOn) {
            return;
        }

        // Предполагаемые будущие координаты для this.html.style
        let x = event.screenX - this.mx;
        let y = event.screenY - this.my;

        // Текущие координаты для this.html.style
        let styleX = parseInt(this.html.style.left) || 0;
        let styleY = parseInt(this.html.style.top) || 0;

        // Сдвиг
        let dx = x - styleX;
        let dy = y - styleY;

        // Будущая позиция относительно client
        let rect = this.html.getBoundingClientRect();
        let nextX = rect.left + dx;
        let nextY = rect.top + dy;

        // Делаем поправку на границы, вычисляем новое значение сдвига
        let p = this.main.getAvailablePointForSmile(nextX, nextY, rect.left, rect.top);
        if (!p) {
            return;
        }
        dx = p.x - rect.left;
        dy = p.y - rect.top;

        // Если мы двинули смайл на два радиуса и более, есть подозрение, что мы пытаемся пройти сквозь стену
        let motionDistanceCritical = this.radius * 1.8;
        if (getDistance({x:dx, y:dy}) > motionDistanceCritical) {
            return;
        }

        // Обновляем координаты для this.html.style
        x = styleX + dx;
        y = styleY + dy;

        this.motion = true;

        this.html.style.left = x + 'px';
        this.html.style.top = y + 'px';
    }

    onMouseDown(event) {
        this.dragOn = true;
        this.motion = false;

        this.mx = event.screenX - (parseInt(this.html.style.left) || 0);
        this.my = event.screenY - (parseInt(this.html.style.top) || 0);
    }

    onMouseUp(event) {
        if (!this.motion) {
            this.switchColor();
        }

        this.dragOn = false;
    }
}
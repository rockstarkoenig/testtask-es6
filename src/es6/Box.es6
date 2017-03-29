import { DisplayObject } from './DisplayObject.es6';

export class Box extends DisplayObject{

    constructor() {
        super();

        // Данные о границах для обработки коллизий
        this.bordersData = [
            { x1: 0, y1: 0, x2: 0, y2: 1 },
            { x1: 0, y1: 1, x2: 1, y2: 1 },
            { x1: 0, y1: 0.6, x2: 1, y2: 0.6 },
            { x1: 1, y1: 1, x2: 1, y2: 0 }
        ];
    }

    createHtml() {
        super.createHtml();

        let html = document.createElement('div');
        html.className = "box";

        return html;
    }
}
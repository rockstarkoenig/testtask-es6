export class DisplayObject {
    constructor() {
        this.appContainer = document.getElementById("appContainer");
        this.html = this.createHtml();

        this.appContainer.appendChild(this.html);
    }

    createHtml() {

    }

}
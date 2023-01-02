export class Mensaje extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <div class="container">
             <h1 class="content__title">Felicitaciones</h1>
             <div class="content__container">
                <p class="content__container__desciption">Sus datos fueron guardados con exitos !!!</p>
             </div>
            </div>
        `;
    }
}
customElements.define("mensaje-web", Mensaje);

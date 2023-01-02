import { Router } from "@vaadin/router";
import { state } from "../state";
export class Inicio extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <div class="container">
             <h1 class="content__title">Perdistes tu mejor amigo?</h1>
             <div class="content__container">
                <p class="content__container__desciption">
                Estas son las mascotas que han sido reportadas cerca de ti.
                </p>
                <button class="button">mascotas perdidas</button>
             </div>
            </div>
        `;
        const perdidas = this.querySelector(".button");
        perdidas.addEventListener("click", () => {
            // OBTERNER UBICACION ACTUAL
            navigator.geolocation.getCurrentPosition((e) => {
                const lng = e.coords.latitude as any;
                const lat = e.coords.longitude as any;
                localStorage.setItem("lng", lng);
                localStorage.setItem("lat", lat);
            });
            Router.go("/perdidas");
        });
    }
}
customElements.define("inicio-web", Inicio);

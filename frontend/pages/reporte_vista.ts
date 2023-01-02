import { Router } from "@vaadin/router";
import { state } from "../state";
export class ReportesVista extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
        <form class="perdidas-mascota">
            <div class="container">
                <h1 class="content__title">Vistes esta mascota</h1>
                    <div class="content__container">
                            <p class="content__container__desciption">Gracias por tu ayuda !!!</p>
                            <input type="text" name="nombre" placeholder="nombre" required>
                            <input type="text" name="telefono" placeholder="telefono" required>
                            <textarea name="comentario" placeholder="donde lo vistes"></textarea>
                            <button class="enviar">Enviar</button>
                    </div>
            </div>
       </form>`;
    const formEl = document.querySelector('.perdidas-mascota') as any;
    formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        const cs = state.getState(); 
        const idMascota = cs.idMascota;
        const enviar = document.querySelector('.enviar') as any;
        enviar.disabled = true;
        const nombre = event.target["nombre"].value;
        const telefono = event.target["telefono"].value;
        const comentario = event.target["comentario"].value;
        const email =cs.email;
        state.reportarMascota(idMascota, nombre,telefono,comentario , email ,(cb) => {
         if (cb) Router.go("/mensaje");
        });
        })
  }
}
customElements.define("reporte-mascota-web", ReportesVista);
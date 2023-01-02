import { Router } from "@vaadin/router";
import { state } from "../state";
export class Mascota extends HTMLElement {
    connectedCallback() {
        state.getToken((token) => {
            if (token) {
                this.render();
            } else {
                Router.go("/inicio");
            }
        });
    }
    render() {
        this.innerHTML = `
        <div class="container">
        <h1 class="content__title">Mis Mascotas</h1>
        <div class="content__container">
           <p class="content__container__desciption">
           Podes agregar y modificar tus mascotas !!!
           </p>
           <div class="mascota">
           <template id="mascota-template">
                <div class="mascota__imagen"></div>
                <div class="mascota__nombre"></div>
                <button class="small__button">editar</button>
           </template>  
           </div>       
          <button class="button">nueva mascota </button>
       </div>
        `;
       
        const c = document.querySelector(".mascota") as any;
        const t = document.querySelector("#mascota-template") as any;
        state.mascotaLista((e) => {
            for (const r of e) {
                const titleEl = t.content.querySelector(".mascota__nombre");
                const imgEl = t.content.querySelector(".mascota__imagen");
                const editar = t.content.querySelector(".small__button");
                titleEl.textContent = r.nombre;
                imgEl.style.backgroundImage = "URL('" + r.pictureURL + "')";
                editar.setAttribute("value", r.id);
                const modo = document.importNode(t.content, true);
                c.appendChild(modo);
                let linkEditar = document.querySelectorAll(
                    ".small__button"
                ) as any;
                linkEditar.forEach((idMascota) => {
                    idMascota.addEventListener("click", function (event) {
                        const cs = state.getState();
                        cs.idMascota = idMascota.value;                        
                           Router.go("/mascota_editar");
                    });
                });
            }
        });
        const nueva = this.querySelector(".button");
        nueva.addEventListener("click", () => {
            Router.go("/mascota_nueva");
        });
    }
}
customElements.define("mascota-leer-web", Mascota);

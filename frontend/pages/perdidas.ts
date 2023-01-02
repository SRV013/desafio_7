import { Router } from "@vaadin/router";
import { state } from "../state";
export class Perdidas extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
        <form class="mascota-perdidas">        
        <div class="container">
        <h1 class="content__title">Desaparecidas y extraviadas</h1>
        <div class="content__container">
           <p class="content__container__desciption">
           Se encontraron <a class="encontradas">0</a> mascotas a <a class="cerca">0</a> de distancia, si vistes algunas nos gustarias que la puedas reportar !!!
           </p>
           <div class="distancia">
             <a class="Radius" href='?radius:100'>1 cuadras</a>
             <a class="Radius" href='?radius:500'>50 cuadras</a>
             <a class="Radius" href='?radius:1000'>10 cuadras</a>
             <a class="Radius" href='?radius:10000'>10 km</a>
             <a class="Radius" href='?radius:100000'>100 km</a>
             <a class="Radius" href='?radius:500000'>500 km</a>
           </div>
           <div class="mascota">
           <template class="mascota-template">
                    <div class="mascota__imagen"></div>
                    <div class="mascota__nombre"></div>
                    <button class="small__button">yo la vi</button>
          </template> 
           </div>
       </div>
       </form>
        `;
        const c = document.querySelector(".mascota") as any;
        const t = document.querySelector(".mascota-template") as any;
        function leer(aroundRadius) {
            document.querySelector(".mascota").textContent = "Buscando ...";
            state.mascotaPerdidas(aroundRadius, (e) => {
                if (e.length < 1) {
                    document.querySelector(".mascota").textContent =
                        "NO HAY DATOS";
                    document.querySelector(".encontradas").textContent = "0";
                } else {
                    document.querySelector(".mascota").textContent = "";
                    for (const r of e) {
                        document.querySelector(".encontradas").textContent =
                            e.length;
                        const titleEl =
                            t.content.querySelector(".mascota__nombre");
                        const imgEl =
                            t.content.querySelector(".mascota__imagen");
                        const editar =
                            t.content.querySelector(".small__button");
                        titleEl.textContent = r.nombre;
                        imgEl.style.backgroundImage =
                            "URL('" + r.pictureURL + "')";
                        editar.setAttribute("value", r.id);
                        const modo = document.importNode(t.content, true);
                        c.appendChild(modo);
                        let linkEditar = document.querySelectorAll(
                            ".small__button"
                        ) as any;
                        linkEditar.forEach((idMascota) => {
                            idMascota.addEventListener("click", (e) => {
                                e.preventDefault();
                                // OBTENER MAIL
                                state.email(r.idUsuario, (cb) => {
                                    const cs = state.getState();
                                    cs.idMascota = idMascota.value;
                                    cs.email = cb;
                                });
                                Router.go("/reporte_vista");
                            });
                        });
                    }
                }
            });
        }
        document.querySelectorAll(".Radius").forEach((div) => {
            div.addEventListener("click", (e) => {
                var href = div.getAttribute("href");
                const radius = href;
                const obterner = radius.split(":");
                const aroundRadius = parseInt(obterner[1]);
                document.querySelector(".cerca").textContent = div.innerHTML;
                leer(aroundRadius);
            });
        });
    }
}
customElements.define("perdidas-web", Perdidas);

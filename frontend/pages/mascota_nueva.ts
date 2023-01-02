import { Router } from "@vaadin/router";
import { state } from "../state";
import "../lib/dropzone";
import { Dropzone } from "dropzone";
export class MascotaNueva extends HTMLElement {
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
        <form class="nueva-mascota">        
            <div class="container">
             <h1 class="content__title">Agregar Mascota</h1>
             <div class="content__container">
             <p class="content__container__desciption">Ingresa los datos de tu mascota !!!</p>
             <div class="mascota">
                <div class="mascota__cargar">AGREGAR FOTO</div>
                <div class="mascota__imagen profile-picture-button"></div>
             </div>
               <input type="text" name="nombre" placeholder="nombre">
               <textarea name="sobremi" placeholder="sobre mi"></textarea>
               <input type="text" name="ubicacion" placeholder="mi ubicación" READONLY>
               <button class="small__button">Agregar ubicacion</button>
                    <label><input type="checkbox" name="publicada"/>Publicar Mi Mascota</label>
                    <label><input type="checkbox" name="perdida"/>Marcar Como Perdido</label>
               <button class="guardar">guardar</button>
            </div>
        </form>      
       `;
       let pictureFile;
       const cs = state.getState();
       if (!cs.lat && !cs.lng){
        Router.go("/ubicacion");
       }
        const myDropzone = new Dropzone(".profile-picture-button", {
            url: "/falsa",
            autoProcessQueue: false,
        });
        myDropzone.on("addedfile", function (file) {
            pictureFile = file;
            document.querySelector(".dz-error-mark").remove();
            document.querySelector(".dz-success-mark").remove();
            document.querySelector(".dz-error-message").remove();
            document.querySelector(".dz-progress").remove();
            document.querySelector(".dz-details").remove();
        });
        const formEl = document.querySelector(".nueva-mascota") as any;
        const LAT = cs.lat || "0";
        const LNG = cs.lng || "0";
        formEl.ubicacion.value = "lat: " + LAT + " , Lng: " + LNG ;
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            if (pictureFile) {
                const nombre = e.target["nombre"].value;
                const pictureURL = pictureFile.dataURL;
                const sobremi = e.target["sobremi"].value;
                const publicada = e.target["publicada"].checked;
                const perdida = e.target["perdida"].checked;
                const lat = cs.lat;
                const lng = cs.lng;
                state.mascotaNueva({ nombre,
                    sobremi,
                    publicada,
                    perdida,
                    pictureURL,lat,lng
                     }, (cb) => {
                    if (cb) Router.go("/mensaje");
                });
            } else {
                alert("ERROR: datos incompletos!!!");
            }
        });
        const ubicarBoton = formEl.querySelector(".small__button");
        ubicarBoton.addEventListener("click", (e) => {
            e.preventDefault();
            Router.go("/ubicacion");
        });
    }
}
customElements.define("mascota-nueva-web", MascotaNueva);

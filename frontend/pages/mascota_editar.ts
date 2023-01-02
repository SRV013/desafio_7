import { Router } from "@vaadin/router";
import { state } from "../state";
import "../lib/dropzone";
import { Dropzone } from "dropzone";
export class MascotaEditar extends HTMLElement {
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
        <form class="editar-mascota">        
         <div class="container">
         <h1 class="content__title">Editar Mascota</h1>
         <div class="content__container">
        <p class="content__container__desciption">Modificar los datos de tu mascota !!!</p>
        <div class="mascota">
        <div class="mascota__cargar">CAMBIAR FOTO</div>
        <div class="mascota__imagen profile-picture-button"></div>
        </div>
               <input type="text" name="nombre" placeholder="nombre">
               <textarea name="sobremi" placeholder="sobre mi"></textarea>
               <input type="text" name="ubicacion" placeholder="mi ubicación" READONLY>
               <button class="small__button">editar ubicación</button>
                    <label><input type="checkbox" name="publicado"/>Publicar Mi Mascota</label>
                    <label><input type="checkbox" name="perdido"/>Marcar Como Perdido</label>
               <button class="guardar">guardar</button>
               </div>
               </form>      
       `;
        const formEl = document.querySelector(".editar-mascota") as any;
        const cs = state.getState();
        const idMascota = cs.idMascota;
        let pictureFile;    
        // BUSCA DATOS
        state.mascotaBuscarId(idMascota, (cb) => {
            const imagen = document.querySelector(".mascota__imagen") as any;
            formEl.nombre.value = cb.nombre;
            formEl.sobremi.value = cb.sobremi;
            if (cs.lat && cs.lng) {
                formEl.ubicacion.value = "lat: " + cs.lat + " , Lng: " + cs.lng;
            } else {
                formEl.ubicacion.value = "lat: " + cb.lat + " , Lng: " + cb.lng;
                cs.lat = cb.lat;
                cs.lng = cb.lng;
            }
            formEl.publicado.checked = cb.publicada;
            formEl.perdido.checked = cb.perdida;
            imagen.style.backgroundImage = "URL('" + cb.pictureURL + "')";
            pictureFile = cb.pictureURL;
        });
            
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
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const enviar = document.querySelector('.guardar') as any;
            enviar.disabled = true
            if (pictureFile) {
                const nombre = e.target["nombre"].value;
                const pictureURL = pictureFile.dataURL;
                const lat = cs.lat;
                const lng = cs.lng;
                const sobremi = e.target["sobremi"].value;
                const publicada = e.target["publicado"].checked;
                const perdida = e.target["perdido"].checked;
                state.mascotaEditar(
                    {
                        idMascota,
                        nombre,
                        sobremi,
                        publicada,
                        perdida,
                        pictureURL,
                        lat,
                        lng,
                    },
                    (cb) => {
                        cs.lat = "";
                        cs.lng = "";
                        if (cb) Router.go("/mensaje");
                    }
                );
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
customElements.define("mascotas-editar-web", MascotaEditar);

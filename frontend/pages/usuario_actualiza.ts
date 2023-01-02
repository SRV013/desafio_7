import { Router } from "@vaadin/router";
import { state } from "../state";
export class Usuarios extends HTMLElement {
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
        <form id="form-login">
        <div class="container">
        <h1 class="content__title">Mis datos</h1>
        <div class="content__container">
           <p class="content__container__desciption">actualiza tu perfil !!!</p>
           <input type="text" name="email" placeholder="correo electrónico" readonly>
           <input type="text" name="nombre" placeholder="nombre" required>
           <input type="text" name="telefono" placeholder="telefono" required>
           <input type="password" placeholder="ingrese password" name="password">
           <input type="password" placeholder="repita password" name="passwordr">
           <button class="button">actualizar</button>
           <button class="cerrar">cerrar session</button>
        </div>
       </div></form>`;

        const divFrom = document.querySelector("#form-login") as any;
        const cerrar = document.querySelector(".cerrar") as any;
            state.usuarioDatos((cb) => {
                divFrom.email.value = cb.email;
                divFrom.nombre.value = cb.nombre;
                divFrom.telefono.value = cb.telefono;
            });
        divFrom.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = e.target["nombre"].value;
            const telefono = e.target["telefono"].value;
            const password = e.target["password"].value;
            const passwordr = e.target["passwordr"].value;
            if (!password) {
                state.usuarioActualizar({ nombre, telefono }, (cb) => {
                    if (cb)  Router.go("/mensaje");
                });
            } else {
                if (password == passwordr) {
                    state.usuarioActualizar(
                        { nombre, telefono, password },
                        (cb) => {
                            if (cb) Router.go("/mensaje");
                        }
                    );
                } else {
                    alert("Las contraseña no coinciden");
                }
            }
        });
        cerrar.addEventListener("click", (e) => {
            state.clearToken();
            location.href = "/inicio";
        });
    }
}
customElements.define("usuario-actualiza", Usuarios);

import { Router } from "@vaadin/router";
import { state } from "../state";
export class UsuariosNuevo extends HTMLElement {
    connectedCallback() {
      state.getToken((token) => {
        if (!token) {
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
        <h1 class="content__title">Registrarme</h1>
        <div class="content__container">
        <p class="content__container__desciption">Complete el formulario de registro!!!</p>
           <input type="text" name="email" placeholder="correo electrónico" required>
           <input type="text" name="nombre" placeholder="nombre" required>
           <input type="text" name="telefono" placeholder="teléfono" required>
           <input type="password" placeholder="ingrese password" name="password" required>
           <input type="password" placeholder="repita password" name="passwordr" required>
           <button  class="button">guardar</button>
           </form>
           </div>
        </div>`;
        const form = document.querySelector("#form-login");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = e.target["email"].value;
            const nombre = e.target["nombre"].value;
            const telefono = e.target["telefono"].value;
            const password = e.target["password"].value;
            const passwordr = e.target["passwordr"].value;
            if (password == passwordr) {
                state
                    .usuarioNuevo({
                        email,
                        nombre,
                        telefono,
                        password,
                    })
                    .then((e) => {
                        if (e) {
                            state.usuarioLogin(email, password, (resultado) => {
                                if (resultado.error) {
                                    alert(resultado.error);
                                } else {
                                    location.href = "/inicio";
                                }
                            });
                        }
                    });
            } else {
                alert("Las contraseña no coinciden");
            }
        });
    }
}
customElements.define("usuario-nuevo", UsuariosNuevo);

import { state } from "../state";
export class Login extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
    <form class="form-login">
     <div class="container">
        <h1 class="content__title">Login</h1>
        <div class="content__container">
           <p class="content__container__desciption">Ingrese su correo electronico !!!</p>
           <input type="email" name="email" placeholder="correo electronico" required>
           <input type="password" name="password" placeholder="contraseña" required>
           <button class="button">ingresar</button>
           <p class="content__container__desciption">¿No tenés cuenta aún? <a href="usuario_nuevo">Crear cuenta</a></p>
        </div>
       </div>
    </form>    
        `;
        const form = document.querySelector(".form-login");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const button = document.querySelector('.button') as any;
            button.disabled = true;
            const email = e.target["email"].value;
            const password = e.target["password"].value;
            state.usuarioLogin(email, password, (resultado) => {      
                if (resultado.error) {
                    alert(resultado.error);
                } else {
                    location.href = "/inicio";
                }
            });
        });
    }
}
customElements.define("login-pagina", Login);
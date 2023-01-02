import { Router } from "@vaadin/router";
import { state } from "../state";
class Header extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
      <div class="header-component__container">
        <a class="header-component__logo">
        <img src="https://res.cloudinary.com/dxgx1lluz/image/upload/v1670195085/logo/logob_rfelbj.png" ></a>
        <nav class="header-component-nav">
          <ul>
            <li><a class="login">Cuenta</a></li>
            <li><a class="mascotas">Mascotas</a></li>
            <li><a class="reportes">Reportes</a></li>
          </ul>
        </nav>
        <div class="menu">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      `;
        const menu = this.querySelector(".menu");
        const inicio = this.querySelector(".header-component__logo");
        const login = this.querySelector(".login");
        const mascotas = this.querySelector(".mascotas");
        const reportes = this.querySelector(".reportes");
        state.getToken((e) => {
            if (e) {
                login.classList.add("cuenta");
                login.innerHTML = "Cuenta";
            } else {
                login.classList.remove("cuenta");
                login.innerHTML = "Login";
            }
        });
        menu.addEventListener("click", () => {
            document
                .querySelector(".header-component-nav")
                .classList.toggle("active");
            menu.classList.toggle("active");
        });
        inicio.addEventListener("click", () => {
            Router.go("/inicio");
        });

        login.addEventListener("click", () => {
            if (login.className == "login") {
                Router.go("/login");
            } else {
                Router.go("/usuario_actualiza");
            }
        });
        mascotas.addEventListener("click", () => {
            Router.go("/mascotas");
          });
          reportes.addEventListener("click", () => {
            Router.go("/perdidas");
        });
    }
}
customElements.define("header-comp", Header);

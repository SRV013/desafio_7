import { Router } from "@vaadin/router";
import { state } from "../state";
import { initMap, initSearchForm } from "../lib/mapbox";
import * as mapboxgl from "mapbox-gl";
import "./ubicacion.css";
import { getOriginalNode } from "typescript";

class Ubicacion extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
        <form class="search-form">
                <div class="ubicacion-component__container">
                <div class="ubicacion-component__buscador">      
                        <input type="search" name="encontrar" placeholder="ej: La Rioja 1902, Mar del Plata">
                        <button class="buscar">buscar</button>
                        </div>      
                        <div class="ubicacion-component__resultado">
                        <div class='mapbox__map-container'></div>
                        <a class="coordenas">esperando coordenada ... </a> 
                        </div>
                        
      </div>
      </form>
      `;
        const cs = state.getState();
        const form = document.querySelector(".search-form") as any;
        const mapElement = this.querySelector(".mapbox__map-container");
        const agregar = this.querySelector(".coordenas");
        agregar.addEventListener("click", () => {
            history.go(-1);
        });
        form.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const ubicacion =
                evento.target["encontrar"].value || "Mar del Plata, Shopping";
            let e = initMap(mapElement);
            initSearchForm(ubicacion, (results) => {
                const firstResult = results[0];
                new mapboxgl.Marker()
                    .setLngLat(firstResult.geometry.coordinates)
                    .addTo(e);
                e.setCenter(firstResult.geometry.coordinates);
                e.setZoom(8);
                form.querySelector(".coordenas").innerHTML =
                    firstResult.geometry.coordinates;
                    cs.lat = firstResult.geometry.coordinates[0] ;
                    cs.lng = firstResult.geometry.coordinates[1] ;
            });
        });
    }
}
customElements.define("ubicacion-comp", Ubicacion);

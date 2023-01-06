import { Router } from "@vaadin/router";
const router = new Router(document.querySelector(`.root`));
router.setRoutes([
    { path: `/`, component: `inicio-web` },
    { path: `/inicio`, component: `inicio-web` },
    { path: `/login`, component: `login-pagina` },
    { path: `/usuario_nuevo`, component: `usuario-nuevo` },
    { path: `/usuario_actualiza`, component: `usuario-actualiza` },
    { path: `/mascotas`, component: `mascota-leer-web` },
    { path: `/mascota_nueva`, component: `mascota-nueva-web` },
    { path: `/mascota_editar`, component: `mascotas-editar-web` },
    { path: `/perdidas`, component: `perdidas-web` },
    { path: `/reporte_vista`, component: `reporte-mascota-web` },
    { path: `/mensaje`, component: `mensaje-web` },
    { path: `/ubicacion`, component: `ubicacion-comp` }, 
]);


import { index } from "./lib/algolia";
import {
    crearUsuario,
    loginUsuario,
    validarToken,
    updateUsuarioPass,
} from "./controllers/autoriza-controllers";
import { dataUsuario, updateUsuario ,dataUsuarioMail } from "./controllers/usuario-controllers";
import {
    crearMascota,
    leerMascota,
    leerMascotaId,
    editarMascota,
    leerMascotaPerdidas,
} from "./controllers/mascota-controllers";
import { nuevoReporte } from "./controllers/reporte-controllers";
import { borrarTabla } from "./db/conexion";
import * as cors from "cors";
import * as express from "express";
const app = express();
app.use(cors());
app.use(express.json({ limit: "75mb" }));
app.use(express.json());
const port = process.env.PORT || 8080;

// NUEVO USUARIO
app.post("/usuario", async (req, res) => {
    const { email, nombre, telefono, password } = req.body;
    if (email && nombre && password) {
        const respuesta = await crearUsuario(email, nombre, telefono, password);
        res.json(respuesta);
    } else {
        res.json({ error: "formulario incompleto!!!" });
    }
});

// LOGIN
app.post("/usuario/login", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const respuesta = await loginUsuario(email, password);
        if (respuesta) {
            res.json(respuesta);
        } else {
            res.json({ error: "email o password incorrecto!!!" });
        }
    } else {
        res.json({ error: "formulario incompleto!!!" });
    }
});

// BUSCAR POR ID USUARIO
app.get("/usuario/:id", nuevainstacia, async (req, res) => {
    const id = req.params.id;
    const usuario = await dataUsuario(id);
    res.json(usuario);
});

async function nuevainstacia(req, res, next) {
    if (req.headers.authorization) {
        const token = await validarToken(req.headers.authorization);
        if (token) {
            req._user = token;
            next();
        } else {
            res.status(401).json({
                error: "No se autorizo el token",
            });
        }
    } else {
        res.status(401).json({
            error: "no existe un token ",
        });
    }
}
// MODIFICAR DATOS USUARIO SIN PASS
app.patch("/usuario/:id", nuevainstacia, async (req, res) => {
    const id = req.params.id;
    const { nombre, telefono, password } = req.body;
    if (password) {
        await updateUsuarioPass(id, password);
    }
    if (nombre || telefono) {
        await updateUsuario(id, nombre, telefono);
    }
    res.json("actualizado!!!");
});
// NUEVA MASCOTA
app.post("/mascota", nuevainstacia, async (req, res) => {
    const {
        idUsuario,
        nombre,
        sobremi,
        publicado,
        perdido,
        pictureURL,
        lat,
        lng,
    } = req.body;
    if (idUsuario && nombre && pictureURL && sobremi) {
        const mascotas = await crearMascota(
            idUsuario,
            nombre,
            sobremi,
            publicado,
            perdido,
            pictureURL,
            lat,
            lng
        );
        res.json(mascotas);
    }
});
// EDITAR MASCOTA
app.patch("/mascota/:id", nuevainstacia, async (req, res) => {
    const id = req.params;
    if (id) {
        const mascotas = await editarMascota(id, req.body);
        if (mascotas) {
            res.json(mascotas);
        } else {
            res.json("no se encontro ninguna mascota");
        }
    } else {
        res.json("faltan datos!!!");
    }
});
//  LISTA DE MASCOTA
app.get("/mascota/:id", nuevainstacia, async (req, res) => {
    const idUsuario = req.params.id;
    if (idUsuario) {
        const mascotas = await leerMascota(idUsuario);
        if (mascotas) {
            res.json(mascotas);
        } else {
            res.json("no se encontro ninguna mascota");
        }
    }
});
//  LISTA DE MASCOTA EXEPTUANDO LA TUYA
app.post("/mascota_perdidas/:aroundRadius/:lat/:lng",
    async (req, res) => {
        const distancia = req.params.aroundRadius;
        const lat = req.params.lat;
        const lng = req.params.lng;
        if (distancia) {
            const mascotas = await leerMascotaPerdidas(lat, lng, distancia);
            res.json(mascotas);
        }
    }
);
// MASCOTA BUSCAR
app.get("/mascota_buscar/:id", nuevainstacia, async (req, res) => {
    const idMascota = req.params.id;
    if (idMascota) {
        const mascotas = await leerMascotaId(idMascota);
        if (mascotas) {
            res.json(mascotas);
        } else {
            res.json("no se encontro ninguna mascota");
        }
    }
});

// REPORTAR MASCOTA
app.post("/reportar_mascota/:id", async (req, res) => {
    const idMascota = req.params.id;
    const { nombre, telefono, comentario , email} = req.body;
    if (idMascota && nombre && telefono && comentario && email) {
        const reporte = await nuevoReporte(
            idMascota,
            nombre,
            telefono,
            comentario,
            email,
        );
        res.json(reporte);
    } else {
        res.json("faltan datos!!!");
    }
});
app.get("/email/:id", async(req,res)=>{
    const idUsuario = req.params.id;
    const emil = await dataUsuarioMail(idUsuario) ;
    res.json(emil);
})

// BORRAR Y SINCRONIZAR DB
app.get("/borrar", async (req, res) => {
    const borrar = await borrarTabla();
    res.json(borrar);
});

const relativeRoute = path.resolve(__dirname, "../dist");
app.use(express.static(relativeRoute));
app.get("*", function(req, res){
    res.sendFile(relativeRoute + "/index.html");
})

app.listen(port, () => {
    console.log("todo OK en el puerto:", port);
});

import "dotenv/config";
const API_BASE_URL = process.env.API_HOST;
const state = {
    data: {},
    getState() {
      //  console.log("MI ESTADO ", this.data);
        return this.data;
    },
    getToken(cb) {
        cb(localStorage.getItem("Token"));
    },
    clearToken() {
        localStorage.removeItem("Token");
    },
    async usuarioNuevo(dataUs) {
        await fetch(API_BASE_URL + "/usuario", {
            method: "POST",
            body: JSON.stringify(dataUs),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return true;
    },
    // BUSCAR USUARIOS
    usuarioLogin(email: string, password: string, cb) {
        fetch(API_BASE_URL + "/usuario/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((datos) => {
                const token = datos[0];
                const idUsuario = datos[1];
                localStorage.setItem("Token", token);
                localStorage.setItem("Id", idUsuario);
                cb(datos);
            });
    },

    // DATOS USUARIOS
    usuarioDatos(cb) {
        const idUsuario = localStorage.getItem("Id");
        const token = "bearer " + localStorage.getItem("Token");
        fetch(API_BASE_URL + "/usuario/" + idUsuario, {
            method: "GET",
            headers: {
                Authorization: token,
                accept: "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((datos) => {
                cb(datos);
            });
    },
    // DATOS USUARIOS
    usuarioActualizar(datos: any, cb) {
        const idUsuario = localStorage.getItem("Id");
        const token = "bearer " + localStorage.getItem("Token");
        fetch(API_BASE_URL + "/usuario/" + idUsuario, {
            method: "PATCH",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then((res) => {
                return res.json();
            })
            .then((datos) => {
                cb(datos);
            });
    },
    // NUEVA MASCOTA
    mascotaNueva(datos: any, cb) {
        const idUsuario = localStorage.getItem("Id");
        const token = "bearer " + localStorage.getItem("Token");
        fetch(API_BASE_URL + "/mascota", {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...datos,
                token,
                idUsuario,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((datos) => {
                cb(datos);
            });
    },
    // EDITAR MASCOTA
    async mascotaEditar(datos: any, cb) {
        const idUsuario = localStorage.getItem("Id");
        const token = "bearer " + localStorage.getItem("Token");
        await fetch(API_BASE_URL + "/mascota/" + datos.idMascota, {
            method: "PATCH",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...datos,
                idUsuario,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((datos) => {
                cb(datos);
            });
    },
    // LEER UNA MASCOTA
    async mascotaBuscarId(idMascota, cb) {
        const token = "bearer " + localStorage.getItem("Token");
        if (idMascota) {
            await fetch(API_BASE_URL + "/mascota_buscar/" + idMascota, {
                method: "GET",
                headers: {
                    Authorization: token,
                    accept: "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((datos) => {
                    cb(datos);
                });
        } else {
            console.log("Error al enviar mascota");
        }
    },
    // LEER TODAS LAS MASCOTAS
    mascotaLista(cb) {
        const idUsuario = localStorage.getItem("Id");
        const token = "bearer " + localStorage.getItem("Token");
        if (idUsuario) {
            fetch(API_BASE_URL + "/mascota/" + idUsuario, {
                method: "GET",
                headers: {
                    Authorization: token,
                    accept: "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((datos) => {
                    cb(datos);
                });
        } else {
            console.log("Error entrada de datos");
        }
    },
    // LEER TODAS LAS MASCOTAS MENOS LA NUESTRA
    async mascotaPerdidas(aroundRadius, cb) {
        const lat = localStorage.getItem("lat");
        const lng = localStorage.getItem("lng");
        if (lat && lng) {
            await fetch(
                API_BASE_URL +
                    "/mascota_perdidas/" +
                    aroundRadius +
                    "/" +
                    lat +
                    "/" +
                    lng,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((res) => {
                    return res.json();
                })
                .then((datos) => {
                    cb(datos);
                });
        }
    },
    reportarMascota(idMascota, nombre, telefono, comentario, email, cb) {
        fetch(API_BASE_URL + "/reportar_mascota/" + idMascota, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                telefono,
                comentario,
                email,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((datos) => {
                cb(datos);
            });
    },
    // OBTENER MAIL
    email(idUsuario, cb) {
        fetch(API_BASE_URL + "/email/" + idUsuario, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((datos) => {
                cb(datos);
            });
    },
};
export { state };

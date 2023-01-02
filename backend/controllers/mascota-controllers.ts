import { Mascota } from "../db/mascotas";
import { index } from "../lib/algolia";
import { cloudinary } from "../lib/cloudinary";

// NUEVA MASCOTA
export async function crearMascota(
    idUsuario,
    nombre,
    sobremi,
    publicada,
    perdida,
    pictureURL,
    lat,
    lng
) {
    // CARGA IMAGEN
    if (pictureURL) {
        const image = await cloudinary.uploader.upload(pictureURL, {
            resource_type: "image",
            discard_original_filename: true,
            width: 500,
            folder: "mascotas",
        });
        // CARGA MASCOTA
        const mascota = await Mascota.create({
            idUsuario,
            nombre,
            sobremi,
            publicada,
            perdida,
            pictureURL: image.secure_url,
            lat,
            lng,
        });
        // CARGA LOCALIZACION
        const algoliaRes = await index.saveObject({
            objectID: mascota.get("id"),
            nombre: mascota.get("nombre"),
            _geoloc: {
                lat: mascota.get("lat"),
                lng: mascota.get("lng"),
            },
        });
        return [mascota, algoliaRes];
    }
}
// EDITAR MASCOTA POR ID
export async function editarMascota(id, data) {
    if (data.pictureURL) {
        const img = await cloudinary.uploader.upload(data.pictureURL, {
            resource_type: "image",
            discard_original_filename: true,
            width: 500,
            folder: "mascotas",
        });
        data.pictureURL = img.secure_url;
    }
    // EDITA MASCOTA
    const mascota = await Mascota.update(data, {
        where: id,
    });
    // EDITAR LOCALIZACION
    const algoliaRes = await index.partialUpdateObject({
        objectID: id.id,
        nombre: data.nombre,
        _geoloc: {
            lat: data.lat,
            lng: data.lng,
        },
    });
    return { mascota, algoliaRes };
}
// LEER MASCOTAS
export async function leerMascota(idUsuario) {
    const mascota = await Mascota.findAll({ where: { idUsuario } });
    return mascota;
}
// LEER MASCOTAS POR DISTANCIAS
export async function leerMascotaPerdidas(lat, lng, distancia: number) {
    const todos = [];
    const { hits } = await index.search("", {
        aroundLatLng: [lat, lng].join(","),
        aroundRadius: distancia,
    });
    if (hits) {
        for (const e of hits) {
            const id = e.objectID;
            const mascota = await Mascota.findOne({
                where: { id },
            });
            todos.push(mascota);
        }
    }
    return todos;
}
// LEER MASCOTAS ID
export async function leerMascotaId(id) {
    const mascota = await Mascota.findByPk(id);
    return mascota;
}

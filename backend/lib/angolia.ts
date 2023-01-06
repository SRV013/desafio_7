import algoliasearch from "algoliasearch";
import "dotenv/config";
const mascota = algoliasearch(
    process.env.ALGOLIA_CLIENT,
    process.env.ALGOLIA_PASS,
);
export const index = mascota.initIndex("mascotas");
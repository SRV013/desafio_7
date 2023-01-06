import "dotenv/config";
import * as MapboxClient from 'mapbox';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const MAPBOX_TOKEN = process.env.TOKEN_MAPBOX;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
export function initMap(mapElement) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    return new mapboxgl.Map({
        container: mapElement,
		style: 'mapbox://styles/mapbox/streets-v12',
      });
  }
export function initSearchForm(mapboxInput,callback) {
	 mapboxClient.geocodeForward(
		mapboxInput,
		{
			country: 'ar',
			autocomplete: true,
			language: 'es',
		},
		function (err, data, res) {
			if (!err) callback(data.features);
		},
	); }
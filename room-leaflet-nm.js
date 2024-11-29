/*! RoomLeaflet-nm v1.0.0 | (c) GreenerSoft | https://roomjs.fr | MIT License */


var RoomLeaflet = (() => {
	"use strict";

	const {elements} = Room;


	const EUCenter = () => [49.84305556, 9.901944444]; // https://www.ign.fr/reperes/apres-le-brexit-quel-est-desormais-le-centre-geographique-de-lue
	const FranceCenter = () => [46.4938889, 2.6027777]; // https://fr.wikipedia.org/wiki/Nassigny
	const USACenter = () => [37.090240, -95.712891]; // Au doigt mouillé !

	const OpenStreetMapProvider = () => ({
		wms: false,
		url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
		options: {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}
	});

	let L = window.L || window.Leaflet;

	function createTileLayer(provider) {
		return L && provider && (provider.wms ? L.tileLayer.wms : L.tileLayer)(provider.url, provider.options);
	}

	function addTileLayer(map, provider) {
		return L && map && provider && createTileLayer(provider).addTo(map);
	}

	async function MapContainer({id, className, provider, mount, unmount}) {
		const {div, p} = elements();

		let map = null;
		let resizer = null;

		const getMapOptions = params => {
			const options = {};
			Object.entries(params).forEach(([k, v]) => !["id", "className", "provider", "mount", "unmount"].includes(k) && (options[k] = v));
			return options;
		};

		const onMount = ({target}) => {
			// Création de la carte avec Leaflet
			map = L.map(target, getMapOptions({...arguments[0]}));
			// Ajout du layer des tuiles
			addTileLayer(map, provider);
			// Création d'un observeur en cas de redimensionnement de l'élément
			if ("ResizeObserver" in window) {
				resizer = new ResizeObserver(() => map.invalidateSize());
				resizer.observe(target);
			}
			// Traitement du montage
			typeof mount == "function" && mount(map);
		};

		const onUnmount = () => {
			// Traitement du démontage
			typeof unmount == "function" && unmount(map);
			// Suppression des références
			resizer && resizer.disconnect();
			map && map.remove();
			resizer = null;
			map = null;
		};

		return L ? div({id, class: className, onMount, onUnmount}) : p("Librairie Leaflet non chargée.");
	}
	
	return {EUCenter, FranceCenter, USACenter, OpenStreetMapProvider, L, createTileLayer, addTileLayer, MapContainer};

})();

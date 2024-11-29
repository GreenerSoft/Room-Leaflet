# Room-Leaflet
**Room-Leaflet** est un composant basé sur **Room** permettant d’afficher des cartes interactives en utilisant la librairie JavaScript open source **[Leaflet](https://leafletjs.com)**.

**Room-Leaflet** est disponible sous la forme d’un module **ECMAScript 6** (une version non **ECMAScript** est également disponible) qui comme **Room**, ne nécessite pas de système de construction (build tools). **Room-Leaflet** est donc utilisable directement dans un navigateur Web.

## Installation
**Room-Leaflet** est disponible sur :

* **NPM** : **[https://www.npmjs.com/package/room-leaflet](https://www.npmjs.com/package/room-leaflet)**
* **jsDelivr** : **[https://www.jsdelivr.com/package/npm/room-leaflet](https://www.jsdelivr.com/package/npm/room-leaflet)**

Vous pouvez aussi auto-héberger **Room-Leaflet** en utilisant le fichier `room-leaflet.min.js` ou le fichier `room-leaflet-nm.min.js`.

## Utilisation
Pour utiliser **Room-Leaflet** il faut importer la librairie **Leaflet**.

> Pour rappel, la librairie **Leaflet** utilise un fichier **CSS** qui doit impérativement être chargé avant la librairie et il est indispensable de donner une dimension par **CSS** à l’élément `<div>` qui contient la carte (classe `leaflet-container` par défaut mais qui peut être changée via la propriété `className` du composant).

### Version ESM
En version **ESM**, vous pouvez utiliser un élément `<script>` avec un attribut `type` à la valeur `module`, mais vous avez en plus la possibilité de laisser **Room-Leaflet** importer dynamiquement la librairie **Leaflet** en tant que module **ECMAScript** à la condition d’ajouter dans votre carte d’importation une entrée nommée **Leaflet** (en plus des entrées **Room** et **RomLeaflet**).

> Pour que cette possibilité fonction vous devez passez par un **CDN** capable de convertir **Leaflet** en module **ECMAScript 6**, c'est très simple comme indiqué dans cette article de **[GreenerSoft](https://greenersoft.fr/articles/utiliser-une-librairie-javascript-en-tant-que-module-ecmascript)**.

Une **[carte d'importation](https://developer.mozilla.org/fr/docs/Web/HTML/Element/script/type/importmap)** est obligatoire en version **ESM** à minima pour indiquer où est le module **Room**.

Vous trouverez un exemple de carte d’importation dans le fichier `index.html` de notre dépôt **[Room-Test](https://github.com/GreenerSoft/Room-Test)**. Il contient par ailleurs plusieurs exemples d'utilisation de **Room-Leaflet**.

### Version non ESM
En version non **ESM**, vous devez avoir un élément `<script>` dans votre page **HTML** avant ceux pour **Room** et **Room-Leaflet**.

Vous avez alors un objet `RoomLeafet` attaché à l'objet principal `window` qui permet d'appeler les fonctions (`RoomLeaflet.MapContainer()` par exemple).

Une autre solution plus simple consiste à utiliser l'**[affection par décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)** :

```javascript
const {FranceCenter, OpenStreetMapProvider, L, addTileLayer, MapContainer} = RoomLeaflet;
```

Vous pouvez alors par exemple appeler directement la fonction `MapContainer()` sans préfixer avec `RoomLeaflet.`.


## Fournisseur de fonds de carte
Un fournisseur de fonds de carte est décrit par un objet `provider` qui est constitué de **3** propriétés :

1. `wms` : Un booléen qui indique si le layer est de type **WMS** ou pas.
2. `url` : Une chaîne de caractères contenant l’URL donnant les tuiles.
3. `options`: Un objet avec les propriétés décrites comme options de la méthode [tileLayer.wms()](https://leafletjs.com/reference.html#tilelayer-wms-option) si la propriété `wms` est à `true` et les options de la méthode [tileLayer()](https://leafletjs.com/reference.html#tilelayer-option) de **Leaflet** si la propriété `wms` est à `false`.

L'objet `provider` est utilisable avec les fonctions `createTileLayer()`, `addTileLayer()` et `MapContainer()` de **Room-Leaflet**.

La fonction `OpenStreetMapProvider()` de **Room-Leaflet** retourne un objet de cette forme.

## Variable L
Classiquement avec **Leaflet**, la variable `L` contient l’objet qui permet d'appeler les méthodes de **Leaflet** (elle est attachée à l'objet principal `window`).

Cette variable est exportée par le module **Room-Leaflet** et il faut l’utiliser en version **ESM** surtout si vous laissez importer dynamiquement **Leaflet** par **Room-Leaflet** comme indiqué plus haut.

En version non **ESM**, la variable `L` est également disponible (c’est juste un alias de la variable `L` de `window`).


## Fonctions
**Room-Leaflet** est minimaliste en exportant uniquement **7** fonctions.

### Fonction EUCenter()
Cette fonction retrourne les coordonnées du centre de l’Europe sous la forme d’un tableau contenant la latitude et la longitude.

### Fonction FranceCenter()
Cette fonction retourne les coordonnées du centre de la France.

### Fonction USACenter()
Cette fonction retourne les coordonnées du centre des USA.

### Fonction OpenStreetMapProvider()
Cette fonction retourne un objet décrivant un fournisseur de fonds de carte et en l'occurence **[OpenStreetMap](https://www.openstreetmap.org)**.

Elle est utilisable avec les fonctions `createTileLayer()`, `addTileLayer()` et `MapContainer()` de **Room-Leaflet**.

### Fonction createTileLayer()
Cette fonction retourne un objet [TileLayer](https://leafletjs.com/reference.html#tilelayer) de **Leaflet**.

La signature de la fonction est :

```javascript
createTileLayer(provider)
```

Le paramètre `provider` est un objet décrivant un fournisseur de fonds de carte dont la structure est décrite plus haut.

Si la propriété `wms` de l’objet `provider` est à `true`, la fonction utilise la méthode [tileLayer.wms()](https://leafletjs.com/reference.html#tilelayer-wms) de **Leaflet**.

Si la propriété est à `false`, la fonction utilise la méthode [tileLayer()](https://leafletjs.com/reference.html#tilelayer) de **Leaflet**.

### Fonction addTileLayer()
Cette fonction créé et ajoute un objet [TileLayer](https://leafletjs.com/reference.html#tilelayer) de **Leaflet** à une carte à partir d’un fournisseur de fonds de carte. Elle retourne l’objet créé.

La signature de la fonction est :

```javascript
addTileLayer(map, provider)
```

Le paramètre `map` est un objet [Map](https://leafletjs.com/reference.html#map) de **Leaflet** qui représente la carte dans laquelle le layer doit être ajouté.

Le paramètre `provider` est un objet décrivant un fournisseur de fonds de carte dont la structure est décrite plus haut.

### Fonction MapContainer()
Cette fonction retourne le composant **Room-Leaflet** qui est un élément `<div>` contenant une carte gérée par **Leaflet**.

La signature de la fonction est :

```javascript
MapContainer({id, className, provider, mount, unmount})
```

L’unique paramètre attendu est un objet pouvant contenir des propriétés toutes optionnelles :

* `id` : Une chaîne de caractères contenant l'identifiant **CSS** à utiliser pour l’élément `<div>`.
* `className` : Une chaîne de caractères contenant la ou les classes **CSS** à utiliser pour l’élément `<div>`.
* `provider` : Un objet décrivant le fournisseur de fonds de carte dont la structure est décrite plus haut.
* `mount` : Une fonction appelée au montage de l’élément `<div>` dans le DOM.
* `unmount` : Une fonction appelée à la suppression de l’élément `<div>` du DOM.

Les fonctions `mount()` et `unmount()` reçoivent un unique paramètre `map` qui est est un objet [Map](https://leafletjs.com/reference.html#map) de **Leaflet** qui représente la carte associée à l’élément <`div>`.

La fonction `mount()` permet par exemple d’ajouter d’autres éléments dans la carte comme des layers, des marqueurs, des popups, etc. C’est aussi là qu'il est possible de créer des effets avec la fonctions `createEffect()` de **Room** ou de démarrer des timers.

La fonction `unmount()` permet par exemple d’arrêter des timers démarrés dans la fonction `mount()`.
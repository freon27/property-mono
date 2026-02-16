import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PropertiesStore } from './pages/properties/properties.store';
import { PropertiesService } from './pages/properties/properties.service';
import L from 'leaflet';
import { Button, Input, Select } from '@property-mono/nklt';

const iconRetinaUrl = 'leaflet/marker-icon-2x.png';
const iconUrl = 'leaflet/marker-icon.png';
const shadowUrl = 'leaflet/marker-shadow.png';

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

@Component({
  providers: [PropertiesStore, PropertiesService],
  imports: [Select, Input, Button],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  store = inject(PropertiesStore);

  protected title = 'property-mono';

  map = signal<L.Map | null>(null);

  propertiesWithImages = computed(() =>
    this.store.properties().map((property) => ({
      ...property,
      imageUrl: `https://picsum.photos/300/200?random=${property.id}`,
    })),
  );

  ngAfterViewInit() {
    // Initialize the map
    const map = L.map('map').setView([37.7749, -122.4194], 13); // Centered on San Francisco

    this.map.set(map);

    // Add OpenStreetMap tiles
    // L.tileLayer(
    // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // attribution: '&copy; OpenStreetMap contributors',
    // 'https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/web_raster/{z}/{y}/{x}.png',
    // {
    //   maxZoom: 18,
    //   attribution: '© GeoBasis-DE / BKG',
    // },
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
      },
    ).addTo(map);
  }

  constructor() {
    effect(() => {
      const featureGroup = L.featureGroup();

      const map = this.map();
      const properties = this.store.properties();

      console.log('map', map);

      if (!map || properties.length === 0) {
        return;
      }

      // Add markers for properties
      for (const property of properties) {
        if (property.location) {
          L.marker([property.location.y, property.location.x]) // Note: Leaflet uses [lat, lng]
            .addTo(featureGroup)
            .bindPopup(
              `<b>${property.name}</b><br>Residential Units: ${property.residentialUnitCount}<br>Commercial Units: ${property.commercialUnitCount}`,
            );
        }
      }

      featureGroup.addTo(map);
      map.fitBounds(featureGroup.getBounds(), { padding: [100, 100] });
    });
  }
}

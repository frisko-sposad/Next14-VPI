import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import myIcon from '../../components/leflet/icons/castle.svg';
import { Icon } from 'leaflet';

const markerIcon = new Icon({
  iconUrl: myIcon,
  iconSize: [38, 38], // set the size of the icon
});

const Map = () => {
  const polygon = [
    [36.28, -71.1894],
    [30.28, -72.1894],
    [38.28, -73.1894],
    [31.28, -74.1894],
    [40.28, -75.1894],
    [41.28, -77.1894],
    [42.28, -73.1894],
  ];

  return (
    <MapContainer
      className="w-1/2"
      center={[78, -45]}
      zoom={4}
      scrollWheelZoom={true}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}"
      /> */}
      {/* <TileLayer
        attribution="Stamen Watercolor"
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
      /> */}
      <TileLayer
        noWrap={true}
        maxZoom={5}
        minZoom={3}
        attribution="Stamen Watercolor"
        url="https://map-dorn.netlify.app//map/{z}-{x}-{y}.jpg"
      />
      <Polygon pathOptions={{ color: 'purple' }} positions={[polygon]}>
        <Popup>
          <p>
            При клике на феод, открывается такое окошко:
            <br />
            Феод: Равнина около деревни Нижние бабули
            <br />
            Население: ~1000
            <br />
            Ресурсы: 2 свиньи и сосед боров{' '}
          </p>
        </Popup>
      </Polygon>

      <Marker position={[33.28, -79.1894]} icon={markerIcon}>
        <Popup>
          Пиздец работает!!! <br /> Это земли Лорда Жупела!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

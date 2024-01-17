import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import myIcon from '../../components/leflet/icons/castle.svg';
import { Icon } from 'leaflet';

const markerIcon = new Icon({
  iconUrl: myIcon,
  iconSize: [38, 38], // set the size of the icon
});

const Map = () => {
  return (
    <MapContainer
      className="w-1/2"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.515, -0.09]} icon={markerIcon}>
        <Popup>
          Пиздец работает!!! <br /> Это земли Лорда Жупела!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

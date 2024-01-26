import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  LayerGroup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import IconCastle from '../../components/leflet/icons/castle.svg';
import IconMine from '../../components/leflet/icons/kirka.svg';
import { Icon } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';
import { polygonsData } from '../../public/database/data-polygons';
import { LocationFinderDummy } from './LocationFinderDummy';
import { castleData } from '@/public/database/data-icon';

const markerIconCastle = new Icon({
  iconUrl: IconCastle,
  iconSize: [38, 38], // set the size of the icon
});
const markerIcongMine = new Icon({
  iconUrl: IconMine,
  iconSize: [38, 38], // set the size of the icon
});

const markerIconcastleData = castleData.map((el) => {
  return (
    <>
      <Marker key={el.id} position={[el.lat, el.lng]} icon={markerIconCastle}>
        <Popup>
          {
            <p>
              id: {el.id}
              <br />
              <br />
              {el.info.name}
              <br />
              <br />
              Владелец: {el.info.owner}
              <br />
              <br />
              Положение: {el.info.position}
              <br />
              <br />
              Описание: {el.info.text}
              <br />
              <br />
              Укрепления: {el.info.fortifications}
            </p>
          }
        </Popup>
      </Marker>
    </>
  );
});

const polygonsBorder = polygonsData.map((el) => {
  return (
    <Polygon
      key={el.id}
      pathOptions={{ color: el.color }}
      positions={el.latlngs}
    >
      <Popup>
        <p>
          <p>
            id: {el.id}
            <br />
            <b>{el.info.name}</b>
            <br />
            Владелец: {el.info.owner}
            <br />
            Сюзерен: {el.info.overlord}
            <br />
            Описание: {el.info.text}
          </p>
        </p>
      </Popup>
    </Polygon>
  );
});

const polygonsBorderReligion = polygonsData.map((el) => {
  let color = `black`;

  switch (el.info.religion) {
    case 'Андаллы':
      color = `#CC0033`;
      break;
    case 'Первые Люди':
      color = `#FFFFCC`;
      break;
    case 'Сомневающиеся':
      color = `#0099FF`;
      break;

    default:
      color = `#000000`;
      break;
  }
  return (
    <Polygon key={el.id} pathOptions={{ color: color }} positions={el.latlngs}>
      <Popup>
        <p>
          <p>
            id: {el.id}
            <br />
            <b>{el.info.name}</b>
            <br />
            Владелец: {el.info.owner}
            <br />
            <b>Религия: {el.info.religion}</b>
          </p>
        </p>
      </Popup>
    </Polygon>
  );
});

const Map = () => {
  const [mapLayers, setMapLayers] = useState([] as any);

  const _onCreate = (e: any) => {
    const { layerType, layer } = e;
    if (layerType == 'polygon') {
      const { _leaflet_id } = layer;
      setMapLayers((layers: any) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e: any) => {
    const layers: ({
      _leaflet_id,
      editing,
    }: {
      _leaflet_id: any;
      editing: any;
    }) => void = e.layers._layers;

    Object.values(layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers: any) =>
        layers.map((l: any) =>
          l.id == _leaflet_id ? { ...l, latlngs: { ...editing.latlngs[0] } } : l
        )
      );
    });
  };

  const _onDeleted = (e: any) => {
    const layers: ({ _leaflet_id }: { _leaflet_id: any }) => void =
      e.layers._layers;
    Object.values(layers).map(({ _leaflet_id }) => {
      setMapLayers((layers: any[]) =>
        layers.filter((l: { id: any }) => l.id != _leaflet_id)
      );
    });
  };

  return (
    <>
      <MapContainer
        className="w-1/2"
        center={[78, -45]}
        zoom={4}
        scrollWheelZoom={true}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>
        <TileLayer
          noWrap={true}
          maxZoom={5}
          minZoom={3}
          attribution="Stamen Watercolor"
          url="https://map-dorn.netlify.app//map/{z}-{x}-{y}.jpg"
        />
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Границы Феодов" checked>
            <LayerGroup>{polygonsBorder}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Религия">
            <LayerGroup>{polygonsBorderReligion}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Метки" checked>
            <LayerGroup>
              {markerIconcastleData}

              <Marker position={[51.51, -0.06]} icon={markerIconCastle}>
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела!
                </Popup>
              </Marker>
              <Marker
                position={[82.72064678437275, -134.82421875000003]}
                icon={markerIcongMine}
              >
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела!
                </Popup>
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <LocationFinderDummy />
      </MapContainer>
      <div>
        <pre className="text-left">
          {JSON.stringify(mapLayers) != '[]'
            ? JSON.stringify(mapLayers, null, 2)
            : ''}
        </pre>
      </div>
    </>
  );
};

export default Map;

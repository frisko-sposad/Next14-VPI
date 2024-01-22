import {
  Circle,
  FeatureGroup,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import myIcon from '../../components/leflet/icons/castle.svg';
import { Icon } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';
import { polygonsData } from '../../public/database/polygons-data';

const markerIcon = new Icon({
  iconUrl: myIcon,
  iconSize: [38, 38], // set the size of the icon
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
          {el.id}
          <br />
          {el.info.text}
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
          l.id == _leaflet_id
            ? {
                ...l,
                latlngs: { ...editing.latlngs[0] },
              }
            : l
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
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
        <TileLayer
          noWrap={true}
          maxZoom={5}
          minZoom={3}
          attribution="Stamen Watercolor"
          url="https://map-dorn.netlify.app//map/{z}-{x}-{y}.jpg"
        />

        {polygonsBorder}

        <Marker position={[33.28, -79.1894]} icon={markerIcon}>
          <Popup>
            Пиздец работает!!! <br /> Это земли Лорда Жупела!
          </Popup>
        </Marker>
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

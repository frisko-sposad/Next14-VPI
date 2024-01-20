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
import { Icon, LatLngExpression, latLng } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';

const markerIcon = new Icon({
  iconUrl: myIcon,
  iconSize: [38, 38], // set the size of the icon
});

const Map = () => {
  const [mapLayers, setMapLayers] = useState([] as any);

  const data: {
    id: number;
    info: {
      text: string;
    };
    color: string;
    latlng: [number, number][];
  }[] = [
    {
      id: 1690,
      info: { text: 'Название феода0' },
      color: '#009900',
      latlng: [
        [78.49209839375476, -34.36523437500001],
        [75.54372165419895, -35.15625000000001],
        [78.75211161963446, -26.542968750000004],
      ],
    },
    {
      id: 2214,
      info: { text: 'Название феода1' },
      color: '#000099',
      latlng: [
        [82.5182122826733, -142.99804687500003],
        [82.42611739505487, -137.28515625000003],
        [81.99754785446208, -134.60449218750003],
        [81.54489452121464, -134.29687500000003],
        [81.07365382553644, -137.10937500000003],
        [81.18880586425797, -141.32812500000003],
        [81.79314963748833, -145.06347656250003],
      ],
    },
    {
      id: 2235,
      info: { text: 'Название феода2' },
      color: '#CC6600',
      latlng: [
        [80.26938367221544, -132.89062500000003],
        [79.99838055483649, -137.02148437500003],
        [79.92178487701665, -139.92187500000003],
        [80.16486853960359, -142.55859375000003],
        [80.54033636522962, -141.15234375000003],
        [81.21568557413859, -141.45996093750003],
        [81.0804686079811, -137.06542968750003],
      ],
    },
    {
      id: 2259,
      info: { text: 'Название феода3' },
      color: '#660000',
      latlng: [
        [80.27680681067592, -132.71484375000003],
        [80.69788530712901, -128.32031250000003],
        [81.60925163475602, -127.88085937500001],
        [81.96690664378946, -130.91308593750003],
        [81.9791770899989, -134.78027343750003],
        [81.58356735743727, -134.25292968750003],
        [81.07365382553644, -137.15332031250003],
      ],
    },
  ];

  // const polygon:
  //   | LatLngExpression[]
  //   | LatLngExpression[][]
  //   | LatLngExpression[][][] = [
  //   [
  //     [83, -71],
  //     [30.28, -72.1894],
  //     [38.28, -73.1894],
  //     [31.28, -74.1894],
  //     [40.28, -75.1894],
  //     [41.28, -77.1894],
  //     [42.28, -73.1894],
  //   ],
  //   [[1, 2]],
  // ];

  const polygons_coordinates:
    | LatLngExpression[]
    | LatLngExpression[][]
    | LatLngExpression[][][]
    | LatLngExpression[][][][] = data.map((el: any) => {
    return el.latlng;
  });
  console.log(polygons_coordinates);

  const polygonsData = data.map((el) => {
    return (
      <Polygon
        key={el.id}
        pathOptions={{ color: el.color }}
        positions={el.latlng}
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

  const _onCreate = (e: any) => {
    console.log({ e });
    console.log(e.layer.editing.latlngs[0][0]);
    const contour1 = e.layer.editing.latlngs[0][0];
    const contour = contour1.map((x: { lat: any; lng: any }) => [x.lat, x.lng]);

    const { layerType, layer } = e;
    if (layerType == 'polygon') {
      const { _leaflet_id } = layer;

      setMapLayers((layers: any) => [
        ...layers,
        { id: _leaflet_id, latlng: contour },
      ]);
    }
  };
  const _onEditPath = (e: any) => {
    console.log(e);
  };
  const _onDeleted = (e: any) => {
    console.log(e);
  };

  return (
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
          onEdited={_onEditPath}
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

      {polygonsData}

      <Marker position={[33.28, -79.1894]} icon={markerIcon}>
        <Popup>
          Пиздец работает!!! <br /> Это земли Лорда Жупела!
        </Popup>
      </Marker>
      <div>
        <pre className="text-left">{JSON.stringify(mapLayers)}</pre>
      </div>
    </MapContainer>
  );
};

export default Map;

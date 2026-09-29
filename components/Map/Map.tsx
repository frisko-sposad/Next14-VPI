import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  LayerGroup,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import IconCastle from '../../components/leflet/icons/castle.svg';
import IconMine from '../../components/leflet/icons/kirka.svg';
import L, { Icon } from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useEffect, useState } from 'react';
import { polygonsData } from '../../public/database/data-polygons';
import { LocationFinderDummy } from './LocationFinderDummy';
import { castleData } from '@/public/database/data-icon';
import { unitsData } from '@/public/database/units-data';
import host_api from '@/app/host_api';

const markerIconCastle = new Icon({
  iconUrl: IconCastle,
  iconSize: [38, 38], // set the size of the icon
});
const markerIcongMine = new Icon({
  iconUrl: IconMine,
  iconSize: [38, 38], // set the size of the icon
});

const markerNumber = polygonsData.map((el) => {
  return (
    <>
      <Marker
        key={`qqq+${el.id}`}
        position={[el.center.lat, el.center.lng]}
        icon={L.divIcon({
          html: `${el.id}`,
          className: 'text-white text-base',
        })}
      ></Marker>
    </>
  );
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
            Религия: {el.info.religion}
            <br />
            <br />
            Шахты:
            {/* <span className="text-orange-600">{el.info.slave.mines}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.mines}</span>
            &nbsp;|&nbsp; */}
            <span className="text-black-600">{el.info.limits.mines}</span>
            {/* &nbsp;&nbsp;Добыча:
            {el.info.slave.mines * 2 + el.info.peasent.mines} железа */}
            <br />
            Лес:
            {/* <span className="text-orange-600">{el.info.slave.forest}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.forest}</span>
            &nbsp;|&nbsp; */}
            <span className="text-black-600">{el.info.limits.forest}</span>
            {/* &nbsp;&nbsp;Добыча:
            {el.info.slave.forest * 2 + el.info.peasent.forest} леса */}
            <br />
            Скот:
            {/* <span className="text-orange-600">{el.info.slave.skins}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.skins}</span>
            &nbsp;|&nbsp; */}
            <span className="text-black-600">{el.info.limits.skins}</span>
            {/* &nbsp;&nbsp;Добыча:
            {el.info.slave.skins * 2 + el.info.peasent.skins}
            &nbsp;шкур и {el.info.slave.skins * 2 + el.info.peasent.skins}
            &nbsp;еды */}
            <br />
            Поля:
            {/* <span className="text-orange-600">{el.info.slave.food}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.food}</span>
            &nbsp;|&nbsp; */}
            <span className="text-black-600">{el.info.limits.food}</span>
            {/* &nbsp;&nbsp;Добыча:
            {el.info.slave.food * 3 + el.info.peasent.food * 2} еды */}
            <br />
            <p>Игрок: {el.user}</p>
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

const Map = (params: any) => {
  const [dataUsers, setDataUsers] = useState([] as any);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`${host_api}/users`, {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //       },
  //     });

  //     const data = await response.json();
  //     data && setDataUsers(data);
  //   };
  //   fetchData();
  // }, []);

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
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l,
        ),
      );
    });
  };

  const _onDeleted = (e: any) => {
    const layers: ({ _leaflet_id }: { _leaflet_id: any }) => void =
      e.layers._layers;
    Object.values(layers).map(({ _leaflet_id }) => {
      setMapLayers((layers: any[]) =>
        layers.filter((l: { id: any }) => l.id != _leaflet_id),
      );
    });
  };

  return (
    <>
      <MapContainer
        className="w-1/2 z-10"
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
          attribution="--"
          // url="https://map-dorn.netlify.app//map/{z}-{x}-{y}.jpg"
          url="https://frisko-sposad.github.io/Map_Dorn//map/{z}-{x}-{y}.jpg"
        />
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Границы Феодов" checked>
            <LayerGroup>{polygonsBorder}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Религия">
            <LayerGroup>{polygonsBorderReligion}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Проходимость" checked>
            <LayerGroup>
              <Polyline
                positions={[
                  [78.13748568974525, 5.888671875],
                  [78.11941318750105, 1.3183593750000002],
                  [77.86353098267988, -1.5820312500000002],
                  [77.95553481700777, -3.251953125],
                  [78.42298667601625, -11.425781250000002],
                  [78.35225313516021, -14.677734375000002],
                  [78.63265470679414, -18.457031250000004],
                  [78.3699763775012, -22.587890625000004],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [78.47540010926681, -46.40625000000001],
                  [78.01003413796171, -47.98815625000001],
                  [77.14092265283308, -46.75781250000001],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [77.90003913686702, -38.3203125],
                  [77.78905023268321, -35.85937500000001],
                  [77.17998344253564, -35.41914062500001],
                  [76.90418813495607, -39.55078125],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [75.84941981593269, -38.935546875],
                  [74.98709026348278, -45.87890625],
                  [75.7632560143881, -48.25195312500001],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [82.30908465018838, -49.13085937500001],
                  [81.5576414533338, -53.52539062500001],
                  [81.8367091526856, -55.28320312500001],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [80.59082225800114, -85.34179687500001],
                  [80.35822446580782, -79.98046875000001],
                  [79.93739552219746, -78.83789062500001],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [78.59761730580594, -85.693359375],
                  [78.01003413796171, -86.22070312500001],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [78.40498242516747, -93.25195312500001],
                  [77.86315369061599, -93.33984375000001],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [76.5205748048426, -97.55859375000001],
                  [75.74163490223901, -98.78906250000001],
                ]}
                color="white"
                weight="8"
              />
              <Polyline
                positions={[
                  [76.47955833575611, -88.06640625000001],
                  [75.52364791714949, -88.94531250000001],
                ]}
                color="white"
                weight="8"
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Метки" checked>
            <LayerGroup>
              {/* <Marker
                position={[82.23058418566629, -51.3984375]}
                icon={markerIconCastle}
              >
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела!
                </Popup>
              </Marker>
              <Marker
                position={[82.72064678437275, -134.82421875000003]}
                icon={markerIcongMine}
              >
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела1!
                  {dataUsers && dataUsers[0] && dataUsers[0].login}
                  {params.id}
                </Popup>
              </Marker>
            </LayerGroup>
            <LayerGroup>
              {/* <Marker
                key={'12323424'}
                position={[74.24, -85.58]}
                icon={L.divIcon({
                  html: '1943',
                  className: 'text-white text-base',
                })}
              ></Marker> */}

              {/* <Marker
                position={[82.23058418566629, -51.3984375]}
                icon={markerIconCastle}
              >
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела!
                </Popup>
              </Marker>
              <Marker
                position={[82.72064678437275, -134.82421875000003]}
                icon={markerIcongMine}
              >
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела1!
                  {dataUsers && dataUsers[0] && dataUsers[0].login}
                  {params.id}
                </Popup>
              </Marker> */}
            </LayerGroup>
          </LayersControl.Overlay>
          {/* <LayersControl.Overlay name="Метки" checked>
            <LayerGroup>
              {markerIconcastleData}

              <Marker
                position={[82.23058418566629, -51.3984375]}
                icon={markerIconCastle}
              >
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела!
                </Popup>
              </Marker>
              <Marker
                position={[82.72064678437275, -134.82421875000003]}
                icon={markerIcongMine}
              >
                <Popup>
                  Пиздец работает!!! <br /> Это земли Лорда Жупела1!
                  {dataUsers && dataUsers[0] && dataUsers[0].login}
                  {params.id}
                </Popup>
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay> */}
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

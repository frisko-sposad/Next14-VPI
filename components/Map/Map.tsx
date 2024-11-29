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
import { useEffect, useState } from 'react';
import { polygonsData } from '../../public/database/data-polygons';
import { LocationFinderDummy } from './LocationFinderDummy';
import { castleData } from '@/public/database/data-icon';
import { unitsData } from '@/public/database/units-data';

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
  let armySize = 0;
  let armyPrice = 0;
  const army = el.info.army?.map((army) => {
    let name = '';
    let price = 0;
    armySize += army.number;
    unitsData.map((subRows) => {
      armyPrice += army.number * price;
      subRows.subRows.map((unit) => {
        unit.id == army.id && (name = unit.name);
        unit.id == army.id && (price = unit.price);
      });
    });
    return (
      <span key={army.id}>
        <br />
        {army.number} {name} - {army.number * price} серебра
      </span>
    );
  });

  console.log(army);

  const peasents =
    el.info.peasent.mines +
    el.info.peasent.forest +
    el.info.peasent.skins +
    el.info.peasent.food;

  const slave =
    el.info.slave.mines +
    el.info.slave.forest +
    el.info.slave.skins +
    el.info.slave.food;

  const limits =
    el.info.limits.mines +
    el.info.limits.forest +
    el.info.limits.skins +
    el.info.limits.food;

  const population = peasents + slave;

  let tax = 0;

  if (peasents >= limits) {
    if (peasents >= limits * 2) {
      if (peasents >= limits * 3) {
        tax = limits * 8 + limits * 4 + limits * 2;
      } else {
        tax = limits * 8 + limits * 4 + (peasents - limits * 2) * 2;
      }
    } else {
      tax = limits * 8 + (peasents - limits) * 4;
    }
  } else {
    tax = peasents * 8;
  }

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
            <br />
            Шахты:
            <span className="text-orange-600">{el.info.slave.mines}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.mines}</span>
            &nbsp;|&nbsp;
            <span className="text-black-600">{el.info.limits.mines}</span>
            &nbsp;&nbsp;Добыча:
            {el.info.slave.mines * 2 + el.info.peasent.mines} железа
            <br />
            Лес:
            <span className="text-orange-600">{el.info.slave.forest}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.forest}</span>
            &nbsp;|&nbsp;
            <span className="text-black-600">{el.info.limits.forest}</span>
            &nbsp;&nbsp;Добыча:
            {el.info.slave.forest * 2 + el.info.peasent.forest} леса
            <br />
            Скот:
            <span className="text-orange-600">{el.info.slave.skins}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.skins}</span>
            &nbsp;|&nbsp;
            <span className="text-black-600">{el.info.limits.skins}</span>
            &nbsp;&nbsp;Добыча:
            {el.info.slave.skins * 2 + el.info.peasent.skins}
            &nbsp;шкур и {el.info.slave.skins * 2 + el.info.peasent.skins}
            &nbsp;еды
            <br />
            Поля:
            <span className="text-orange-600">{el.info.slave.food}</span>
            &nbsp;|&nbsp;
            <span className="text-sky-500">{el.info.peasent.food}</span>
            &nbsp;|&nbsp;
            <span className="text-black-600">{el.info.limits.food}</span>
            &nbsp;&nbsp;Добыча:
            {el.info.slave.food * 3 + el.info.peasent.food * 2} еды
            <br />
            <br />
            Налоги:
            <span className="text-black-600">{tax}</span>
            <br />
            <br />
            Население:&nbsp;
            <b>{population}</b>
            <br />
            (Потребляет&nbsp;
            {population}
            &nbsp; еды, излишки еды&nbsp;
            {el.info.slave.food * 3 +
              el.info.peasent.food * 2 +
              el.info.slave.skins +
              el.info.peasent.skins -
              population}
            )
            <br />
            <span className="text-green-600">
              Солдаты:&nbsp;
              {armySize}
            </span>
            <br />
            <span className="text-orange-600">
              Рабы:&nbsp;
              {slave}
            </span>
            <br />
            <span className="text-sky-500">
              Крестьяне:&nbsp;
              {peasents}
            </span>
            <br />
            <span className="text-black-500">
              Лимит:&nbsp;
              {limits}
            </span>
            <p>
              <b>Армия:</b> {army}
              <br />
              <b>Жалование:</b> {armyPrice} серебра
            </p>
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
  console.log(params.id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://vpi-node-js.vercel.app/users`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      const data = await response.json();
      data && setDataUsers(data);
    };
    fetchData();
  }, []);

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

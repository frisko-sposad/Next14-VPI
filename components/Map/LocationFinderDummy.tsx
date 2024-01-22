import { useMapEvents } from 'react-leaflet';

export const LocationFinderDummy = () => {
  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);
    },
  });
  return null;
};

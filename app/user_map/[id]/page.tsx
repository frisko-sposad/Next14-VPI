'use client';
import Footer from '@/components/Footer/footer';
import Header from '@/components/Header/header';
import Map from '@/components/Map/Map';

// import Head from 'next/head';
// import React from 'react';
// import Header from '@/components/Header/header';
// import Footer from '@/components/Footer/footer';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// export default function Map() {
//   return (
//      <div>
//   <Header />
//   <div>
//     <Head>
//       <title>VPI</title>
//       <meta name="description" content="Generated by create next app" />
//       <link rel="icon" href="/favicon.ico" />
//     </Head>
//     <MapContainer
//       className="w-1/2"
//       center={[51.505, -0.09]}
//       zoom={13}
//       scrollWheelZoom={false}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[51.515, -0.09]}>
//         <Popup>
//           A pretty CSS3 popup1. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   </div>
//   <Footer />
// </div>
//   );
// }

// import dynamic from 'next/dynamic';
import Head from 'next/head';

const MapPage = ({ params }: { params: { id: number } }) => {
  // const Map = dynamic(
  //   () => import('@/components/Map/Map'), // replace '@components/map' with your component's location
  //   { ssr: false } // This line is important. It's what prevents server-side render
  // );

  return (
    <div>
      <Header />
      <div>
        <div>{params.id}</div>
        <Head>
          <title>VPI</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Map id={params.id} />
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;

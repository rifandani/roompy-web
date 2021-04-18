import { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  Tooltip,
  MapConsumer,
  TileLayer
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster"; // clustering marker
// files
import MyIcon from "./CustomIcon";
import { LocPref } from "../../utils/interfaces";

interface IRoompyDetailLeaflet {
  locPref: LocPref[]
}

const RoompyDetailLeaflet: React.FC<IRoompyDetailLeaflet> = ({ locPref }) => {
  const LMap = useRef(); // Map ref

  return (
    <MapContainer
      className="w-full rounded-md"
      style={{ minHeight: '50vh' }}
      center={[locPref[0].lat, locPref[0].lng]}
      zoom={7}
      maxZoom={20}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* map consumer */}
      <MapConsumer>
        {(map) => {
          // masukin Leaflet Map instance ke ref
          // @ts-ignore
          LMap.current = map;

          console.log("Map Consumer");
          return null;
        }}
      </MapConsumer>

      {/* marker cluster */}
      {/* @ts-ignore */}
      <MarkerClusterGroup>
        {locPref?.map((city, i: number) => (
          <Marker
            key={i}
            position={[Number(city.lat), Number(city.lng)]}
            icon={MyIcon}
          >
            {/* popup */}
            <Popup closeOnEscapeKey>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-bold">Preferensi #{i + 1}</h3>

                {/* <p className="text-sm italic">admin_name</p> */}

                <button
                  className="px-4 py-2 text-white bg-purple-500 rounded-md"
                  onClick={() => {
                    // @ts-ignore
                    LMap.current.flyTo([city.lat, city.lng], 17, {
                      duration: 7
                    });
                  }}
                >
                  Detailed Look
                </button>
              </div>
            </Popup>

            {/* tooltip */}
            <Tooltip>#{i + 1}</Tooltip>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default RoompyDetailLeaflet;

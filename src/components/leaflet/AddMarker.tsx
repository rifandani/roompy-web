import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

const AddMarker = () => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: (e) => {
      setPosition(e.latlng); // LatLng type

      /* CODE TO ADD NEW PLACE TO STORE/context */
    },
  });

  return position ? <Marker position={position}></Marker> : null;
};

export default AddMarker;

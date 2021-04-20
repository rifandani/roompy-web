import { useState } from 'react'
import { Marker, useMapEvents, Circle } from 'react-leaflet'

const AddMarker = ({ selectedCity, setSelectedCity }) => {
  const [position, setPosition] = useState(null)

  useMapEvents({
    click: (e) => {
      // console.log(e.latlng.lat);
      // console.log(e.latlng.lng);

      if (selectedCity.length >= 3) {
        const agreedToReset = confirm(
          'No more than 3 marker. Reset the marker?'
        ) // eslint-disable-line no-restricted-globals

        if (agreedToReset) {
          setSelectedCity([])
        }

        return
      }

      setPosition(e.latlng) // LatLng type

      // prompt user if they really want to add
      setTimeout(() => {
        const agreed = confirm('are u sure?') // eslint-disable-line no-restricted-globals

        if (agreed) {
          setSelectedCity((prev) => [...prev, e.latlng])
        }
      }, 500)
    },
  })

  return position ? (
    <>
      <Marker position={position}></Marker>
      <Circle
        center={position}
        pathOptions={{ fillColor: 'blue' }}
        radius={1000}
      />
    </>
  ) : null
}

export default AddMarker

import { LatLngExpression } from 'leaflet'
import { Marker, useMapEvents, Circle } from 'react-leaflet'
import { Dispatch, SetStateAction, useState } from 'react'
// files
import { LocPref } from 'utils/interfaces'

interface AddMarkerProps {
  selectedCity: LocPref[]
  setSelectedCity: Dispatch<SetStateAction<LocPref[]>>
}

const AddMarker = ({
  selectedCity,
  setSelectedCity,
}: AddMarkerProps): JSX.Element => {
  const [position, setPosition] = useState<LatLngExpression | null>(null)

  useMapEvents({
    click: (e) => {
      // console.log(e.latlng.lat);
      // console.log(e.latlng.lng);

      if (selectedCity.length >= 3) {
        const agreedToReset = confirm(
          'No more than 3 marker. Reset the marker?'
        )

        // reset marker
        if (agreedToReset) {
          setSelectedCity([])
        }

        return
      }

      setPosition(e.latlng)

      setTimeout(() => {
        const agreed = confirm('are u sure?')

        // add marker
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

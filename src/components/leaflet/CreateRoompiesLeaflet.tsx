import { Map } from 'leaflet'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import {
  MapContainer,
  Marker,
  MapConsumer,
  TileLayer,
  Circle,
  useMapEvents,
} from 'react-leaflet'
// files
import { LocPref } from 'utils/interfaces'

interface ICreateRoompiesLeaflet {
  locPref: LocPref[]
  setLocPref: Dispatch<SetStateAction<LocPref[]>>
}

const CreateRoompiesLeaflet: React.FC<ICreateRoompiesLeaflet> = ({
  locPref,
  setLocPref,
}) => {
  const [viewport] = useState({
    lat: -6.2087634,
    lng: 106.845599,
    zoom: 5,
    maxZoom: 30,
  })
  const LMap = useRef<Map>(null) // Map ref

  return (
    <MapContainer
      className="w-full rounded-sm"
      style={{ minHeight: '50vh' }}
      center={[viewport.lat, viewport.lng]}
      zoom={viewport.zoom}
      maxZoom={viewport.maxZoom}
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
          LMap.current = map

          return null
        }}
      </MapConsumer>

      {/* custom add marker */}
      <AddMarker locPref={locPref} setLocPref={setLocPref} />

      {/* show added marker */}
      {locPref.length > 0
        ? locPref.map((loc, i) => (
            <div key={i}>
              <Marker key={i} position={[loc.lat, loc.lng]}></Marker>
              <Circle
                center={[loc.lat, loc.lng]}
                pathOptions={{ fillColor: 'blue' }}
                radius={1000}
              />
            </div>
          ))
        : null}
    </MapContainer>
  )
}

const AddMarker: React.FC<ICreateRoompiesLeaflet> = ({
  locPref,
  setLocPref,
}) => {
  const [position, setPosition] = useState(null) // local marker state

  useMapEvents({
    click: (e) => {
      if (locPref.length >= 3) {
        const agreedToReset = confirm(
          'Tidak lebih dari 3 marker. Reset marker?'
        ) // eslint-disable-line no-restricted-globals

        if (agreedToReset) {
          setLocPref([]) // reset state
        }

        return
      }

      setPosition(e.latlng) // LatLng type

      setTimeout(() => {
        const agreed = confirm('Anda yakin?') // eslint-disable-line no-restricted-globals

        if (agreed) {
          // set to locPref state
          setLocPref((prev) => [
            ...prev,
            { lat: e.latlng.lat, lng: e.latlng.lng },
          ])
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

export default CreateRoompiesLeaflet

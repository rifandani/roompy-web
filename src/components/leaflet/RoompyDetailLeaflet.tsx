import { Map } from 'leaflet'
import { useRef } from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster' // clustering marker
import {
  MapContainer,
  Marker,
  Popup,
  Tooltip,
  MapConsumer,
  TileLayer,
  LayersControl,
  Circle,
  LayerGroup,
} from 'react-leaflet'
// files
import MyIcon from './CustomIcon'
import { LocPref } from 'utils/interfaces'

interface IRoompyDetailLeaflet {
  locPref: LocPref[]
}

const RoompyDetailLeaflet: React.FC<IRoompyDetailLeaflet> = ({ locPref }) => {
  const LMap = useRef<Map>(null) // Map ref

  return (
    <MapContainer
      className="w-full rounded-md"
      style={{ minHeight: '50vh' }}
      center={[locPref[0].lat, locPref[0].lng]}
      zoom={7}
      maxZoom={30}
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

      {/* layers control */}
      <LayersControl position="bottomleft">
        <LayersControl.Overlay name="Toggle Marker Radius">
          <LayerGroup>
            {locPref.map((position, i) => (
              <Circle
                key={i}
                center={[position.lat, position.lng]}
                radius={1000}
                pathOptions={{ color: 'purple' }}
              />
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* marker cluster */}
      <MarkerClusterGroup>
        {locPref.map((position, i) => (
          <Marker
            key={i}
            position={[Number(position.lat), Number(position.lng)]}
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
                    LMap.current.flyTo([position.lat, position.lng], 17, {
                      duration: 7,
                    })
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
  )
}

export default RoompyDetailLeaflet

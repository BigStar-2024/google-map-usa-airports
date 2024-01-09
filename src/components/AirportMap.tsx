import { FC, memo } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader, } from '@react-google-maps/api';
import { IAirport } from '../types';
const containerStyle = {
  width: '100%',
  height: '100%'
};

interface IAirportMap {
  center: google.maps.LatLngLiteral
  departing: IAirport
  destination: IAirport
}

export const AirportMap: FC<IAirportMap> = ({ center, departing, destination }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_APIKEY}`
  });

  if (!isLoaded) return <div>Map Loading ...</div>
  if (loadError) return <div>{loadError.message}</div>

  return (
    <GoogleMap
      id='google-map'
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
    >
      <Marker
        position={{
          lat: departing.latitude,
          lng: departing.longitude
        }}
        label='departing'
      />
      {
        destination.name !== '' && departing.name !== '' &&
        <>
          <Marker
            position={{
              lat: destination.latitude,
              lng: destination.longitude
            }}
            label='destination'
          />
          <Polyline
            path={[{
              lat: departing.latitude,
              lng: departing.longitude
            }, {
              lat: destination.latitude,
              lng: destination.longitude
            }]}
          />
        </>
      }
    </GoogleMap >
  )
}

export default memo(AirportMap)
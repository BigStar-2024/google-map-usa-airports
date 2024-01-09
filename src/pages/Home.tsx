import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
} from '@mui/material';
import { FC, useState, memo } from 'react';
import { calcDistance } from '../util';
import airports from '../airports.json';
import SearchPanel from '../components/SearchPanel';
import AirportMap from '../components/AirportMap';
import { IAirport } from '../types';


const center = {
  lat: 40,
  lng: -97
};

const airportsList = airports.map(airport => airport.iata !== '' && airport.city !== '' ? `(${airport.iata} - ${airport.city}) ${airport.name}` : airport.name)

export const Home: FC = () => {

  const [distance, setDistance] = useState(0)
  const [airportDeparting, setAirportDeparting] = useState<IAirport>({
    name: '',
    index: -1,
    latitude: center.lat,
    longitude: center.lng
  })
  const [airportDestination, setAirportDestination] = useState<IAirport>({
    name: '',
    index: -1,
    latitude: center.lat,
    longitude: center.lng
  })


  const updateAirportDeparting = (text: string) => {

    const index = airportsList.indexOf(text);

    if (index > -1) {
      const latitude = airports[index].latitude;
      const longitude = airports[index].longitude;
      setAirportDeparting({ name: text, index, latitude, longitude });

      if (airportDestination.index > -1) {
        const _distance = calcDistance({ name: text, index, latitude, longitude }, airportDestination);
        setDistance(_distance)
      }
    } else {
      setAirportDeparting({ ...airportDestination })
    }
  }
  const updateAirportDestination = (text: string) => {

    const index = airportsList.indexOf(text);

    if (index > -1) {
      const latitude = airports[index].latitude;
      const longitude = airports[index].longitude
      setAirportDestination({ name: text, index, latitude, longitude });

      if (airportDeparting.index > -1) {
        const _distance = calcDistance(airportDeparting, { name: text, index, latitude, longitude })
        setDistance(_distance)
      }
    } else {
      setAirportDestination({ ...airportDestination });
    }
  }


  return (
    <Box display={'flex'} height='100%'>
      <Card
        elevation={5}
        sx={{
          maxWidth: 'md',
          margin: 'auto',
          width: '100%',
        }}
      >
        <CardHeader
          title="USA Airports"
          subheader="Calculate distance and draw plot between 2 airports."
        />
        <CardContent
          id='route-container'
        >
          <SearchPanel
            airportsList={airportsList}
            result={distance}
            updateAirportDeparting={updateAirportDeparting}
            updateAirportDestination={updateAirportDestination}
          />
        </CardContent>
        <CardMedia sx={{ height: 500 }}
        >
          <AirportMap
            center={center}
            departing={airportDeparting}
            destination={airportDestination}
          />
        </CardMedia>
      </Card>
    </Box>
  )
}

export default memo(Home)
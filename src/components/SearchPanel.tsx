import { FC } from 'react';
import {
  Typography,
  TextField,
  Autocomplete,
  Grid
} from '@mui/material';

interface ISearchPanel {
  result: number
  airportsList: Array<string>
  updateAirportDeparting: (name: string) => void
  updateAirportDestination: (name: string) => void
}

export const SearchPanel: FC<ISearchPanel> = (
  {
    result, airportsList, updateAirportDeparting, updateAirportDestination
  }
) => {

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={6}>

        <Autocomplete
          id='departing-airport'
          options={airportsList}
          renderInput={(params) => <TextField {...params} label="Departing" />}
          onInputChange={(event: any, newValue: string) => updateAirportDeparting(newValue)}
        />
      </Grid>
      <Grid item xs={6}>

        <Autocomplete
          id='departing-airport'
          options={airportsList}
          renderInput={(params) => <TextField {...params} label="Destination" />}
          onInputChange={(event: any, newValue: string) => updateAirportDestination(newValue)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={'center'} fontWeight='bold'>
          {result} nautical miles
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SearchPanel
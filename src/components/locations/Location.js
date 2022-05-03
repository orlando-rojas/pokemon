import { Card, Typography, CardContent } from '@mui/material';
import { formatLocationName } from '../../utils/shared';
import { useAppContext } from '../app';

export function Location({ location }) {
  const { handleSelectLocation } = useAppContext();


  return (
    <Card variant="outlined" onClick={() => handleSelectLocation(location)}>
      <CardContent>
        <Typography variant="body2">
          {formatLocationName(location.name)}
        </Typography>
      </CardContent>
    </Card>
  );
}

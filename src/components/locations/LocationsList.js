import { Fragment } from 'react';
import { useAppContext } from '../app';
import { Location } from './Location';

export function LocationsList() {
  const { locations } = useAppContext();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
      {locations.map((location) => (
        <Fragment key={location.id}>
          <Location location={location} />
        </Fragment>
      ))}
    </div>
  );
}

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppContext } from './app';

export function AvailablePokemonsModal({ isOpen, handleClose }) {
  const { pokemonsInLocation } = useAppContext();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {pokemonsInLocation.map((pkmn, idx) => (
          <Typography id="modal-modal-description" key={idx}>
            {pkmn.pokemon.name}
          </Typography>
        ))}
      </Box>
    </Modal>
  );
}

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from '../utils/axios';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useAppContext } from './app';

export function PokemonModal({ isOpen, handleClose, pokemonData }) {
  const { setCartPokemons } = useAppContext();
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const handleAddPokemonToCart = () => {
    setCartPokemons((prev) => [...prev, pokemonInfo]);
    handleClose();
  };

  useEffect(() => {
    if (pokemonData) {
      const getPokemonData = async () => {
        const response = await axios.get(pokemonData.pokemon.url);
        setPokemonInfo(response.data);
      };
      getPokemonData();
    }
  }, [pokemonData]);

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

  if (pokemonData && pokemonInfo) {
    return (
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={pokemonInfo.sprites.front_default} alt="pkmn-img" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {pokemonInfo.name}
          </Typography>
          {pokemonInfo.stats.map((stat, idx) => (
            <Typography id="modal-modal-description" key={idx}>
              {stat.stat.name} : {stat.base_stat}
            </Typography>
          ))}
          <Button onClick={handleAddPokemonToCart}>Agregar al carro</Button>
          <Button onClick={handleClose}>Dejar ir</Button>
        </Box>
      </Modal>
    );
  }
}

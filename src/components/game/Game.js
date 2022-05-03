import { Button } from '@mui/material';
import axios from '../../utils/axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatLocationName, pxToNumb } from '../../utils/shared';
import { useAppContext } from '../app';
import { AvailablePokemonsModal } from '../AvailablePokemonsModal';
import { PokemonModal } from '../PokemonModal';
import { Sprite, Board, BoardHeader } from './Game.styles';

export function Game() {
  const [openModal, setOpenModal] = useState(false);
  const [found, setFound] = useState(false);
  const [foundPokemon, setFoundPokemon] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { selectedLocation, pokemonsInLocation, myPokemonsObj, cartPokemons } =
    useAppContext();

  const waterPokemons = useMemo(
    () => myPokemonsObj['water'] ?? [],
    [myPokemonsObj]
  );

  console.log({ waterPokemons });

  const getStyles = () => {
    const board = document.getElementById('board');
    const style = window.getComputedStyle(board);
    return { width: pxToNumb(style.width), height: pxToNumb(style.height) };
  };

  const incrementX = useCallback((x) => {
    const { width } = getStyles();
    return x < width ? x + 32 : 0;
  }, []);

  const decrementX = useCallback((x) => {
    const { width } = getStyles();
    return x < 1 ? width : x - 32;
  }, []);

  const incrementY = useCallback((y) => {
    const { height } = getStyles();
    return y < height ? y + 32 : y;
  }, []);

  const decrementY = useCallback((y) => {
    return y < 1 ? y : y - 32;
  }, []);

  const actionXMap = useMemo(
    () => ({
      ArrowLeft: decrementX,
      ArrowRight: incrementX,
    }),
    [decrementX, incrementX]
  );

  const actionYMap = useMemo(
    () => ({
      ArrowDown: incrementY,
      ArrowUp: decrementY,
    }),
    [incrementY, decrementY]
  );

  const findPokemon = () => Math.floor(Math.random() * 100) < 20;

  const handleKeyPress = useCallback(
    (e) => {
      const actionX = actionXMap[e.key];
      const actionY = actionYMap[e.key];
      if (actionX) setX(actionX);
      if (actionY) setY(actionY);
      const foundPokemon = findPokemon();

      if ((actionX || actionY) && foundPokemon) {
        setFound(true);
      }
    },
    [actionXMap, actionYMap]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const getPokemon = async (name) => {
    const response = await axios.get(`/pokemon/${name}`);
    setFoundPokemon({
      pokemon: {
        url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
      },
    });
  };

  useEffect(() => {
    if (found) {
      const icePokemons = myPokemonsObj['ice'] ?? [];
      const firePokemons = myPokemonsObj['fire'] ?? [];
      const electricPokemons = myPokemonsObj['electric'] ?? [];

      const icePokemonsNames = icePokemons.map((icePkmn) => icePkmn.name);
      const firePokemonsNames = firePokemons.map((firePkmn) => firePkmn.name);
      const electricPokemonsNames = electricPokemons.map(
        (electricPkmn) => electricPkmn.name
      );

      const cartPokemonsNames = cartPokemons.map((pkm) => pkm.name);
      if (
        waterPokemons.length >= 10 &&
        !icePokemonsNames.includes('articuno') &&
        !cartPokemonsNames.includes('articuno')
      ) {
        console.log('entró');
        const foundArticuno = Math.floor(Math.random() * 100) < 50;
        if (foundArticuno) {
          getPokemon('articuno');
        }
      } else if (
        firePokemonsNames.length >= 10 &&
        !firePokemonsNames.includes('moltres') &&
        !cartPokemonsNames.includes('moltres')
      ) {
        const foundMoltres = Math.floor(Math.random() * 100) < 50;
        if (foundMoltres) {
          getPokemon('moltres');
        }
      } else if (
        electricPokemons.length >= 10 &&
        !electricPokemonsNames.includes('zapdos') &&
        !cartPokemonsNames.includes('zapdos')
      ) {
        const foundZapdos = Math.floor(Math.random() * 100) < 50;
        if (foundZapdos) {
          getPokemon('zapdos');
        }
      } else {
        const randomIndex = Math.floor(
          Math.random() * pokemonsInLocation.length
        );
        const foundPkmn = pokemonsInLocation[randomIndex];
        setFoundPokemon(foundPkmn);
      }
    }
  }, [found, pokemonsInLocation, waterPokemons, myPokemonsObj, cartPokemons]);

  const handlePokemonModalClose = () => {
    setFoundPokemon(null);
    setFound(false);
  };

  return (
    <>
      <BoardHeader>
        <p>{formatLocationName(selectedLocation.name)}</p>
        <Button onClick={() => setOpenModal(true)}>
          Ver pokemones disponibles
        </Button>
      </BoardHeader>
      <Board onKeyPress={handleKeyPress} id="board">
        <Sprite x={x} y={y} src="images/sprite.png"></Sprite>
      </Board>
      <AvailablePokemonsModal
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
      />
      <PokemonModal
        isOpen={found}
        handleClose={handlePokemonModalClose}
        pokemonData={foundPokemon}
      />
    </>
  );
}

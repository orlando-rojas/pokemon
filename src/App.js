import { useEffect, useState } from 'react';
import axios from './utils/axios';
import { Drawer, Typography } from '@mui/material';
import { Cart } from './components/cart';
import { LocationsList } from './components/locations';
import { Game } from './components/game';
import { formatLocations, formatKantoPokemons } from './utils/shared';
import { AppContext, Header, Main } from './components/app';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MyPokemons from './components/MyPokemons';

function App() {
  const [showLocationsList, setShowLocationsList] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [pokemonsInLocation, setPokemonsInLocation] = useState([]);
  const [kantoPokemons, setKantoPokemons] = useState([]);
  const [cartPokemons, setCartPokemons] = useState([]);
  const [myPokemons, setMyPokemons] = useState([]);
  const [isMyPokemonsOpen, setIsMyPokemonsOpen] = useState(false);
  const [myPokemonsObj, setMyPokemonsObj] = useState({});
  const [checkoutStep, setChechoutStep] = useState(1);

  useEffect(() => {
    const getLocations = async () => {
      const response = await axios.get('/location-area?limit=1000');
      const formatedLocations = formatLocations(response.data.results);
      setLocations(formatedLocations);
    };

    const getKantoPokemons = async () => {
      const response = await axios.get('/pokedex/2');
      const formatedPokemons = formatKantoPokemons(
        response.data.pokemon_entries
      );
      const pokemonsSet = new Set(formatedPokemons);
      setKantoPokemons(pokemonsSet);
    };

    getLocations();
    getKantoPokemons();
  }, []);

  useEffect(() => {
    const getPokemonsInLocation = async () => {
      console.log({ selectedLocation });
      const response = await axios.get(
        `/location-area/${selectedLocation.name}`
      );
      console.log({ response });

      const pokemons = response.data.pokemon_encounters;
      const filteredKantoPokemons = pokemons.filter((pkmn) =>
        kantoPokemons.has(pkmn.pokemon.name)
      );
      setPokemonsInLocation(filteredKantoPokemons);
    };
    if (selectedLocation) getPokemonsInLocation();
  }, [selectedLocation, kantoPokemons]);

  const handleSelectLocation = (location) => {
    setShowLocationsList(false);
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (myPokemons) {
      const types = myPokemons.map((pkmn) => pkmn.types[0].type.name);
      const obj = {};
      types.forEach(
        (type) =>
          (obj[type] = myPokemons.filter(
            (pkmn) => pkmn.types[0].type.name === type
          ))
      );

      setMyPokemonsObj(obj);
    }
  }, [myPokemons, setMyPokemonsObj]);

  return (
    <AppContext.Provider
      value={{
        locations,
        handleSelectLocation,
        cartPokemons,
        setCartPokemons,
        selectedLocation,
        pokemonsInLocation,
        setMyPokemons,
        myPokemons,
        myPokemonsObj,
        setMyPokemonsObj,
        checkoutStep,
        setChechoutStep,
      }}
    >
      <Header>
        <Typography variant="h6" onClick={() => setShowLocationsList(true)}>
          {showLocationsList ? null : 'Volver a la lista de terrenos'}
        </Typography>
        <Typography variant="h6" onClick={() => setIsMyPokemonsOpen(true)}>
          My Pokemons
        </Typography>
        <ShoppingCartIcon
          fontSize="large"
          onClick={() => setIsDrawerOpen(true)}
        />
      </Header>
      <Main>{showLocationsList ? <LocationsList /> : <Game />}</Main>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Cart />
      </Drawer>

      <Drawer
        anchor={'left'}
        open={isMyPokemonsOpen}
        onClose={() => setIsMyPokemonsOpen(false)}
      >
        <MyPokemons />
      </Drawer>
    </AppContext.Provider>
  );
}

export default App;

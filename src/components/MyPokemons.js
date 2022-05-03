import { Typography } from '@mui/material';

import { useAppContext } from './app';
import { MyPokemonsWrapper, CartItem } from './MyPokemons.styles';

export default function MyPokemons() {
  const { myPokemonsObj } = useAppContext();

  return (
    <MyPokemonsWrapper>
      <Typography variant="h6">My Pokemons</Typography>
      {Object.entries(myPokemonsObj).map(([name, pokemons]) => {
        return (
          <div>
            <h1>{name}</h1>
            {pokemons.map((pkmn) => (
              <CartItem key={pkmn.id}>
                <img src={pkmn.sprites.front_default} alt="" />
                <h1>{pkmn.name}</h1>
              </CartItem>
            ))}
          </div>
        );
      })}
    </MyPokemonsWrapper>
  );
}

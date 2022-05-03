export const formatLocations = (locations) =>
  locations.map((location) => {
    const url = location.url.split('/');
    return {
      ...location,
      id: url[url.length - 2],
    };
  });

export const formatKantoPokemons = (pokemons) =>
  pokemons.map((pkmn) => pkmn.pokemon_species.name);

export const formatLocationName = (name) =>
  name.replaceAll('-', ' ').split(' ').slice(0, -1).join(' ');

export const pxToNumb = (px) => {
  const newValue = px.split('');
  const result = newValue.slice(0, -2);
  return +result.join('') - 64;
};

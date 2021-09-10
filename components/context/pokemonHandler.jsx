import { createContext, useEffect, useState } from 'react';

export const HandlerContext = createContext({
  addData: () => {},
  getTotal: () => {},
  getOwned: () => {},
  checkNickname: () => {},
  getPokemons: {},
});
export const HandlerProvider = ({ children }) => {
  const [getPokemons, addPokemons] = useState({});
  useEffect(() => {
    if (localStorage.getItem('pokemons')) {
      addPokemons(JSON.parse(localStorage.getItem('pokemons')));
    }
  }, []);
  useEffect(() => {
    if (getPokemons) {
      localStorage.setItem('pokemons', JSON.stringify(getPokemons));
    }
  }, [getPokemons]);

  const addData = (id, data) => {
    const pokemonList = JSON.parse(JSON.stringify(getPokemons));
    if (!pokemonList[id]) {
      pokemonList[id] = [];
    }
    pokemonList[id].push(data);
    addPokemons(pokemonList);
  };
  const getOwned = (id) => {
    if (!getPokemons[id]) {
      return 0;
    }
    return Object.values(getPokemons[id]).flat().length;
  };
  const getTotal = () => {
    if (!getPokemons) {
      return 0;
    }
    return Object.values(getPokemons).flat().length;
  };
  // eslint-disable-next-line arrow-body-style
  const checkNickname = (data) => {
    return Object.values(getPokemons).flat().some((x) => x.nickname === data);
  };
  return (
    <HandlerContext.Provider
      value={{
        getPokemons,
        addData,
        getTotal,
        getOwned,
        checkNickname,
      }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

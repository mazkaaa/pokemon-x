/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  useQuery,
  gql,
} from '@apollo/client';
// import { useState } from 'react';
import { color } from '../styles/ui/color';

const getpokemonsQuery = gql`
  query pokemonsquery {
    pokemons(limit: 20, offset: 0) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const cardContainer = css`
  margin: 1vh;
  .card {
    border-radius: 5px;
    width: 17vh;
    height: 20vh;
    display: flex;
    flex-direction: column;
    background-color: ${color.yellow};
    
  }
  .card .card-name {
    display: flex;
    text-align: center;
    justify-content: center;
    height: 100%;
    text-transform: capitalize;
    flex-direction: column;
  }
  .card .card-image {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
  }
  h4, h5 {
    margin: 0;
    padding: 0;
    color: ${color.white};
  }
`;

export default function PokemonList() {
  // eslint-disable-next-line react/destructuring-assignment
  const { loading, error, data } = useQuery(getpokemonsQuery);
  // const [totalOwn, setTotalOwn] = useState(0);
  if (loading) {
    return (
      <h2>Loading...</h2>
    );
  }
  if (error) {
    return (
      <p>{error.message}</p>
    );
  }
  return (
    data.pokemons.results.map(({ name, image }) => (
      <div css={cardContainer} key={name}>
        <Link href={{
          pathname: '/pokemon/[name]',
          query: {
            // eslint-disable-next-line object-shorthand
            name: name,
          },
        }}
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <div className="card">
              <div className="card-image">
                <Image src={image} alt={name} width={100} height={100} />
              </div>
              <div className="card-name">
                <h4>{name}</h4>
                <h5>owned</h5>
              </div>
            </div>
          </a>
        </Link>
      </div>
    ))
  );
}

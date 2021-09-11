/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import {
  gql,
} from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { color } from '../styles/ui/color';
import Layout from '../components/Layout';
import { HandlerContext } from '../components/context/pokemonHandler';
import client from '../components/graphql/graphqlClient';

const Container = css`
  padding: 3vh 4vh;
  display: flex;
  flex-direction: column;
  .header {
    color: ${color.black};
    text-align: center;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
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
const getpokemonsQuery = gql`
  query pokemonsquery($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        id
        image
      }
    }
  }
  `;

export default function Home(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { getOwned } = useContext(HandlerContext);
  // eslint-disable-next-line react/destructuring-assignment
  const [getPokemons] = useState(props.pokemons);

  const getTheData = getPokemons.map((el, idx) => (
    <div css={cardContainer} key={el.id}>
      <Link href={{
        pathname: '/pokemon/[name]',
        query: {
          // eslint-disable-next-line object-shorthand
          name: el.name,
        },
      }}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <div className="card">
            <div className="card-image">
              <Image src={el.image} alt={el.name} width={100} height={100} />
            </div>
            <div className="card-name">
              <h4>{el.name}</h4>
              { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
              <h5>owned {getOwned(idx)}</h5>
            </div>
          </div>
        </a>
      </Link>
    </div>
  ));
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <Layout title="Home">
      <div css={Container}>
        <h1 className="header">Pokemon List</h1>
        <div className="content">
          {getTheData}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getpokemonsQuery,
    variables: {
      limit: 20,
      offset: 0,
    },
  });
  return {
    props: {
      pokemons: data.pokemons.results,
    },
  };
}

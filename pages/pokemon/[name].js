/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import { color } from '../../styles/ui/color';
import client from '../../components/graphql/graphqlClient';
import { HandlerContext } from '../../components/context/pokemonHandler';

const container = css`
  padding: 3vh 4vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  .content {
    padding-top: 5vh;
    display: flex;
    flex-direction: column;
  }
  h1, h2, h3, h4 {
    color: ${color.black};
    text-align: center;
    text-transform: capitalize;
  }
  .img-sprite {
    display: flex;
    justify-content: center;
  }
  .list-content{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .list-content p{
    padding: 0 1vh;
  }
  h4 {
    margin-top: 5vh;
    margin-bottom: 0;
  }
  button {
    width: 20vh;
    padding: 2.5vh;
    font-weight: 700;
    border: 0;
    letter-spacing: 1px;
    background-color: ${color.yellow};
    color: ${color.white};
    cursor: pointer;
  }
  button .success {
    background-color: ${color.green};
    color: ${color.white};
  }
  .catch-section-button{
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;
  }
  input {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2vh;
    padding: 1.4vh 0;
    text-align: center;
    border: 1px solid gray;
  }
`;
export default function Pokemon(props) {
  const [pokeCatched, setCatched] = useState(false);
  const [nickname, setNickname] = useState('');
  const { addData, checkNickname } = useContext(HandlerContext);
  const {
    pokemon: {
      id,
      name,
      abilities,
      moves,
      types,
      sprites,
    },
  } = props;
  const addPoke = () => {
    const key = id;
    if (checkNickname(nickname)) {
      // eslint-disable-next-line no-alert
      alert('This nickname not available');
    } else {
      const pokeSave = {
        id,
        nickname,
        name,
        abilities,
        moves,
        types,
        sprites,
      };
      addData(key, pokeSave);
      setCatched(false);
    }
  };
  const catchPoke = () => {
    if (Math.random() < 0.5) {
      // success
      setCatched(true);
    } else {
      // failed
      setCatched(false);
      // eslint-disable-next-line no-alert
      alert('Failed to catch this pokemon!');
    }
  };
  const buttonSection = pokeCatched ? (
  // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <input type="text" placeholder="Pokemon nickname" onChange={(event) => setNickname(event.target.value)} />
      <button type="button" onClick={addPoke}>Add Poke</button>
    </div>
  ) : (
    <button type="button" onClick={catchPoke}>Catch</button>
  );
  return (
    <Layout title={name.charAt(0).toUpperCase() + name.slice(1)}>
      <div css={container}>
        <div className="content">
          <div className="img-sprite">
            <Image src={sprites.front_shiny} alt="Front Shiny" width={100} height={100} />
            <Image src={sprites.back_default} alt="Front Shiny" width={100} height={100} />
            <Image src={sprites.front_default} alt="Front Shiny" width={100} height={100} />
          </div>
          <h1 className="poke-name">{name}</h1>
          <div className="catch-section-button">
            {buttonSection}
          </div>
          <h4>abilities</h4>
          <div className="list-content">
            {abilities.map((item, k) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={k}>
                {item.ability.name}
              </p>
            ))}
          </div>
          <h4>types</h4>
          <div className="list-content">
            {types.map((item, k) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={k}>
                {item.type.name}
              </p>
            ))}
          </div>
          <h4>moves</h4>
          <div className="list-content">
            {moves.map((item, k) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={k}>
                {item.move.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const getPokemon = gql`
query pokeQuery($name: String!) {
  pokemon(name: $name) {
    id
    name
    abilities {
      ability {
        name
      }
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
    sprites {
      front_shiny
      back_default
      front_default
    }
  }
}`;
  const {
    params: { name },
  } = context;

  const {
    data: { pokemon },
  } = await client.query({
    query: getPokemon,
    variables: {
      name,
    },
  });

  return {
    props: {
      pokemon,
    },
  };
}

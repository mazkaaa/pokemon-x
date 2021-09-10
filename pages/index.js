/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { color } from '../styles/ui/color';
import Layout from '../components/Layout';
import PokemonList from '../components/pokemonList';

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

export default function Home() {
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <Layout title="Home">
      <div css={Container}>
        <h1 className="header">Pokemon List</h1>
        <div className="content">
          <PokemonList />
        </div>
      </div>
    </Layout>
  );
}

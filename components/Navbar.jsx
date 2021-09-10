/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useContext } from 'react';
import { color } from '../styles/ui/color';
import { HandlerContext } from './context/pokemonHandler';

const Nav = styled.nav`
  background-color: ${color.yellow};
  color: ${color.white};
  font-size: 1.1rem;
`;
const ContainerNav = css`
  padding: 3vh 4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .brand {
    font-weight: 800;
    font-size: 1.2rem;
  }
  .pocket {
    font-weight: 500;
    font-size: 1rem;
  }
`;

export default function Navbar() {
  const { getTotal } = useContext(HandlerContext);
  return (
    <Nav>
      <div css={ContainerNav}>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="brand">Pokemon X</a>
        </Link>
        <Link href="/inventory">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="pocket">
            Bag
            (
            {getTotal()}
            )
          </a>
        </Link>
      </div>
    </Nav>
  );
}

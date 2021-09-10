import React from 'react';
import Head from 'next/head';

export default function Layout(props) {
  return (
    <div>
      <Head>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <title>{props.title}</title>
      </Head>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </div>
  );
}

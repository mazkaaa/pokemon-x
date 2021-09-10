import React from 'react';
import Head from 'next/head';

export default function Layout(props) {
  return (
    <div>
      <Head>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet" />
      </Head>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </div>
  );
}

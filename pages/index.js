import React from 'react';
import Head from 'next/head';
import { Link } from 'src/routes';
import styled from 'styled-components';

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

export default function HomePage () {
  return (
    <div>
      <Head>
        <title>App</title>
      </Head>
      <Heading>App</Heading>
      <Link route='about'><a>About</a></Link>
    </div>
  );
}

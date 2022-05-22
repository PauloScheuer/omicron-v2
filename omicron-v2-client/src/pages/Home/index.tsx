import React from 'react';
import Layout from '../../components/Layout';
import ButHow from './ButHow';
import Check from './Check';
import Initial from './Initial';
import Resources from './Resources';
import Welcome from './Welcome';

export default function Home() {
  return (
    <Layout>
      <Initial /> 
      <Welcome /> 
      <ButHow /> 
      <Resources />
      <Check />
    </Layout>
  );
}

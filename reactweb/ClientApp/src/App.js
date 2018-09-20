import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { TechTips } from './components/TechTips';
import { TechTipDetails } from './components/TechTipDetails';
import { Counter } from './components/Counter';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={TechTips} />
        <Route path='/counter' component={Counter} />
        <Route path='/techtips' component={TechTips} />
        <Route path='/techtipdetails/:name' component={TechTipDetails} />
      </Layout>
    );
  }
}

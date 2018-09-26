﻿import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import TechTips from './components/TechTips';
import TechTipDetails from './components/TechTipDetails';
import Tasks from './azure/components/Tasks';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/techtips' component={TechTips} />
    <Route path='/techtipdetails/:name' component={TechTipDetails} />
    <Route path='/azure' component={Tasks} />
  </Layout>
);

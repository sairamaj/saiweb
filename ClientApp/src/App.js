import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import TechTips from './components/TechTips';
import TechTipDetails from './components/TechTipDetails';
import Tasks from './azure/components/Tasks';
import Snippet from './codesnippets/components/Snippet';
import Project from './projects/components/Project';

export default () => (
  <Layout>
    <Route exact path='/' component={TechTips} />
    <Route path='/techtips' component={TechTips} />
    <Route path='/techtipdetails/:name' component={TechTipDetails} />
    <Route path='/azure' component={Tasks} />
    <Route path='/codesnippets' component={Snippet} />
    <Route path='/projects' component={Project} />
  </Layout>
);

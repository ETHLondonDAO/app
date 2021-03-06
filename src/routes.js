/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import { lazy } from 'react';

import Layout from './layouts/ApolloWrapper';

const routes = [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./views/Home')),
      },
      {
        path: '/submit-proposal',
        exact: true,
        component: lazy(() => import('./views/SubmitProposal')),
      },
      {
        path: '/how-it-works',
        exact: true,
        component: lazy(() => import('./views/HowItWorks')),
      },
      {
        path: '/security',
        exact: true,
        component: lazy(() => import('./views/Security')),
      },
      {
        path: '/sponsor',
        exact: true,
        component: lazy(() => import('./views/Sponsor')),
      },
      {
        path: '/deposit',
        exact: true,
        component: lazy(() => import('./views/Deposit')),
      },
      {
        path: '/withdraw',
        exact: true,
        component: lazy(() => import('./views/Withdraw')),
      },
      {
        path: '/proposals',
        exact: true,
        component: lazy(() => import('./views/Proposals')),
      },
      {
        path: '/proposals/:proposal_id',
        component: lazy(() => import('./views/Proposal')),
      },
      {
        path: '/network-not-supported',
        exact: true,
        component: lazy(() => import('./views/NetworkNotSupported')),
      },
      {
        path: '/increase-iteration',
        exact: true,
        component: lazy(() => import('./views/IncreaseIteration')),
      },
      {
        path: '/experiment',
        exact: true,
        component: lazy(() => import('./views/Experiment')),
      },
    ],
  },
];

export default routes;

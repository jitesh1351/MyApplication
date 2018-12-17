import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

// import Style from '../node_modules/react-sugar-ui/lib/Style';

import store from './store';

const rootElement = document.getElementById('root');

import MyApplication from 'container_source/MyApplication.jsx';
import DetailScreen from 'container_source/DetailScreen.jsx';
render(
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route path="/MyApplication" component={MyApplication} />
      <Route path="/DetailScreen/:studentId&:studentName&:passportNo&:favourite" component={DetailScreen} />
    </Router>
  </Provider>,
  rootElement
);
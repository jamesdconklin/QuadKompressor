import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Landing from 'LandingComponent';
import ShowcaseContainer from 'ShowcaseContainer';

import App from 'AppComponent';


class AppRouter extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
  	return (
  		<Router history={hashHistory}>
        <Route path="/" component={ App }>
          <IndexRoute component={Landing}/>
          <Route path="/showcase" component={ ShowcaseContainer }/>
        </Route>
  		</Router>
  	);
  }
}

export default AppRouter;

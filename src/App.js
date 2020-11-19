import React from 'react';
import { StaticRouter, Route, Switch } from 'react-router-dom';

import routes from './routes'

function App(passedData) {
  return (
    <div className="App">
      <div className="App-header" style={{ padding: '0 15px', background: "inherit" }}>
        <StaticRouter>
          <Switch>
            {routes.map(({ path, exact, component: Component, ...props }) => (
                <Route
                    key={path}
                    path={path}
                    exact={exact}
                    render={routeProps => (
                        <Component {...routeProps} {...props} passedData={passedData}/>
                    )}
                />
            ))}
          </Switch>
        </StaticRouter>
        <hr/>
        <a href="/research">Return to Magnitt Research</a>
      </div>
    </div>
  );
}

export default App;
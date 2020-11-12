import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import './App.css';
import routes from './routes'

function App(passedData) {

  return (
    <div className="App">
      <header className="App-header" style={{ paddingLeft: 45, background: "inherit" }}>
        <BrowserRouter>
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
        </BrowserRouter>
        {/* <img src={`${process.env.REACT_APP_CONTENT_HOST}${logo}`} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. 1
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;

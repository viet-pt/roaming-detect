import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from 'store';
import { routes, LOGIN } from 'global/routes';
import { Provider } from 'react-redux';
import { Footer } from 'pages';
import { ProgressTurn } from 'components';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

class App extends React.PureComponent {
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    if (!token) {
      // this.props.history.push(LOGIN);  // NEED TO UPDATE
    }
  }

  render () {
    return (
      <Router>
        <Provider store={store}>
          <ProgressTurn />
          <div className="app-wrapper">
            <Switch>
              {routes.map((route, index) => (
                <Route 
                  key={index} 
                  path={route.path} 
                  exact={route.exact} 
                  component={route.main} 
                />
              ))}
            </Switch>
            <Footer />
          </div>
        </Provider>
      </Router>
    )
  };
};

export default App;

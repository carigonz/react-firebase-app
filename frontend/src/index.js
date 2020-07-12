import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import Navbar from './components/navbar/navbar.component';
import './index.css';
import Searcher from './containers/search/searcher.component';

import { store, history } from './redux/store';
import Landing from './containers/Landing';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<Route exact path='/search' component={Searcher} />
				</Router>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

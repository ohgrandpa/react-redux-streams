import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StreamHeader from './streams/StreamHeader';
import history from '../history';

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<StreamHeader />
					<Switch>
						<Route path="/" exact component={StreamList} />
						<Route path="/streams/new" exact component={StreamCreate} />
						<Route path="/streams/edit/:id" component={StreamEdit} />
						<Route path="/streams/delete/:id" component={StreamDelete} />
						<Route path="/streams/:id" exact component={StreamShow} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
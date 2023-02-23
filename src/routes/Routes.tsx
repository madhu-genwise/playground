import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('pages/Home'));

const Routes: React.FC = () => (
	<Suspense fallback={<>LOADING...</>}>
		<Router basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</Router>
	</Suspense>
);

export default React.memo(Routes);

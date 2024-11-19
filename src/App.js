import Routing from 'Routing';
import Loading from 'components/Loading/Loading';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { sendPass } from 'utils/authHandler';

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [params] = useSearchParams();
	const isAuthenticated = useSelector(state => state.auth);

	useEffect(() => {
		const passParam = params.get('pass');

		if (passParam) {
			sendPass(passParam, dispatch, navigate);
		} else if (!isAuthenticated && location.pathname !== '/' && location.pathname !== '/login') {
			navigate('/login');
		}
	}, [params, dispatch, navigate, isAuthenticated, location.pathname]);

	return (
		<Suspense fallback={<Loading />}>
			{passParam ? <Loading /> : <Routing />}
		</Suspense>
	);
};

export default App;

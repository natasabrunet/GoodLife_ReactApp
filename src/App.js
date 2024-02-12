import Routing from 'Routing'
import Loading from 'components/Loading/Loading'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { sendPass } from 'utils/authHandler'

const App = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [params] = useSearchParams()
	const isAuthenticated = useSelector(state => state.auth)

	useEffect(() => {
		if (params.get('pass')) {
			sendPass(params.get('pass'), dispatch, navigate)
		} else {
			if (isAuthenticated) {
				// navigate('/step0')
			} else {
				if (location.pathname !== '/' && location.pathname !== '/login') {
					navigate('/login')
				}
			}
		}
	}, [location, isAuthenticated])

	return params.get('pass') ? (
		<Loading />
	) : (
		<Suspense fallback={<Loading />}>
			<Routing />
		</Suspense>
	)
}
export default App

import Layout from 'components/Layout/Layout'
import Loading from 'components/Loading/Loading'
import { lazy, Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
	Route,
	Routes,
	Navigate,
	useLocation,
	useNavigate
} from 'react-router-dom'

const Login = lazy(() => import('pages/Login/Login'))
const Step0 = lazy(() => import('pages/Step0/Step0'))
const Step1 = lazy(() => import('pages/Step1/Step1'))
const Step2 = lazy(() => import('pages/Step2/Step2'))
const Step3 = lazy(() => import('pages/Step3/Step3'))
const Step4 = lazy(() => import('pages/Step4/Step4'))
const Step5 = lazy(() => import('pages/Step5/Step5'))
const Step6 = lazy(() => import('pages/Step6/Step6'))
const Step7 = lazy(() => import('pages/Step7/Step7'))
const Step8 = lazy(() => import('pages/Step8/Step8'))
const Settings = lazy(() => import('pages/Settings/Settings'))
const NotFound = lazy(() => import('pages/NotFound/NotFound'))

const App = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const isAuthenticated = useSelector(state => state.auth)
	useEffect(() => {
		if (isAuthenticated) {
			// navigate('/step0')
		} else {
			if (location.pathname !== '/' && location.pathname !== '/login') {
				navigate('/login')
			}
		}
	}, [location, isAuthenticated])
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='/login' element={<Login />} />
				<Route path='/step0' element={<Step0 />} />
				{/* <Route path='/step1' element={<Step1 />} /> */}
				<Route path='/step1' element={<Step2 />} />
				<Route path='/step2' element={<Step3 />} />
				<Route path='/step3' element={<Step4 />} />
				<Route path='/step4' element={<Step5 />} />
				<Route path='/step5' element={<Step6 />} />
				<Route path='/step6' element={<Step7 />} />
				<Route path='/step7' element={<Step8 />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}
export default App

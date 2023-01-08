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
				<Route path='/step0' element={<Layout ChildComponent={Step0} />} />
				<Route path='/step1' element={<Step1 />} />
				<Route path='/step2' element={<Layout ChildComponent={Step2} />} />
				<Route path='/step3' element={<Layout ChildComponent={Step3} />} />
				<Route path='/step4' element={<Layout ChildComponent={Step4} />} />
				<Route path='/step5' element={<Layout ChildComponent={Step5} />} />
				<Route path='/step6' element={<Layout ChildComponent={Step6} />} />
				<Route path='/step7' element={<Layout ChildComponent={Step7} />} />
				<Route
					path='/settings'
					element={<Layout ChildComponent={Settings} />}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}
export default App

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import 'assets/styles/base/reset.scss'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import App from './App'

const root = document.getElementById('root')

ReactDOM.render(
	<StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						<App />
					</Router>
				</PersistGate>
			</Provider>
		</ErrorBoundary>
	</StrictMode>,
	root
)

serviceWorkerRegistration.register()

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './Login.scss'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import PasswordIcon from 'assets/images/password-icon.svg'
import { sendPass } from 'utils/authHandler'

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [pass, setPass] = useState('')

	const onSubmit = e => {
		e.preventDefault()
		const password = pass.trim()
		if (password.length) {
			sendPass(password, dispatch, navigate)
		}
	}
	useEffect(() => {
		const clearCacheData = () => {
			caches.keys().then(names => {
				names.forEach(name => {
					caches.delete(name)
				})
			})
			console.log('Complete Cache Cleared')
		}
		clearCacheData()
	}, [])
	return (
		<div className='Login'>
			<div className='Login__content'>
				<div className='close-button'>
					<h2 className='Login__content--subheader'>
						<img src={PasswordIcon} alt='password-icon' />
						Password
					</h2>
				</div>
				<form className='Login__content--form' onSubmit={onSubmit}>
					<input
						type='password'
						name='password'
						placeholder='Enter Password'
						value={pass}
						onChange={e => setPass(e.target.value)}
					/>
					<button className='modal-button c-main-btn' onClick={() => {}}>
						SUBMIT
					</button>
				</form>
			</div>
			<ToastContainer />
		</div>
	)
}

export default Login

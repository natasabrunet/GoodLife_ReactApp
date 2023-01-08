import axios from './api'

export const getToken = () => {
	const authenticate = async () => {
		const params = {
			id: 0,
			email: 'admin@leadgen.com',
			password: '1234'
		}
		try {
			const { access_token } = await axios.post('/auth/login', params)
			localStorage.setItem('token', access_token)
			return access_token
		} catch (err) {
			console.log(err)
		}
	}
	let token = localStorage.getItem('token') ?? authenticate()
	return token
}

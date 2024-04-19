import axios from 'utils/api'
import { toast } from 'react-toastify'
import { setIsAuthenticated } from 'redux/slices/auth'
import { setEventInfo } from 'redux/slices/eventInfo'

const setActiveEvent = async (eventId, navigate) => {
	try {
		const { data } = await axios.put(`/apps/setActiveEvent/${eventId}`)
		navigate('/step0')
	} catch (err) {
		console.log(err)
		toast.error(err.response.data.message)
	}
}
export const sendPass = async (pass, dispatch, navigate) => {
	try {
		const { data } = await axios.get(`/apps/getEventInfo/${pass}`)
		dispatch(setEventInfo(data.data))
		dispatch(setIsAuthenticated(true))
		setActiveEvent(data.data.id, navigate)
	} catch (err) {
		console.log(err)
		toast.error(err.response.data.message)
	}
}

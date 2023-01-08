import { useForm } from 'hooks/useForm'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { setTeamLeadId } from 'redux/slices/report'
import { setTeamLeads } from 'redux/slices/teamLeads'
import axios from 'utils/api'
import './Step0.scss'

const Step0 = () => {
	const navigate = useNavigate()
	const eventInfo = useSelector(state => state.eventInfo)
	const teamLeads = useSelector(state => state.teamLeads)
	const dispatch = useDispatch()
	const initialTeamLeadState = {
		teamLead: ''
	}
	const { values, onChange, onSubmit } = useForm(initApp, initialTeamLeadState)
	function initApp() {
		dispatch(setTeamLeadId(Number(values.teamLead)))
		navigate('/step1')
	}
	useEffect(() => {
		const getTeamLeads = async () => {
			try {
				const { data } = await axios.get('/apps/getTeamLeads')
				dispatch(setTeamLeads(data.data))
			} catch (err) {
				console.log(err)
				toast.error(err.response.data.message)
			}
		}
		getTeamLeads()
	}, [])
	return (
		<div className='Step0'>
			<h1 className='Step0__header c-main-header'>Event Setup</h1>
			<h2 className='Step0__subheader'>Event Name</h2>
			<p className='Step0__info-text'>
				{eventInfo.name} - {eventInfo.start_date} to {eventInfo.end_date}
			</p>
			<h2 className='Step0__subheader'>Team Lead Name</h2>
			{teamLeads.length && (
				<form id='teamLead' onSubmit={onSubmit}>
					<select
						name='teamLead'
						className='Step0__info-text dropdown'
						value={values.teamLead}
						onChange={onChange}>
						<option>GoodLife Staff</option>
						{teamLeads.map(({ id, first_name, last_name }) => (
							<option key={id} value={id}>
								{first_name} {last_name}
							</option>
						))}
					</select>
				</form>
			)}
			<div className='Step0__start-btn'>
				<button className='c-main-btn' type='submit' form='teamLead'>
					START
				</button>
			</div>
			<ToastContainer />
		</div>
	)
}

export default Step0

import Layout from 'components/Layout/Layout'
import { useForm } from 'hooks/useForm'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { setIsAuthenticated } from 'redux/slices/auth'
import { resetEventInfoSlice } from 'redux/slices/eventInfo'
import {
	resetReportSlice,
	setLeadsCount,
	setReportData
} from 'redux/slices/report'
import { resetTeamLeadsSlice } from 'redux/slices/teamLeads'
import { resetUserSlice } from 'redux/slices/user'
import axios from 'utils/api'
import './Settings.scss'

const Settings = () => {
	const dispatch = useDispatch()
	const report = useSelector(state => state.report)
	const eventInfo = useSelector(state => state.eventInfo)
	const initialReportState = {
		weather: report.weather,
		highlights: report.highlights,
		challenges: report.challenges,
		inventory: report.inventory,
		attendance: report.attendance,
		notes: report.notes
	}
	const { values, onChange, onSubmit, reset } = useForm(
		closeReport,
		initialReportState
	)
	const sendReport = async () => {
		try {
			const { data } = await axios.post('/apps/addClosingReport', {
				id: 0, // ASK ABOUT THIS
				name: eventInfo.name,
				event_id: eventInfo.id,
				teamlead_id: values.teamlead_id,
				weather: values.weather,
				highlights: values.highlights,
				challenges: values.challenges,
				inventory: values.inventory,
				attendance: values.attendance,
				notes: values.notes,
				club_event: values.club_event // ASK ABOUT THIS
			})
			dispatch(resetEventInfoSlice())
			dispatch(resetReportSlice())
			dispatch(resetTeamLeadsSlice())
			dispatch(resetUserSlice())
			dispatch(setIsAuthenticated(false))
		} catch (err) {
			console.log(err)
			toast.error(err.response.data.message)
		}
	}
	function closeReport() {
		dispatch(setReportData(values))
		sendReport()
	}
	useEffect(() => {
		const getNumberOfLeads = async () => {
			try {
				const { data } = await axios.get(
					`/apps/getNumberLeads/${eventInfo.password}`
				)
				dispatch(setLeadsCount(data.NumberOfLeads))
			} catch (err) {
				console.log(err)
				toast.error(err.response.data.message)
			}
		}
		getNumberOfLeads()
	}, [])
	return (
		<Layout isPagination={false}>
			<div className='Settings'>
				<h1 className='Setting__header c-main-header'>Closing Report</h1>
				<div className='Settings__info-text'>
					<span>Number of Leads Generated</span>
					<span>{report.leads_count}</span>
				</div>
				<form
					id='closing-report'
					onSubmit={onSubmit}
					className='Settings__form'>
					<div className='Settings__textbox'>
						<h2 className='Settings__textbox--header'>Weather</h2>
						<textarea
							className='Settings__textbox--textarea'
							name='weather'
							value={values.weather}
							rows={4}
							onChange={onChange}
						/>
					</div>
					<div className='Settings__textbox'>
						<h2 className='Settings__textbox--header'>Highlights</h2>
						<textarea
							className='Settings__textbox--textarea'
							name='highlights'
							value={values.highlights}
							rows={4}
							onChange={onChange}
						/>
					</div>
					<div className='Settings__textbox'>
						<h2 className='Settings__textbox--header'>
							Challenges & Learnings
						</h2>
						<textarea
							className='Settings__textbox--textarea'
							name='challenges'
							value={values.challenges}
							rows={4}
							onChange={onChange}
						/>
					</div>
					<div className='Settings__textbox'>
						<h2 className='Settings__textbox--header'>
							Premium Inventory remaining
						</h2>
						<textarea
							className='Settings__textbox--textarea'
							name='inventory'
							value={values.inventory}
							rows={4}
							onChange={onChange}
						/>
					</div>
					<div className='Settings__textbox'>
						<h2 className='Settings__textbox--header'>
							Estimated Event Attendance
						</h2>
						<textarea
							className='Settings__textbox--textarea'
							name='attendance'
							value={values.attendance}
							rows={4}
							onChange={onChange}
						/>
					</div>
					<div className='Settings__textbox'>
						<h2 className='Settings__textbox--header'>Notes</h2>
						<textarea
							className='Settings__textbox--textarea'
							name='notes'
							value={values.notes}
							rows={4}
							onChange={onChange}
						/>
					</div>
				</form>
				<div className='Settings__submit-btn'>
					<button className='c-main-btn' type='submit' form='closing-report'>
						SUBMIT
					</button>
				</div>
				<ToastContainer />
			</div>
		</Layout>
	)
}

export default Settings

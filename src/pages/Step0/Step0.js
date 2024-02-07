import HomeBanner from 'components/icons/HomeBanner'
import Layout from 'components/Layout/Layout'
import { useForm } from 'hooks/useForm'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { setTeamLeadId } from 'redux/slices/report'
import { setTeamLeads } from 'redux/slices/teamLeads'
import axios from 'utils/api'
import './Step0.scss'
import ThatsIcon from 'assets/images/thatsIcon.svg'
import BrokenGoodLife from 'assets/images/brokenGoodLife.svg'
import { setLang } from 'redux/slices/lang'

const Step0 = () => {
	const [langIsEnglish, setLangIsEnglish] = useState(true)
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
		dispatch(setLang(langIsEnglish ? 'en' : 'fr'))
	}, [langIsEnglish])
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
		<Layout isHome={true} info={false} setting={false}>
			<div className='Step0'>
				<div className='content'>
					<h1>
						ENTER FOR YOUR CHANCE TO WIN A TORONTO RAPTORS PRIZE PACK consisting
						of:
					</h1>
					<h4>
						A pair of Raptors tickets, a Raptors jersey, a $50 Real Sports gift
						card, and a one-year GoodLife all-access Performance Membership
						valued at $1500.
					</h4>
					<Link to={'/step1'}>ENTER NOW</Link>
				</div>
				<p>
					*No purchase necessary to enter the Contest. Contest begins February
					12, 2024 and ends on February 12, 2024. Contest open to attendees of
					the Toronto Raptors game, other than those who reside in the province
					of Quebec, who are not employees of GoodLife Fitness Centres Inc. or
					Influence Retail Services Inc. To participate, complete the on-screen
					instructions via iPad or your mobile device at the GoodLife Activation
					on the concourse of Scotiabank Arena. The names of all valid
					participants will be entered into a Grand Prize draw for a chance to
					win 1 MLSE Prize Pack with an approximate retail value of $1500.00
					CAD. Grand Prize Draw will take place on Thursday, February 15th, 2024
					and the Winner will be contacted on that date. Other conditions apply.
					Visit www.GLMembership.ca for more details and for full rules and
					regulations. This Contest is administered by Influence Retail Services
					Inc. who retains sole responsibility of the Contest.
				</p>
			</div>
		</Layout>
	)
}

export default Step0

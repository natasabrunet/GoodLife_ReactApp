import HomeBanner from 'components/icons/HomeBanner'
import Layout from 'components/Layout/Layout'
import { useForm } from 'hooks/useForm'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { setTeamLeadId } from 'redux/slices/report'
import { setTeamLeads } from 'redux/slices/teamLeads'
import axios from 'utils/api'
import './Step0.scss'
import dress from 'assets/images/dress.png'

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
		<Layout isHome={true} info={false} setting={false}>
			<div className='Step0'>
				<div className='banner'>
					<HomeBanner />
				</div>

				<div className='dress_content'>
					<div>
						<h1>WIN $10,000</h1>
						<h2>IN PERSONAL TRAINING</h2>
						<h6>
							PLUS MLSE GRAND PRIZE PACKS (Includes: 1 Year GoodLife
							Memberships, Game Tickets, Real Sports Gift Cards and Jerseys)
						</h6>
					</div>
					<img src={dress} />
				</div>

				<Link to={"/step1"}>ENTER NOW</Link>
				<p>
					*No purchase necessary to enter the Contest. Contest begins January
					10, 2023 and ends on December 31, 2023. Contest open to residents of
					Canada other than Quebec who are not employees of GoodLife Fitness
					Centres Inc. or Influence Retail Services Inc. To participate,
					complete the on-screen instructions via iPad at select GoodLife
					sponsored events or go to www.GLMembership.ca to complete the Entry
					Form. The names of all valid participants will be entered into a Grand
					Prize draw for a chance to win 2, 1-year ‘All Club including Group
					Fitness’ Memberships to GoodLife Fitness with an approximate retail
					value of $1,000, as well as GoodLife personal training sessions valued
					at $10,000 CAD. Grand Prize Draw will take place on January 5, 2024
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

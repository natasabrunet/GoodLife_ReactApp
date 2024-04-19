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
import ThatsTheLogo from 'assets/images/leafs/thatsthe.png';
import GoodLifeLogo from 'assets/images/leafs/goodlife.png';
import SignatureLogo from 'assets/images/leafs/signature.png';

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
				<div className="thats-the-logo">
				<img src={ThatsTheLogo} alt="That's The" />
				</div>
				<div className='content'>
					<h1>
					YOU COULD WIN $10,000 IN PERSONAL TRAINING
					</h1>
					<div className="signature-logo">
				<img src={SignatureLogo} alt="Signature" />
				</div>
					<h4>
					Prize includes TWO 1-year GoodLife Fitness gym memberships.
					</h4>
					<Link to={'/step1'}>ENTER NOW</Link>
				</div>
				<div className="goodlife-logo">
				<img src={GoodLifeLogo} alt="Good Life" />
				</div>
				<p>
				No purchase necessary to enter the Contest. Contest begins on April 26, 2024 and ends of October 19, 2024. Contest open to those who attend any of the Lead Gen activations being conducted throughout Canada, other than those who reside in the province of Quebec and who are not employees of GoodLife Fitness Centres Inc. or Influence Retail Services Inc. To participate, complete the on-screen instructions via iPad or on your own mobile device via the on-site QR code at the GoodLife booth. The names of all valid participants will be entered into a Grand Prize draw for the chance to win a 1-year GoodLife Fitness ‘Performance’ Membership and a $10,000 personal training package. Approximate retail value of $11,500 CAD. Grand Prize draw will take place on Monday, October 28, 2024 and the Winner will be contacted on that date. Other conditions apply. Visit www.GLMembership.ca for more details and for full Rules and Regulations. This contest is administered by Influence Retail Services Inc. who retains sole responsibility of the Contest.
				</p>
			</div>
		</Layout>
	)
}

export default Step0

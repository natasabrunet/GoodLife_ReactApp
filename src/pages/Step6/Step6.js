import { useNavigate } from 'react-router-dom'
import './Step6.scss'
import { useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'
import Layout from 'components/Layout/Layout'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'

const Step6 = () => {
	const navigate = useNavigate()
	const lang = useSelector(state => state.lang)
	const [status, setStatus] = useState('known')
	const putFurtherValues = async () => {
		const user = localStorage.getItem('persist:root')
		const userInfo = await JSON.parse(user)
		const { id, fitnessGoal } = await JSON.parse(userInfo.user)
		if (status === 'known') {
			toast('please select one of the status')
			return
		}

		try {
			const { data } = await axios.put('/apps/completeLeadRegister', {
				id,
				approx_value: status ? 'Yes' : 'No',
				// female_gyms: isFemale ? 'Yes' : 'No',
				goal: fitnessGoal,
				// approx_value: isValued ? 'Yes' : 'No',
				env: 'App'
			})
			navigate('/step6')
		} catch (err) {
			console.log(err)
			toast(err.response.data.message)
		}
	}
	return (
		<Layout setting={false} info={false} prev={() => navigate('/step4')} next={() => putFurtherValues()}>
			<div style={{maxWidth:"500px",margin:"auto"}} className='Step2'>
				<h1
					dangerouslySetInnerHTML={{ __html: texts[lang].step6.header }}
					className='Step2__header c-main-header'></h1>
				<div className='Step2__options'>
					<div
						className={`Step2__options--option c-main-option ${
							status && 'active'
						}`}
						onClick={() => setStatus(true)}>
						{lang === 'en' ? 'YES' : 'OUI'}
					</div>
					<div
						className={`Step2__options--option c-main-option ${
							!status && 'active'
						}`}
						onClick={() => setStatus(false)}>
						{lang === 'en' ? 'NO' : 'NON'}
					</div>
				</div>
			</div>
			<ToastContainer />
		</Layout>
	)
}

export default Step6

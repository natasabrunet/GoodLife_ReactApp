import { useNavigate } from 'react-router-dom'
import './Step6.scss'
import { useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'
import axios from 'utils/api'
import { useEffect } from 'react'

const Step6 = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user)
	const lang = useSelector(state => state.lang)
	const sendEmail = async () => {
		try {
			const data = await axios.get(`/apps/sendEmail/${user.id}`)
			console.log('email was sent successfully')
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		sendEmail()
	}, [])
	return (
		<div className='Step6'>
			<h1 className='Step6__header c-main-header'>
				{texts[lang].step6.header}
			</h1>
			<h3 className='Step6__subheader'>
				<b>{texts[lang].step6.boldLine1}</b> {texts[lang].step6.line2}
			</h3>
			<h3 className='Step6__subheader'>
				<b>{texts[lang].step6.boldLine3}</b>
			</h3>
			<div className='Step6__buttons'>
				<button className='c-main-btn' onClick={() => navigate('/step7')}>
					{texts[lang].step6.button}
				</button>
			</div>
		</div>
	)
}

export default Step6

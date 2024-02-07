import { Link, useNavigate } from 'react-router-dom'
import './Step7.scss'
import { useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'
import axios from 'utils/api'
import { useEffect } from 'react'
import Layout from 'components/Layout/Layout'

const Step7 = () => {
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
		<Layout isPagination={false} noPagintaionButton={false}>
			<div className='Step6'>
				<h1 className='Step6__header c-main-header'>
					{texts[lang].step7.header}
				</h1>
				<h3 className='Step6__subheader'>
					{/* <b>{texts[lang].step7.boldLine1}</b> */}
					{texts[lang].step7.boldLine1} {texts[lang].step7.line2}
				</h3>
				<h3 className='Step6__subheader'>
					{/* <b>{texts[lang].step7.boldLine3}</b> */}
					{texts[lang].step7.boldLine3}
				</h3>
				<div className='Step6__buttons'>
					<Link
						to={'/step7'}
						className='c-main-btn'
						onClick={() => navigate('/step7')}>
						{texts[lang].step7.button}
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export default Step7

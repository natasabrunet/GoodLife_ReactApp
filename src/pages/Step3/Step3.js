import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsMember } from 'redux/slices/user'
import './Step3.scss'
import { useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'
import Layout from 'components/Layout/Layout'

const Step3 = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const dispatchHandler = value => {
		dispatch(setIsMember(value))
		navigate('/step3')
	}
	const lang = useSelector(state => state.lang)
	return (
		<Layout prev={() => navigate('/step1')}>
			<div style={{ maxWidth: '500px', margin: 'auto' }} className='Step3'>
				<h1 className='Step3__header c-main-header'>
					{texts[lang].step3.header}
				</h1>
				<div className='Step3__options'>
					<div
						className='Step3__options--option c-main-option'
						onClick={() => dispatchHandler(true)}>
						{lang === 'en' ? 'YES' : 'OUI'}
					</div>
					<div
						className='Step3__options--option c-main-option'
						onClick={() => dispatchHandler(false)}>
						{lang === 'en' ? 'NO' : 'NON'}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Step3

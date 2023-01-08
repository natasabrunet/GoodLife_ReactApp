import { useNavigate } from 'react-router-dom'
import './Step2.scss'
import { useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'

const Step2 = () => {
	const navigate = useNavigate()
	const lang = useSelector(state => state.lang)
	return (
		<div className='Step2'>
			<h1 className='Step2__header c-main-header'>
				{texts[lang].step2.header}
			</h1>
			<div className='Step2__options'>
				<div
					className='Step2__options--option c-main-option'
					onClick={() => navigate('/step3')}>
					{lang === 'en' ? 'YES' : 'OUI'}
				</div>
				<div
					className='Step2__options--option c-main-option'
					onClick={() => navigate('/step1')}>
					{lang === 'en' ? 'NO' : 'NON'}
				</div>
			</div>
		</div>
	)
}

export default Step2

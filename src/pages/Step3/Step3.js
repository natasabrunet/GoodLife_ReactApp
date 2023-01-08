import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsMember } from 'redux/slices/user'
import './Step3.scss'
import { useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'

const Step3 = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const dispatchHandler = value => {
		dispatch(setIsMember(value))
		navigate('/step4')
	}
	const lang = useSelector(state => state.lang)
	return (
		<div className='Step3'>
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
			<div className='Step3__buttons'>
				<button className='c-main-btn' onClick={() => navigate('/step2')}>
					<span className='prev-arrow'>&larr;</span>{' '}
					{lang === 'en' ? 'BACK' : 'RETOUR'}
				</button>
			</div>
		</div>
	)
}

export default Step3

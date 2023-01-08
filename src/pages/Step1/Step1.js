import { useNavigate } from 'react-router-dom'
import HeroImage from 'assets/images/step1.png'
import HeroImageFr from 'assets/images/step1-fr.png'
import './Step1.scss'
import { useDispatch, useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'
import Toggle from 'react-toggle'
import { setLang } from 'redux/slices/lang'

const Step1 = () => {
	const navigate = useNavigate()
	const lang = useSelector(state => state.lang)
	const eventInfo = useSelector(state => state.eventInfo)
	const dispatch = useDispatch()
	const onChange = e => dispatch(setLang(lang === 'en' ? 'fr' : 'en'))
	const YesIcon = () => <div className='toggle-label'>EN</div>
	const NoIcon = () => <div className='toggle-label'>FR</div>
	return (
		<div className='Step1'>
			<div className='Step1__lang-toggle'>
				<Toggle
					icons={{
						checked: <YesIcon />,
						unchecked: <NoIcon />
					}}
					defaultChecked={lang === 'en' ? true : false}
					onChange={onChange}
				/>
			</div>
			{lang === 'en' ? (
				<img className='Step1__hero-image' src={HeroImage} alt='hero image' />
			) : (
				<img className='Step1__hero-image' src={HeroImageFr} alt='hero image' />
			)}
			<button
				className='Step1__next-btn c-main-btn'
				onClick={() => navigate('/step2')}>
				{texts[lang].step1.button}
			</button>
		</div>
	)
}

export default Step1

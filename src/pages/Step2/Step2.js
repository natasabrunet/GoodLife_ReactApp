import { useNavigate } from 'react-router-dom'
import './Step2.scss'
import { useSelector } from 'react-redux'
import { texts } from 'utils/localizedTexts'
import Layout from 'components/Layout/Layout'

const Step2 = () => {
	const navigate = useNavigate()
	const lang = useSelector(state => state.lang)
	return (
		<Layout>
			<div className='Step2'>
				<h1 className='Step2__header c-main-header'>
					{texts[lang].step2.header}
				</h1>
				<div className='Step2__options'>
					<div
						className='Step2__options--option c-main-option'
						onClick={() => navigate('/step2')}>
						{lang === 'en' ? 'YES' : 'OUI'}
					</div>
					<div
						className='Step2__options--option c-main-option'
						onClick={() => navigate('/step0')}>
						{lang === 'en' ? 'NO' : 'NON'}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Step2

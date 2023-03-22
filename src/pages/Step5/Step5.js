import { useNavigate } from 'react-router-dom'
import './Step5.scss'
import ReactSwipe from 'react-swipe'
import { useDispatch, useSelector } from 'react-redux'
import { setFitnessGoal, setIsFemale, setIsValued } from 'redux/slices/user'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'utils/api'
import { texts } from 'utils/localizedTexts'
import Layout from 'components/Layout/Layout'

const Step5 = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const lang = useSelector(state => state.lang)
	const { fitnessGoal } = useSelector(state => state.user)

	const [isSubmittable, setIsSubmittable] = useState(false)
	let reactSwipeEl
	const isFemaleHandler = value => {
		dispatch(setIsFemale(value))
		reactSwipeEl.next()
	}
	const fitnessGoalHandler = value => {
		dispatch(setFitnessGoal(value))
	}
	const isValuedHandler = value => {
		dispatch(setIsValued(value))
		setIsSubmittable(true)
	}

	const nextStep = async () => {
		const user = localStorage.getItem('persist:root')
		const userInfo = await JSON.parse(user)
		const { fitnessGoal } = await JSON.parse(userInfo.user)
		if (fitnessGoal === '' || !fitnessGoal) {
			toast('please select one of the fitness Goal')
		} else {
			navigate('/step5')
		}
	}

	return (
		<Layout setting={false} info={false} prev={() => navigate('/step4')} next={() => nextStep()}>
			<div className='Step5'>
				{/* <ReactSwipe
					className='carousel'
					swipeOptions={{
						continuous: false,
						startSlide: isSubmittable ? 2 : 0,
						callback: slideNumber => {}
					}}
					ref={el => (reactSwipeEl = el)}>
					<div>
						<h1 className='Step5__header c-main-header'>
							{texts[lang].step5.womenHeader}
						</h1>
						<div className='Step5__options'>
							<div
								className={`Step5__options--option c-main-option`}
								onClick={() => isFemaleHandler(true)}>
								{lang === 'en' ? 'YES' : 'OUI'}
							</div>
							<div
								className='Step5__options--option c-main-option'
								onClick={() => isFemaleHandler(false)}>
								{lang === 'en' ? 'NO' : 'NON'}
							</div>
						</div>
					</div> */}
				<div>
					<h1 className='Step5__header c-main-header'>
						{texts[lang].step5.goals.header}
					</h1>
					<div className='Step5__options'>
						<div
							className={`Step5__options--option c-main-option sm ${
								fitnessGoal === 'INCREASE ENERGY' && 'active'
							}`}
							onClick={() => fitnessGoalHandler('INCREASE ENERGY')}>
							{texts[lang].step5.goals.energy}
						</div>
						<div
							className={`Step5__options--option c-main-option sm ${
								fitnessGoal === 'INCREASE STRENGTH' && 'active'
							}`}
							onClick={() => fitnessGoalHandler('INCREASE STRENGTH')}>
							{texts[lang].step5.goals.strength}
						</div>
						<div
							className={`Step5__options--option c-main-option sm ${
								fitnessGoal === 'LOSE WEIGHT' && 'active'
							}`}
							onClick={() => fitnessGoalHandler('LOSE WEIGHT')}>
							{texts[lang].step5.goals.weight}
						</div>
						<div
							className={`Step5__options--option c-main-option sm ${
								fitnessGoal === 'ALL OF THE ABOVE' && 'active'
							}`}
							onClick={() => fitnessGoalHandler('ALL OF THE ABOVE')}>
							{texts[lang].step5.goals.all}
						</div>
					</div>
				</div>
				{/* <div>
						<h1 className='Step5__header c-main-header'>
							{texts[lang].step5.complimentary}
						</h1>
						<div className='Step5__options'>
							<div
								className='Step5__options--option c-main-option'
								onClick={() => isValuedHandler(true)}>
								{lang === 'en' ? 'YES' : 'OUI'}
							</div>
							<div
								className='Step5__options--option c-main-option'
								onClick={() => isValuedHandler(false)}>
								{lang === 'en' ? 'NO' : 'NON'}
							</div>
						</div>
					</div>
				</ReactSwipe> */}
				{/* <div className='Step5__buttons'>
					<button className='c-main-btn' onClick={() => navigate('/step4')}>
						<span className='prev-arrow'>&larr;</span>{' '}
						{lang === 'en' ? 'BACK' : 'RETOUR'}
					</button>
					<button
						className={`c-main-btn hide ${isSubmittable && 'show'}`}
						onClick={putFurtherValues}>
						{lang === 'en' ? 'DONE' : 'TERMINÉ'}{' '}
						<span className='next-arrow'>&rarr;</span>
					</button>
				</div> */}
				<ToastContainer />
			</div>
		</Layout>
	)
}

export default Step5

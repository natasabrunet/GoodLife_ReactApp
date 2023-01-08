import './Step8.scss'
import cover from 'assets/images/cover.png'
import ScratchMe from 'react-scratch-me'
import { useWindowSize } from 'hooks/useWindowSize'
import Confetti from 'react-confetti'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { resetUserSlice, setPrize } from 'redux/slices/user'
import CloseModal from 'assets/images/close-modal.svg'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'utils/api'
import { texts } from 'utils/localizedTexts'
import Layout from 'components/Layout/Layout'

const Step8 = () => {
	const navigate = useNavigate()
	const lang = useSelector(state => state.lang)
	const { id } = useSelector(state => state.user)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const dispatch = useDispatch()
	const { prizes } = useSelector(state => state.eventInfo)
	const { prize } = useSelector(state => state.user)
	const randomPic = length => Math.floor(Math.random() * length)
	const { width, height } = useWindowSize()
	const [completed, setCompleted] = useState(false)
	const onCompleted = () => {
		setCompleted(true)
		setTimeout(() => {
			setModalIsOpen(true)
		}, 3501)
	}
	const setRandomPrize = async img => {
		try {
			const { data } = await axios.put(`/apps/setPrizeSpent/${img.id}/${id}`)
			dispatch(setPrize(img))
		} catch (err) {
			console.log(err)
			toast.error(err)
		}
	}
	useEffect(() => {
		if (prizes.length) {
			const randomIndex = randomPic(prizes.length)
			const randomImage = prizes[randomIndex]
			setRandomPrize(randomImage)
		}
		return () => {}
	}, [prizes])

	const prizeClaimHandler = () => {
		dispatch(resetUserSlice())
		navigate('/step1')
	}

	return (
		<Layout>
			<div className='Step7'>
				<h1
					dangerouslySetInnerHTML={{
						__html: completed
							? `${texts[lang].step8.wonHeader} ${
									lang === 'en' ? prize.name_en : prize.name_fr
							  }!`
							: texts[lang].step8.scratchHeader
					}}
					className='Step7__header c-main-header'></h1>
				{completed && (
					<Confetti
						width={width}
						height={height}
						numberOfPieces={1000}
						recycle={false}
						onConfettiComplete={() => {}}
					/>
				)}
				{prize && (
					<div className='scratch_me'>
						<ScratchMe
							width={630}
							height={465}
							foregroundImageSrc={cover}
							backgroundImageSrc={prize.image}
							strokeWidth={45}
							onCompleted={onCompleted}
							completedAt={55}
						/>
					</div>
				)}
				{modalIsOpen && (
					<div className='Step7__prize-modal'>
						<div className='Step7__prize-modal--content'>
							<div className='close-button'>
								<img
									src={CloseModal}
									alt='close modal'
									onClick={prizeClaimHandler}
								/>
							</div>
							<h1 className='modal-header c-main-header'>
								{texts[lang].step8.claimHeader}
							</h1>
							<h2 className='modal-subheader'>
								{texts[lang].step8.claimSubheader}
							</h2>
							<p className='modal-paragraph'>{texts[lang].step8.claimText}</p>
							<button
								className='modal-button c-main-btn'
								onClick={prizeClaimHandler}>
								{texts[lang].step8.claimButton}
							</button>
						</div>
					</div>
				)}
				<ToastContainer />
			</div>
		</Layout>
	)
}

export default Step8

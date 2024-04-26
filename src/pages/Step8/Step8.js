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
import ScratchCard from 'react-scratchcard-v2'

const Step8 = () => {
	const navigate = useNavigate()
	const lang = useSelector(state => state.lang)
	const { id } = useSelector(state => state.user)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [prize, setPrize] = useState({})
	const dispatch = useDispatch()
	const [width, height] = useWindowSize()
	const [completed, setCompleted] = useState(false)
	const onCompleted = () => {
		setCompleted(true)
		setTimeout(() => {
			setModalIsOpen(true)
		}, 3501)
	}
	useEffect(() => {
		getPrize(id)
	}, [])

	const getPrize = async _id => {
		try {
			const { data } = await axios.put(`/apps/lead-prize/${_id}`)
			setPrize(data?.data)
			console.log(data)
		} catch (err) {
			console.log(err)
			toast.error(err)
		}
	}

	const prizeClaimHandler = () => {
		dispatch(resetUserSlice())
		navigate('/step0')
	}

	//scratch area moving fixes
	useEffect(() => {
		const scratchArea = document.querySelector('.scratch_me');
	
		const handleTouchMove = (event) => {
		  event.preventDefault();
		};
		
		scratchArea.addEventListener('touchmove', handleTouchMove, { passive: false });
		
		const toggleBodyScroll = (disable) => {
			if (disable) {
			document.body.style.overflow = 'hidden'; 
			document.body.style.position = 'fixed'; 
			document.body.style.width = '100%'; 
			} else {
			document.body.style.removeProperty('overflow');
			document.body.style.removeProperty('position');
			document.body.style.removeProperty('width');
			}
		};
		
	 
		toggleBodyScroll(true);
	
		return () => { 
		  scratchArea.removeEventListener('touchmove', handleTouchMove);
		  toggleBodyScroll(false);
		};
	}, []);

	return (
		<Layout freeXPadding isPagination={false}>
			<div className='Step7'>
				<h1
					dangerouslySetInnerHTML={{
						__html: id
							? completed
								? `${texts[lang].step8.wonHeader} ${
										lang === 'en' ? prize.name_en : prize.name_fr
								  }!`
								: texts[lang].step8.scratchHeader
							: 'Please Fill the form to get your prize'
					}}
					className='Step7__header c-main-header'></h1>
				{/* {completed && (
					<Confetti
						width={width}
						height={height}
						numberOfPieces={1000}
						recycle={false}
						onConfettiComplete={() => {}}
					/>
				)} */}
				{prize && prize?.image && (
					<div className='scratch_me'>
						{/* <ScratchMe
							width={width > 550 ? 500 : width > 390 ? 280 : 240}
							height={width > 550 ? 465 : width > 390 ? 270 : 240}
							foregroundImageSrc={cover}
							backgroundImageSrc={prize.image}
							strokeWidth={45}
							onCompleted={onCompleted}
							completedAt={70}
						/> */}
						<ScratchCard
							width={
								width > 680 ? 500 : width > 550 ? 410 : width > 390 ? 280 : 240
							}
							height={
								width > 680 ? 465 : width > 550 ? 410 : width > 390 ? 270 : 240
							}
							image={cover}
							finishPercent={70}
							onComplete={onCompleted}>
							<div className='scratch_me_prize'>
								<img src={prize.image} alt='Prize' />
							</div>
						</ScratchCard>
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
							<div className='section_container'>
								<h1 className='modal-header c-main-header'>
									{texts[lang].step8.claimHeader}
								</h1>
								<h2 className='modal-subheader'>
									{texts[lang].step8.claimSubheader}
								</h2>
							</div>
							<div className='section_container'>
								<img
									src={prize.image}
									className='modal-prize-image'
									alt='Prize image'
								/>
								<h4 className='modal-prize-name'>
									{lang === 'en' ? prize.name_en : prize.name_fr}
								</h4>
							</div>
							<div className='section_container'>
								<p className='modal-paragraph'>{texts[lang].step8.claimText}</p>
								<button
									className='modal-button c-main-btn'
									onClick={prizeClaimHandler}>
									{texts[lang].step8.claimButton}
								</button>
							</div>
						</div>
					</div>
				)}
				<ToastContainer />
			</div>
		</Layout>
	)
}

export default Step8

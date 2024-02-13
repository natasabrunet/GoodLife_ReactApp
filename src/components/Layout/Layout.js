import './Layout.scss'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import CloseModal from 'assets/images/close-modal.svg'
import LogoIcon from 'components/icons/LogoIcon'
import { Link } from 'react-router-dom'
import InfoIcon from 'components/icons/InfoIcon'
import SettingIcon from 'components/icons/SettingIcon'
import lang from 'redux/slices/lang'
import ArrowIcon from 'components/icons/ArrowIcon'
import { useSelector } from 'react-redux'
import AngleArrow from 'components/icons/AngleArrow'
import Logo from 'assets/images/logo.svg'
import { useWindowSize } from 'hooks/useWindowSize'

const Layout = ({
	isHome = false,
	setting = true,
	info = true,
	next = false,
	prev = false,
	isPagination = true,
	children,
	noPagintaionButton = true,
	freeXPadding
}) => {
	const location = useLocation()
	const [toggleInfo, setToggleInfo] = useState(false)
	const navigate = useNavigate()
	const lang = useSelector(state => state.lang)
	const { width } = useWindowSize()

	useEffect(() => {
		if (location.pathname.includes('/step7')) {
			document.getElementById('main_body').style.overflow = 'hidden'
			document.getElementsByTagName('html')[0].style.overflow = 'hidden'
		} else {
			document.getElementById('main_body').style.overflow = 'unset'
			document.getElementsByTagName('html')[0].style.overflow = 'unset'
		}
		return () => {
			document.getElementById('main_body').style.overflow = 'unset'
			document.getElementsByTagName('html')[0].style.overflow = 'unset'
		}
	}, [location.pathname])

	return (
		<div className={`Layout ${isHome && 'Layout_landing'}`}>
			<header className='Layout__header'>
				{info && width > 550 ? (
					<button onClick={() => setToggleInfo(true)}>
						<InfoIcon />
					</button>
				) : (
					<span></span>
				)}
				{!isHome && (
					<Link to={'/step1'} className='logo'>
						<img src={Logo} alt='goodlife fitness' />
					</Link>
				)}

				{setting && width > 550 ? (
					<button onClick={() => navigate('/settings')}>
						<SettingIcon />
					</button>
				) : (
					<span></span>
				)}
			</header>
			{isHome ? (
				<>{children}</>
			) : (
				<>
					<div className={`Layout__content  ${freeXPadding && 'px-0'}`}>
						{children}
					</div>
					{noPagintaionButton && (
						<div className='btn__pagination'>
							{prev ? (
								<button className='c-main-btn' onClick={prev}>
									<span className='prev-arrow'>
										<AngleArrow />
									</span>{' '}
									{lang === 'en' ? 'BACK' : 'RETOUR'}
								</button>
							) : (
								<span></span>
							)}
							{isPagination && (
								<ul>
									{[1, 1, 1, 1, 1].map((item, index) => (
										<li
											className={
												Number(location.pathname.split('p')[1]) === index + 1 &&
												'active'
											}></li>
									))}
								</ul>
							)}

							{next ? (
								<button className='c-main-btn' onClick={next}>
									{lang === 'en' ? 'NEXT' : 'RETOUR'}
									<span className='next-arrow'>
										<AngleArrow />
									</span>{' '}
								</button>
							) : (
								<span></span>
							)}
						</div>
					)}
				</>
			)}
			{toggleInfo && (
				<div className='Layout__prize-modal'>
					<div className='Layout__prize-modal--content'>
						<div className='close-button'>
							<h2 className='subheader'>
								<InfoIcon />
								Information
							</h2>
							<img
								src={CloseModal}
								alt='close modal'
								onClick={() => setToggleInfo(false)}
							/>
						</div>
						<button
							className='modal-button c-main-btn'
							onClick={() => {
								setToggleInfo(false)
								navigate('/step3')
							}}>
							LEAD FORM
						</button>
						<button
							className='modal-button c-main-btn'
							onClick={() => {
								setToggleInfo(false)
								navigate('/step7')
							}}>
							SCRATCHER
						</button>
						<button
							className='modal-button c-main-btn'
							onClick={() => {
								setToggleInfo(false)
								navigate('/settings')
							}}>
							CLOSING REPORT
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Layout

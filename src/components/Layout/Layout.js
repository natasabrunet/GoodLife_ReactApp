import './Layout.scss'
import Logo from 'assets/images/logo.svg'
import SettingsIcon from 'assets/images/settings-icon.svg'
import InfoIcon from 'assets/images/info-icon.svg'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import CloseModal from 'assets/images/close-modal.svg'

const Layout = ({ ChildComponent }) => {
	const [toggleInfo, setToggleInfo] = useState(false)
	const navigate = useNavigate()
	return (
		<div className='Layout'>
			<header className='Layout__header'>
				<img src={InfoIcon} alt='info' onClick={() => setToggleInfo(true)} />
				<img src={Logo} alt='logo' onClick={() => navigate('/step1')} />
				<img
					src={SettingsIcon}
					alt='settings'
					onClick={() => navigate('/settings')}
				/>
			</header>
			<div className='Layout__content'>
				<ChildComponent />
			</div>
			{toggleInfo && (
				<div className='Layout__prize-modal'>
					<div className='Layout__prize-modal--content'>
						<div className='close-button'>
							<h2 className='subheader'>
								<img src={InfoIcon} alt='info-icon' />
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
								navigate('/step4')
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

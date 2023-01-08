import React from 'react'

const InfoIcon = () => {
	return (
		<svg
			width='52'
			height='52'
			viewBox='0 0 52 52'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<rect width='52' height='52' rx='8' fill='white' />
			<circle cx='26' cy='26' r='14.8571' fill='black' />
			<path
				d='M24.2912 18.1602V21.4002H27.7312V18.1602H24.2912ZM24.3512 32.7202H27.6512V22.6402H24.3512V32.7202Z'
				fill='white'
			/>
		</svg>
	)
}

export default React.memo(InfoIcon)

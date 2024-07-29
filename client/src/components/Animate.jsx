import React from 'react';
import animation from '../assets/Animation.json';
import Lottie from 'react-lottie';

function Animate() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div>
			<Lottie options={defaultOptions} height={400} width={400} />
		</div>
	);
}

export default Animate;

import './Logo.scss'

function Logo({ img, onClick }) {
	return (
		<button className='logo_click' onClick={onClick}>
			<img className='logo' src={img} alt='Логотип'></img>
		</button>
	)
}

export default Logo

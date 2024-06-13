import './CardButton.scss'

function CardButton({ children, className, ...props }) {
	const cl = 'card-button' + (className ? ' journal-add' : '')
	return (
		<button {...props} className={cl}>
			{children}
		</button>
	)
}

export default CardButton

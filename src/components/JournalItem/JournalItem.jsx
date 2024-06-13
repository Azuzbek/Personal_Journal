import './JournalItem.scss'

function JournalItem({ title, text, date }) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date)
	return (
		<>
			<h2 className='journal-item__header'>{title}</h2>
			<h2 className='journal-item__body'>
				<div className='journal-item__date'>{formatedDate}</div>
				<div className='journal-item__text'>
					{text.length > 34 ? text.substring(0, 25) + '...' : text}
				</div>
			</h2>
		</>
	)
}

export default JournalItem

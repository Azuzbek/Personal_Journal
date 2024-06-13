import CardButton from '../CardButton/CardButton'
import './JournalAdd.scss'

function JournalAdd({ clearForm }) {
	return (
		<CardButton className='journal-add' onClick={clearForm}>
			<img className='plus' src='/plus.svg' alt=''></img>Новое воспоминание
		</CardButton>
	)
}

export default JournalAdd

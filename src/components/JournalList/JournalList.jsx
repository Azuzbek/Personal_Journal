import './JournalList.scss'
import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import { useContext } from 'react'
import { UserContext } from '../../context/user.context'

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext)
	const sortItems = (a, b) => {
		if (a.date > b.date) {
			return -1
		} else {
			return 1
		}
	}
	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>
	} else {
		return (
			<>
				{items
					.filter(el => el.userId === userId)
					.sort(sortItems)
					.map(el => (
						<CardButton key={el.id} onClick={() => setItem(el)}>
							<JournalItem
								title={el.title}
								text={el.post}
								date={el.date}
								post
							/>
						</CardButton>
					))}
			</>
		)
	}
}

export default JournalList

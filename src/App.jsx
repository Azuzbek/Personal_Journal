import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Body from './layouts/Body/Body'
import Header from './components/Header/Header'
import JournalAdd from './components/JournalAdd/JournalAdd'
import JournalList from './components/JournalList/JournalList'
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './components/hooks/use-localStorage'
import { UserContextProvidev } from './context/user.context'
import { useState } from 'react'
function mapItems(items) {
	if (!items) {
		return [] // Возвращаем пустой массив, если items не определен
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date),
	}))
}

function App() {
	const [items, setItems] = useLocalStorage('data')
	const [selectedItem, setSelectedItem] = useState(null)
	const deleteItem = id => {
		setItems([...items.filter(i => i.id != id)])
	}
	const addItem = item => {
		if (!item.id) {
			setItems([
				...mapItems(items),
				{
					...item,
					date: new Date(item.date),
					id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
				},
			])
		} else {
			setItems([
				...mapItems(items).map(i => {
					if (i.id === item.id) {
						return { ...item }
					}
					return i
				}),
			])
		}
	}
	return (
		<UserContextProvidev>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAdd clearForm={() => setSelectedItem(null)} />
					<JournalList
						items={mapItems(items)}
						setItem={setSelectedItem}
					></JournalList>
				</LeftPanel>
				<Body>
					<JournalForm
						onSubmit={addItem}
						onDelete={deleteItem}
						data={selectedItem}
					/>
				</Body>
			</div>
		</UserContextProvidev>
	)
}

export default App

import './SelectUser.scss'
import { useContext } from 'react'
import { UserContext } from '../../context/user.context'

function SelectUser() {
	const { userId, setUserId } = useContext(UserContext)
	const changeUser = e => {
		setUserId(Number(e.target.value))
	}

	return (
		<div className='custom-select'>
			<select
				className='select'
				name='user'
				id='user'
				value={userId}
				onChange={changeUser}
			>
				<option value='1'>Azuz</option>
				<option value='2'>NeAzuz</option>
			</select>
		</div>
	)
}

export default SelectUser

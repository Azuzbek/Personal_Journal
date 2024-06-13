import styles from './JournalForm.module.scss'
import ButtonS from '../ButtonS/ButtonS'
import { useContext, useEffect, useReducer, useRef } from 'react'
import cn from 'classnames'
import { INITIAL_STATE, formReducer } from './JournalForm.state'
import Input from '../Input/Input'
import { UserContext } from '../../context/user.context'

function JournalForm({ onSubmit, data, onDelete }) {
	const [formState, dispachForm] = useReducer(formReducer, INITIAL_STATE)
	const { isValid, isFormReadyToSubmit, values } = formState

	const titleRef = useRef()
	const dateRef = useRef()
	const postRef = useRef()

	const { userId } = useContext(UserContext)

	const focusError = isValid => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus()
				break
			case !isValid.date:
				dateRef.current.focus()
				break
			case !isValid.post:
				postRef.current.focus()
				break
		}
	}

	useEffect(() => {
		if (!data) {
			dispachForm({ type: 'CLEAR' })
			dispachForm({ type: 'SET_VALUE', payload: { userId } })
		}
		dispachForm({ type: 'SET_VALUE', payload: { ...data } })
	}, [data])
	useEffect(() => {
		if (!isValid.date || !isValid.post || isValid.post) {
			focusError(isValid)
			let timeOuteId = setTimeout(() => {
				dispachForm({ type: 'RESET_VALIDITY' })
			}, 2000)

			return () => {
				clearTimeout(timeOuteId)
			}
		}
	}, [isValid])

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values)
			dispachForm({ type: 'CLEAR' })
			dispachForm({ type: 'SET_VALUE', payload: { userId } })
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId])
	useEffect(() => {
		dispachForm({ type: 'SET_VALUE', payload: { userId } })
	}, [userId])
	const handleChange = e => {
		const { name, value } = e.target
		let newValue = value

		// Если изменяется поле даты, преобразуем строку в объект Date
		if (name === 'date') {
			newValue = new Date(value)
		}

		dispachForm({
			type: 'SET_VALUE',
			payload: { [name]: newValue },
		})
	}

	const addJournalItem = e => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const formProps = Object.fromEntries(formData)
		dispachForm({ type: 'SUBMIT', payload: formProps })
	}
	const deleteJournalItem = () => {
		onDelete(data.id)
		dispachForm({ type: 'CLEAR' })
		dispachForm({ type: 'SET_VALUE', payload: { userId } })
	}
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input
					type='text'
					isValid={isValid.title}
					name='title'
					ref={titleRef}
					onChange={handleChange}
					value={values.title}
					placeholder='Заголовок'
					what='title'
				/>

				{data?.id && (
					<button
						className={styles['delete']}
						type='button'
						onClick={() => deleteJournalItem(data.id)}
					>
						<img src='/Trash_Full.svg' alt='' />
					</button>
				)}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/Calendar_Days.svg' alt='' />
					<span>Дата</span>
				</label>
				<Input
					style={{
						WebkitAppearance: 'none',
					}}
					ref={dateRef}
					type='date'
					name='date'
					id='date'
					onChange={handleChange}
					value={values.date ? values.date.toISOString().slice(0, 10) : ''}
					isValid={isValid.date}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/Folder.svg' alt='' />
					<span>Метки</span>
				</label>
				<Input
					type='text'
					name='tag'
					id='tag'
					onChange={handleChange}
					value={values.tag}
					isValid={isValid.tag}
				/>
			</div>
			<textarea
				ref={postRef}
				name='post'
				cols='30'
				rows='10'
				onChange={handleChange}
				value={values.post}
				className={cn(styles['input-area'], {
					[styles['invalid']]: !isValid.post,
				})}
			></textarea>
			<ButtonS>Сохранить</ButtonS>
		</form>
	)
}

export default JournalForm

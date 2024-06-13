import { forwardRef } from 'react'
import styles from './Input.module.scss'
import cn from 'classnames'
const Input = forwardRef(function Input(
	{ className, isValid = true, what, ...props },
	ref
) {
	return (
		<input
			{...props}
			ref={ref}
			className={cn(className, styles['input'], {
				[styles['invalid']]: !isValid,
				[styles['input-title']]: what === 'title',
			})}
		/>
	)
})

export default Input

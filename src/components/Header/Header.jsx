import SelectUser from '../SelectUser/SelectUser'
import Logo from '../Logo/Logo'
import './Header.scss'
import { useState } from 'react'

const logos = ['/Logo.svg', '/logo_mini.svg']

function Header() {
	const [logoIndex, setLogoIndex] = useState(0)

	const changeLogo = () => {
		setLogoIndex(state => Number(!state))
		console.log(logos[0])
	}
	return (
		<>
			<Logo img={logos[logoIndex]} onClick={changeLogo} />
			<SelectUser />
		</>
	)
}

export default Header

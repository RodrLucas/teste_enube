import React from 'react'
import './styles.css'
import Logo from '../../assets/logo.png'

export default function Header() {
    return (
        <header className='container-title'>
            <img className='image-logo' src={Logo} alt='logo'/>
            <h1 className='title'>Cotações do Dólar</h1>
        </header>
    )
}
'use strict';

(() => {
    const passwordEye = document.querySelector('[data-password-eye]')
    const inputPassword = document.querySelector('[name="password"]')
    const state = { showPassword: false }
    
    const onPasswordEyeClick = () => {
        passwordEye.classList.toggle('slash')
        inputPassword.setAttribute('type', state.showPassword ? 'password' : 'text')
        state.showPassword = !state.showPassword
    }

    const setListeners = () => {
        passwordEye.addEventListener('click', onPasswordEyeClick)
    }

    const init = () => {
        setListeners()
    }

    init()

})()
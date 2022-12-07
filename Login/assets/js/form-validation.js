'use strict';

(() => {
    const form = document.querySelector('[data-form]')
    const progressBar = document.querySelector('[data-requirement-progressbar]')
    const fields = {}
    const requirements = {}
    const state = { passwordStrength: 0 }
    
    const styleProgressBar = () => {
        progressBar.style.width = `${state.passwordStrength}%`
        progressBar.dataset.percentage = state.passwordStrength
    }

    const showMessageError = (field, message) => {
        const { element, errorElement } = field
        element.classList.add('error')
        errorElement.style.display = 'block'
        errorElement.textContent = message
    }

    const hideMessageError = (field) => {
        const { element, errorElement } = field
        element.classList.remove('error')
        errorElement.style.display = 'none'
        errorElement.textContent = ''
    }

    const checkPasswordStregth = (requirementName, condition) => {
        if(condition) {
            state.passwordStrength += 25
            requirements[requirementName].classList.add('checked')
        } else {
            requirements[requirementName].classList.remove('checked')
        }
    }

    const validateRequiredFields = () => {
        let isInvalid = false
        for (const fieldKey in fields) {
            const field = fields[fieldKey]
            const { element, isRequired } = field
            if((!element.value || (fieldKey === 'terms' && !element.checked)) && isRequired) {
                isInvalid = true
                showMessageError(field, 'Este campo é obrigatório!')
            }
        }
        return isInvalid
    }

    const validatePasswordStrength = () => {
        let isInvalid = false
        const field = fields['password']
        if(state.passwordStrength < 100) {
            isInvalid = true
            showMessageError(field, 'Digte uma senha válida!')
        }
        return isInvalid
    }

    const validateEmail = () => {
        let isInvalid = false
        const field = fields['email']
        const { value } = field.element
        if(!value.match(/^[\w\.]+@\w+(\.\w+)+$/)) {
            isInvalid = true
            showMessageError(field, 'Digte um e-mail válido!')
        }
        return isInvalid
    }

    const onInputPasswordKeyup = (event) => {
        const { value } = event.target
        state.passwordStrength = 0
        checkPasswordStregth('lowerUpperCase', value.match(/[a-z]/) && value.match(/[A-Z]/))
        checkPasswordStregth('number', value.match(/[0-9]/))
        checkPasswordStregth('specialCharacter', value.match(/[!@#$%\^&*~)\[\]{}?\.(+=\._-]/))
        checkPasswordStregth('minCharacter', value.length >= 8)
        styleProgressBar()
    }

    const onInputFocus = (event) => {
        hideMessageError(fields[event.target.name])
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        if(validateRequiredFields()) return
        if(validateEmail()) return
        if(validatePasswordStrength()) return
        alert('Dados prontos para serem enviados!')
    }

    const setListeners = () => {
        form.addEventListener('submit', onFormSubmit)
        for (const fieldKey in fields) {
            const { element } = fields[fieldKey]
            element.addEventListener('focus', onInputFocus)
            if(fieldKey === 'password') element.addEventListener('keyup', onInputPasswordKeyup)
        }
    }

    const setRequirementItemsElements = () => {
        const requirementItemsElements = document.querySelectorAll('[data-requirement-item]')
        for (const requirementItem of requirementItemsElements) {
            const requirementName = requirementItem.dataset['requirementItem']
            requirements[requirementName] = requirementItem
        }
    }

    const setFieldElements = () => {
        const inputElements = document.querySelectorAll('[data-input]')
        for (const input of inputElements) {
            const inputName = input.getAttribute('name')
            fields[inputName] = {
                element: input,
                errorElement: input.parentElement.querySelector('[data-error-message]'),
                isRequired: input.hasAttribute('required')
            }
            input.removeAttribute('required')
        }
    }

    const init = () => {
        setFieldElements()
        setRequirementItemsElements()
        setListeners()
    }

    init()
})()



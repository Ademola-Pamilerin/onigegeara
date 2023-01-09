import React, { useState, useEffect } from 'react'
import validator from 'validator'
const useInput = (type, name, val) => {
    const [inputValue, setInputValue] = useState(val ? val : "")
    const [error, setError] = useState(null)
    const [errorFixMess, setErrorFixMess] = useState(null)
    const [focus, setFocus] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [touched, setTouched] = useState(false)
    const changed = (event) => {
        setFocus(true)
        setTouched(true)
        setInputValue(event.target.value.trim())
    }
    const focused = () => {
        setTouched(true)
        setFocus(true)
    }

    const blur = (event, strict = false) => {
        setFocus(false)
        setTouched(true)
        if (type === "email") {
            const isEmpty = validator.isEmpty(inputValue)
            const isEmail = validator.isEmail(inputValue)
            if (!isEmail && !isEmpty) {
                setHasError(true)
                setError("Value must be a valid Email")
                setErrorFixMess("Value must be in form name@domain.com")
            } else {
                setHasError(false)
                setError(null)
                setErrorFixMess(null)
            }
        } else if (type === "password") {
            const isEmpty = validator.isEmpty(inputValue)
            const isEmail = validator.isStrongPassword(inputValue)
            if (!isEmail && !isEmpty) {
                setHasError(true)
                setError("Password must be Strong Enough")
                setErrorFixMess("Please use a Stronger Password, containing a Capital Letter, Number and a special Character")
            } else {
                setHasError(false)
                setError(null)
                setErrorFixMess(null)
            }
        } else if (type === "text") {
            const isEmpty = validator.isEmpty(inputValue)
            const isAlpha = validator.isAlphanumeric(inputValue)
            if (!isEmpty && strict && isAlpha) {
                setHasError(true)
                setError(`${name} must be an Alphabet only`)
                setErrorFixMess(`${name}, please enter Alphabet only`)
            } else if (!strict && isEmpty) {
                setHasError(true)
                setError(`${name} field is required`)
                setErrorFixMess(`${name} field cannot be empty, please input`)
            }
            else {
                setHasError(false)
                setError(null)
                setErrorFixMess(null)
            }
        }
    }

    useEffect(
        () => {
            if (touched && !focus) {
                if (inputValue.trim().length < 1) {
                    setHasError(true)
                    setError("Value is Required")
                    setErrorFixMess("Please Provide a value in " + name + " field")
                }
                else {
                    setHasError(false)
                    setError(null)
                    setErrorFixMess(null)
                }
            }
            return () => {
                setHasError(false)
                setError(null)
                setErrorFixMess(null)
            }
        },
        [touched, inputValue, focus, name]
    )

    return {
        onChange: changed,
        onTouchStart: focused,
        onTouchend: blur,
        value: inputValue,
        errorMessage: error,
        fixError: errorFixMess,
        hasError,
        focus,
        touched
    }
}
export default useInput
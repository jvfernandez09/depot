import { useState, useEffect } from 'react'

const useForm = (callback, validateLogin) => {

  const [input, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors, isSubmitting, callback])

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    setErrors(validateLogin(input))
    setIsSubmitting(true)
  }

  const handleChange = (event) => {
    event.persist()
    setInputs(input => ({ ...input, [event.target.name]: event.target.value }))
  }

  return {
    handleChange,
    handleSubmit,
    input,
    errors,
  }
}

export default useForm;

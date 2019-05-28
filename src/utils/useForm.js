import { useState } from 'react'
import { isEmpty } from 'lodash'

const useForm = (callback, validateLogin) => {

  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    setErrors(validateLogin(inputs))
    setIsSubmitting(true)
    if(isEmpty(Object.keys(errors))){
      callback()
    }
    setIsSubmitting(false)
  }

  const handleChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  return {
    handleChange,
    handleSubmit,
    inputs,
    errors,
    isSubmitting
  }
}

export default useForm;

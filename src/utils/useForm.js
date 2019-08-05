import { useState } from 'react'
import { isEmpty } from 'lodash'

const useForm = (callback, validateForm) => {

  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    setErrors(validateForm(inputs))
    if(isEmpty(Object.keys(errors))){
      callback()
    }
  }

  const handleChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  return {
    handleChange,
    handleSubmit,
    inputs,
    errors
  }
}

export default useForm;

import { useState } from 'react';

const useModal = (callback) => {
  const [inputs, setInputs] = useState({})
  const [isShowing, setIsShowing] = useState(false)

  const initialState = () => {
    setInputs({})
  }

  function toggle() {
    setIsShowing(!isShowing)
  }

  const handleChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  const handleChangeSelect = (event, props) => {
    setInputs(inputs => ({ ...inputs, transactionType: props.props.value }))
  }

  const handleSubmit = (event) => {
    callback()
  }

  return {
    isShowing,
    toggle,
    handleChange,
    inputs,
    handleChangeSelect,
    handleSubmit,
    initialState
  }
};

export default useModal;

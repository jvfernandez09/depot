import { useState } from 'react';

const useModal = (callback) => {
  const [inputs, setInputs] = useState({})
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing);
  }

  const handleChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  const handleChangeSelect = (event, props) => {
    setInputs(inputs => ({ ...inputs, ['type']: props.props.value }))
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
    handleSubmit
  }
};

export default useModal;

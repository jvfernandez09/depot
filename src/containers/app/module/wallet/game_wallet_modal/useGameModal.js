import { useState } from 'react';

const useGameModal = (callback) => {
  const [inputs, setInputs] = useState({})
  const [isGameShowing, setIsGameShowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function gameToggle() {
    setIsGameShowing(!isGameShowing);
  }

  const handleChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  const handleChangeSelect = (event, props) => {
    setInputs(inputs => ({ ...inputs, type: props.props.value }))
  }

  const handleSubmit = (event) => {
    setIsLoading(true)
    callback()
    setIsLoading(false)
  }

  return {
    isGameShowing,
    gameToggle,
    handleChange,
    inputs,
    handleChangeSelect,
    handleSubmit,
    isLoading
  }
};

export default useGameModal;

import React, { useState } from "react";
import Button from 'components/button'

const ReactHook = () => {
  const [buttonText, setButtonText] = useState("Click me, please")

  function handleClick() {
    //setState
    return setButtonText("Thanks, been clicked!")
  }

  return (
    <Button onClick={handleClick}>{buttonText}</Button>
  )
}


export default ReactHook

import React from 'react'
import {ReactComponent as Logo} from 'assets/images/LOGO.svg'

import 'login/index.scss'

const ErrorContainer = () => {
  return(
    <>
      <div className='error-container'>
        <div className='content'>
          <div className='head'>
            <Logo className='logo' />
          </div>
        <p style={{ color: 'gold' }}>Token purchases are restricted for
        the following countries: USA, People's Republic of China,
        Singapore, Vietnam, Iran, North Korea, Syria, Sudan, Cuba, and Canada.
        </p>
        </div>
      </div>
    </>
  )
}

export default ErrorContainer

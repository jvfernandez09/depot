import React from 'react'
const ErrorContainer = () => {
  return(
    <>
      <div className='error-container'>
        <div className='content'>
          <p style={{ color: 'gold' }}>Token purchases are restricted for
          the following countries: USA, Iran, North Korea, Syria, Sudan and Cuba
          </p>
        </div>
      </div>
    </>
  )
}

export default ErrorContainer

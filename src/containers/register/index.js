import React  from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as StepOne }  from 'assets/images/stepOne.svg'
import { ReactComponent as StepTwo }  from 'assets/images/stepTwo.svg'
import { ReactComponent as StepThree }  from 'assets/images/stepThree.svg'
import { ReactComponent as Logo } from 'assets/images/LOGO-tokendepot.svg'
import { ReactComponent as GooglePlay } from 'assets/images/google-play.svg'
import { ReactComponent as ApplePlay } from 'assets/images/apple-play.svg'

import './index.scss'
const Register = () => {

  return (
    <>
      <div className='container body-layout -top'>
        <div className='item'>
          <Link to='/'>
            <Logo className='logo'/>
          </Link>
          <div className='register-container'>
            <div className='content-register width'>
              <div className='head-register'>
                <h1 className='title-register'>
                  CREATE YOUR ACCOUNT
                </h1>
                <h1 className='title-register'>
                  <span>USING</span>
                  <span className='highlight-register'> GAMEWORKS WALLET MOBILE APP</span>
                </h1>
                <div className='google-play'>
                  <GooglePlay onClick={() => window.open('https://play.google.com/store/apps/details?id=com.gameworksmobilewallet&hl=en','_blank')} />
                </div>
                <div className='apple-play'>
                  <ApplePlay onClick={() => window.open('https://apps.apple.com/ph/app/gameworks-mobile-wallet/id1484020853','_blank')} />
                </div>
                <div className='image'>
                  <StepOne />
                  <StepTwo />
                  <StepThree />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register

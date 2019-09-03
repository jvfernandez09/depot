import React  from 'react'
import { Link } from 'react-router-dom'

import stepOne from 'assets/images/stepOne.png'
import stepTwo from 'assets/images/stepTwo.png'
import stepThree from 'assets/images/stepThree.png'

import { ReactComponent as Logo } from 'assets/images/LOGO-tokendepot.svg'
import {ReactComponent as GooglePlay} from 'assets/images/google-play.svg'

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
                  CREATE ACCOUNT
                </h1>
                <h1 className='title-register'>
                  <span>USING</span>
                  <span className='highlight-register'> GAMEWORKS WALLET MOBILE APP</span>
                </h1>
                <div className='google-play'>
                  <GooglePlay onClick={() => window.open('https://play.google.com/store/apps/details?id=com.gameworksmobilewallet&hl=en','_blank')} />
                </div>
                <div className='sub'>
                  <img alt={stepOne} src={stepOne} />
                  <img alt={stepTwo} src={stepTwo} />
                  <img alt={stepThree} src={stepThree} />
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

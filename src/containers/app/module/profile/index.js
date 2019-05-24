import React, { Component } from 'react'

const ProfileContainer = () => {
  const data = { data: [{
      id: '1',
      firstName: 'Juan',
      lastName: 'Pablo'
    }]
  }

  return (
    <div>
    {data.data.map(item => (
      <div key={item.id}>
        <div> { item.firstName } </div>
        <div> { item.lastName } </div>
      </div>
    ))}
    </div>
  )
}

export default ProfileContainer

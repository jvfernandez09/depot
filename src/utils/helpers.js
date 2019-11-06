export const isLoggedIn = _ => {
  const timeStamp = localStorage.getItem('timeStamp')
  const timeToday = new Date().getTime()
  const elapse = timeToday - timeStamp
  const validity = 7200000

  return localStorage.getItem('AUTH_TOKEN') !== undefined && elapse < validity;
}

export const isGeolocation = async () => {
  const response = await fetch('https://ipapi.co/jsonp?callback=?')
  const responseJSON = await response.text()
  const match = responseJSON.match(/\?\((.*)\);/)

  return JSON.parse(match[1]).country_name
}


const getInitials = text => (
  text.substring(0,2).toUpperCase()
)


export default {
  getInitials
}

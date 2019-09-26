export const isLoggedIn = _ => {
  const timeStamp = localStorage.getItem('timeStamp')
  const timeToday = new Date().getTime()
  const elapse = timeToday - timeStamp
  const validity = 7200000

  return localStorage.getItem('AUTH_TOKEN') !== undefined && elapse < validity;
}

export const isGeolocation = async () => {
  const response = await fetch('http://ip-api.com/json')
  const responseJSON = await response.json()

  return responseJSON.country
}

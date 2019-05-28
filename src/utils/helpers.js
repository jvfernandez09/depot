export const isLoggedIn = _ => (
  window.localStorage.AUTH_TOKEN !== undefined
)

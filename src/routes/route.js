/**
 * 
 * @param {string} route 
 * @returns {boolean}
 */
export const navigateTo = ( route ) => {
  const songURL = new URL(route).pathname.split('/')[2]
  const windowURL = window.location.pathname.split('/')[2]

  if(songURL === windowURL) return true

  window.history.pushState({}, "", route)
  return false
}
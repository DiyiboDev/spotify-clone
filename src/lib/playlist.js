export const fetchPlaylists = async() => {
  
  try {
    const response = await fetch('http://localhost:3020/playlists')

    if(!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch(error) {    
    throw error
  }
  
}
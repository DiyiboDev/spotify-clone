import { Playlist } from "../playlists/models/playlist.model"

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

/**
 * 
 * @param {string} playlistId 
 * @returns {Promise<Playlist>|Error}
 */
export const fetchPlaylistById = async( playlistId = '2' ) => {

  try {
    const response = await fetch(`http://localhost:3020/playlists/${playlistId}`)

    if(!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch(error) {
    throw error
  }

}

export const fetchPlaylistSongById = async( playlistId ) => {

  try {
    const response = await fetch('https://localhost:3020/playlists')

    if(!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch(error) {
    throw error
  }

}
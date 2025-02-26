import { Playlist } from "../playlists/models/playlist.model"

const state = {
  playlist: [
    new Playlist('1', 1, 'Arcane', 'blue', '1.jpg', ['Arcane', 'League of Legends'])
  ]
}

/**
 * 
 * @returns {Playlist}
 */
export const currentPlaylist = () => {
  return [...state.playlist]
}

export const getPlaylists = () => {
  
}
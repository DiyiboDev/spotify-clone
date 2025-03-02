import { Error } from "../../../components/Error"
import { HideLoader } from "../../../components/Loader"
import {  fetchPlaylistById, fetchTracks } from "../../../lib/playlist"
import { PATHS } from "../../../utils/contants"
import { ELEMENTS } from "../../../utils/dom"
import { htmlPlaylist } from "./html-playlist"
import { htmlSongs } from "./html-playlist-songs"
import { shuffle } from 'underscore'

/**
 * @param {string} path 
 */
export const RenderPlaylist = async(path) => {
  const url = window.location.pathname.split('/')[2]

  try {
    const playlistData = await fetchPlaylistById(path, url)
    const $playlist = htmlPlaylist(playlistData)

    if(path === PATHS.tracks) {
      const start = Math.floor(Math.random() * 10) // TODO: FIX THIS TO SET DINAMICLY
      const songsData = await fetchTracks( {start, limit: 10} )

      const samePlaylistSongs = songsData.filter( song => {
        if(song.id === url) return false
        return song
      })

      const shuffleSongs = shuffle(samePlaylistSongs)
      return {
        $playlist,
        $songs: htmlSongs(shuffleSongs)
      }
    }

    return { 
      $playlist, 
      $songs: htmlSongs(playlistData.songs)
    }
  } catch(error) {
    return Error('Error to get the Playlist')
  } finally {
    HideLoader(ELEMENTS.main)
  }
}
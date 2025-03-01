import { Error } from "../../../components/Error"
import { HideLoader } from "../../../components/Loader"
import { fetchPlaylistById } from "../../../lib/playlist"
import { $, selectorsName } from "../../../utils/dom"
import { htmlPlaylist } from "./html-playlist"
import { htmlSongs } from "./html-playlist-songs"

/**
 * @param {string} path 
 */
export const RenderPlaylist = async(path) => {
  const url = window.location.pathname.split('/')[2]

  try {
    const playlistData = await fetchPlaylistById(path, url)

    const $playlist = htmlPlaylist(playlistData)
    console.log(playlistData);
    const $songs = htmlSongs(playlistData.songs)

    return { $playlist, $songs }
  } catch(error) {
    console.log(error);
    return Error('Error to get the Playlist')
  } finally {
    HideLoader($(selectorsName.MAIN))
  }
}
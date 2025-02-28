import { Error } from "../../../components/Error"
import { HideLoader } from "../../../components/Loader"
import { fetchPlaylistById } from "../../../lib/playlist"
import { $, selectorsName } from "../../../utils/dom"
import { htmlPlaylist } from "./html-playlist"
import { htmlSongs } from "./html-playlist-songs"

export const RenderPlaylist = async() => {
  const url = window.location.pathname.split('/')[2]

  try {
    const playlistData = await fetchPlaylistById(url)

    const $playlist = htmlPlaylist(playlistData)
    const $songs = htmlSongs(playlistData.songs)

    return { $playlist, $songs }
  } catch(error) {
    return Error('Error to get the Playlist')
  } finally {
    HideLoader($(selectorsName.MAIN))
  }
}
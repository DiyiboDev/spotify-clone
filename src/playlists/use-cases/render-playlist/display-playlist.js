import { $, selectorsName } from "../../../utils/dom"
import { listenerSongs } from "./listeners-song"
import { RenderPlaylist } from "./render-playlist"

export const displayPlaylist = async() => {
  let path = window.location.pathname.split('/')[1]
  if(!path) {
    path = 'playlist'
  }

  const { $playlist, $songs } = await RenderPlaylist(path+'s')
  
  const $playlistContent = $('.main__container')
  const $playlistSongs = $(selectorsName.PLAYLIST)

  $playlistContent.append($playlist)
  $playlistSongs.append($songs)

  listenerSongs()
}
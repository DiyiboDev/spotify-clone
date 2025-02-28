import { $, selectorsName } from "../../../utils/dom"
import { RenderPlaylist } from "./render-playlist"

export const displayPlaylist = async() => {
  const { $playlist, $songs } = await RenderPlaylist()
  
  const $playlistContent = $('.main__container')
  const $playlistSongs = $(selectorsName.PLAYLIST)

  $playlistContent.append($playlist)
  $playlistSongs.append($songs)
}
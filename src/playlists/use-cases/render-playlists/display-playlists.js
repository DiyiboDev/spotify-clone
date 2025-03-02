import { ELEMENTS } from "../../../utils/dom"
import { listenerPlaylists } from "./listener-playlists"
import { RenderPlaylists } from "./render-playlists"

export const displayPlaylists = async() => {
  const $songs = await RenderPlaylists()

  const $playlistsAside = ELEMENTS.playlistsSongs
  $playlistsAside.append($songs)
  listenerPlaylists()
}
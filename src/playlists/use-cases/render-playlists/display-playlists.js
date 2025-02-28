import { $, selectorsName } from "../../../utils/dom"
import { listenerPlaylists } from "./listener-playlists"
import { RenderPlaylists } from "./render-playlists"

export const displayPlaylists = async() => {
  const $songs = await RenderPlaylists()

  const $playlistsAside = $(selectorsName.PLAYLISTS_SONGS)
  $playlistsAside.append($songs)
  listenerPlaylists()
}
import { fetchPlaylists } from "../lib/playlist"
import { $ } from "../utils/dom"
import { RenderPlaylists } from "./use-cases/render-playlists"

const displayPlaylists = async() => {
  const $songs =  await RenderPlaylists()

  const $playlistsAside = $('.playlists__songs')
  $playlistsAside.append($songs)
}


export const App = async() => {
  displayPlaylists()
}
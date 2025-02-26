import { $ } from "../utils/dom"
import { RenderPlaylist } from "./use-cases/render-playlist"
import { RenderPlaylists } from "./use-cases/render-playlists"

const displayPlaylists = async() => {
  const $songs =  await RenderPlaylists()

  const $playlistsAside = $('.playlists__songs')
  $playlistsAside.append($songs)
}

const displayPlaylist = async() => {
  const $playlist = await RenderPlaylist()
  
  const $playlistContent = $('.main__container')
  $playlistContent.append($playlist)
}


export const App = async() => {
  displayPlaylists()
  displayPlaylist()
}
import { initGlobals } from "../utils/dom"
import { displayPlaylist } from "./use-cases/render-playlist/display-playlist"
import { displayPlaylists } from "./use-cases/render-playlists/display-playlists"


export const App = async() => {
  initGlobals()

  displayPlaylists()
  displayPlaylist()
}
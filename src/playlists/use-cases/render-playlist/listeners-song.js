import { navigateTo } from "../../../routes/route"
import { $, selectorsName } from "../../../utils/dom"
import { RenderPlaylist } from "./render-playlist"

export const listenerSongs = () => {
  const $songsContainer = $(selectorsName.PLAYLIST)

  $songsContainer.addEventListener('click', async(event) => {
    event.preventDefault()
    const $songsLink = event.target.closest('.track-link')
    if(!$songsLink) return

    const url = $songsLink.href

    const isSameUrl = navigateTo(url)
    if (isSameUrl) return
    
    const $mainContainer = $(selectorsName.MAIN_CONTAINER)
    const $playlistSongs = $(selectorsName.PLAYLIST)

    if($mainContainer) {
      const { $playlist, $songs } = await RenderPlaylist('tracks')
      $mainContainer.replaceChildren($playlist)
      $playlistSongs.replaceChildren($songs)
    }
  })
}
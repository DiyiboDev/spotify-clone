import { navigateTo } from "../../../routes/route"
import { ELEMENTS } from "../../../utils/dom"
import { RenderPlaylist } from "./render-playlist"

export const listenerSongs = () => {
  const $songsContainer = ELEMENTS.playlist

  $songsContainer.addEventListener('click', async(event) => {
    event.preventDefault()
    const $songsLink = event.target.closest('.track-link')
    if(!$songsLink) return

    // TODO: REFACTOR BECASE THIS PIECE OF CODE IS REPEATED IN listeners-song.js and listener-playlists.js
    const url = $songsLink.href

    const isSameUrl = navigateTo(url)
    if (isSameUrl) return
    
    const $mainContainer = ELEMENTS.mainContainer
    const $playlistSongs = ELEMENTS.playlist

    if($mainContainer) {
      const { $playlist, $songs } = await RenderPlaylist('tracks')
      $mainContainer.replaceChildren($playlist)
      $playlistSongs.replaceChildren($songs)
    }
  })
}
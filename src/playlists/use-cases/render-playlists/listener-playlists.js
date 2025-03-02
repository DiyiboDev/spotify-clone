import { navigateTo } from "../../../routes/route"
import { ELEMENTS } from "../../../utils/dom"
import { RenderPlaylist } from "../render-playlist/render-playlist"

export const listenerPlaylists = () => {
  const $playlists = ELEMENTS.playlistsSongs

  $playlists.addEventListener('click', async (event) => {
    const songsItem = event.target.closest('.playlist__song')
    if (!songsItem) return

    event.preventDefault()

    const isSameUrl = navigateTo(songsItem.href)
    if (isSameUrl) return

    const $mainContainer = ELEMENTS.mainContainer
    const $playlistSongs = ELEMENTS.playlist

    if($mainContainer) {
      const { $playlist, $songs } = await RenderPlaylist('playlists')
      $mainContainer.replaceChildren($playlist)
      $playlistSongs.replaceChildren($songs)
    }
  })
}
import { navigateTo } from "../../../routes/route"
import { $, selectorsName } from "../../../utils/dom"
import { RenderPlaylist } from "../render-playlist/render-playlist"

export const listenerPlaylists = () => {
  const $playlists = $(selectorsName.PLAYLISTS, $(selectorsName.ASIDE_PLAYLISTS))

  $playlists.addEventListener('click', async (event) => {
    const songsItem = event.target.closest(selectorsName.PLAYLISTS_SONG)
    if (!songsItem) return

    event.preventDefault()

    const isSameUrl = navigateTo(songsItem.href)
    if (isSameUrl) return

    const $mainContainer = $(selectorsName.MAIN_CONTAINER)
    const $playlistSongs = $(selectorsName.PLAYLIST)

    if($mainContainer) {
      const { $playlist, $songs } = await RenderPlaylist('playlists')
      $mainContainer.replaceChildren($playlist)
      $playlistSongs.replaceChildren($songs)
    }
  })
}
import { fetchPlaylists } from "../../lib/playlist"
import { navigateTo } from "../../routes/route"
import { CLASSES } from "../../utils/contants"
import { $ } from "../../utils/dom"
import { Playlist } from "../models/playlist.model"
import { RenderPlaylist } from "./render-playlist"

/**
 * 
 * @param {Playlist} playlist 
 */
const htmlPlaylists = ({ id, albumId, title, color, cover, artists }) => {
  const $song = document.createElement('a')
  $song.setAttribute('data-id', albumId)
  $song.setAttribute('data-color', color)
  $song.classList.add('playlist__song', 'track-info')
  $song.href = `/playlist/${id}`

  $song.addEventListener('click', async(event) =>  {
    event.preventDefault()

    const isSameUrl = navigateTo($song.href)
    if(isSameUrl) return

    const $playlist = await RenderPlaylist()
    const $playlistContent = $('.main__container')

    $playlistContent.replaceChild($playlist, $playlistContent.children[0])
  })

  const html = 
    `
      <picture class="track-info__picture">
        <img class="track-info__image" src="/images/playlists/${cover}" alt="Song: ${title}" />
      </picture>

      <div class="track-info__texts">
        <span class="track-info__title">${title}</span>
        <div class="track-info__artists">
          <span class="track-info__artist">${artists}</span>
        </div>
      </div>
    `
  
  $song.innerHTML = html

  return $song
}

/**
 * 
 * @param {Playlist} PlaylistLike 
 * @returns {HTMLDivElement}
 */
// { id, idAlbum, title, color, cover, artists }
export const RenderPlaylists = async() => {
  const $fragment = document.createDocumentFragment()

  try {
    const playlists = await fetchPlaylists()

    playlists.forEach( ({ id, albumId, title, color, cover, artists }) => {      
      const $song = htmlPlaylists({id, albumId, title, color, artists, cover})
      $fragment.append($song)
    })
    
    return $fragment
  } catch(error) {
    const $error = document.createElement('div')
    $error.classList.add('error')
    $error.textContent = 'Error to get Songs'

    return $error
  } finally {
    $('.loader', $('.aside-playlists')).classList.add(CLASSES.HIDDEN)
  }
}
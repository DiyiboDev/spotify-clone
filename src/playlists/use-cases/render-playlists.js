import { fetchPlaylists } from "../../lib/playlist"
import { CLASSES } from "../../utils/contants"
import { $ } from "../../utils/dom"
import { Playlist } from "../models/playlist.model"

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
      const $song = document.createElement('div')
      $song.setAttribute('data-id', albumId)
      $song.setAttribute('data-color', color)
      $song.classList.add('playlist__song', 'track-info')
    
      const $picture = document.createElement('picture')
      $picture.classList.add('track-info__picture')
    
      const $image = document.createElement('img')
      $image.classList.add('track-info__image')
      $image.src = `/images/playlists/${cover}`
      $image.alt = `Song: ${title}`
    
      const $texts = document.createElement('div')
      $texts.classList.add('track-info__texts')
    
      const $title = document.createElement('span')
      $title.textContent = title
      $title.classList.add('track-info__title')
    
      const $artists = document.createElement('div')
      $artists.classList.add('track-info__artists')
    
      const $artist = document.createElement('span')
      $artist.textContent = artists
      $artist.classList.add('track-info__artist')
    
      $picture.append($image)
      $artists.append($artist)
      $texts.append($title, $artists)
      $song.append($picture, $texts)
      
      $fragment.append($song)
    })
    
    return $fragment
  } catch(error) {
    const $error = document.createElement('div')
    $error.classList.add('error')
    $error.textContent = 'Error to get Songs'

    return $error
  } finally {
    $('.loader').classList.add(CLASSES.HIDDEN)
  }
}
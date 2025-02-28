import { Playlist } from "../../models/playlist.model"

/**
 * Creates an HTML anchor element representing a playlist song.
 * @param {Playlist} playlist - The playlist object containing the song information.
 * @returns {HTMLAnchorElement} The anchor element representing the playlist song.
 */
export const htmlPlaylists = ({ id, title, cover, artists }) => {
  const html = templateSong({cover, title, artists})  
  const $song = document.createElement('a')

  $song.setAttribute('data-id', id)
  $song.classList.add('playlist__song', 'track-info')
  $song.href = `/playlist/${id}`
  $song.innerHTML = html

  return $song
}

export const templateSong = ( { cover, title, artists } ) => {
  return ( `
    <picture class="track-info__picture">
      <img class="track-info__image" src="/images/playlists/${cover}" alt="${title}" />
    </picture>

    <div class="track-info__texts">
      <span class="track-info__title">${title}</span>
      <div class="track-info__artists">
        <span class="track-info__artist">${artists}</span>
      </div>
    </div>
  `)
}
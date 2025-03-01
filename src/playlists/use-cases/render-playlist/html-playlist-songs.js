import { Playlist } from "../../models/playlist.model"

/**
 * @param {Playlist} playlists 
 * @returns {HTMLDivElement}
 */
export const htmlSongs = ( playlists = [] ) => {
  const $playlistContent = document.createElement('div')
  $playlistContent.classList.add('playlist__content')

  playlists.forEach( ({ id, cover, title, artists }) => {
    const $playlistSong = document.createElement('div')
    const html = templateSongs({ id, cover, title, artists})
    
    $playlistSong.classList.add('playlist__song', 'track-info')
    $playlistSong.innerHTML = html

    $playlistContent.append($playlistSong)
  })

  return $playlistContent
}

/**
 * @param {Playlist} playlist
 * @returns {string}
 */
const templateSongs = ( {id, cover, title, artists }) => {

  return (
    `
      <picture class="track-info__picture">
        <img class="track-info__image" src="${cover}" alt="${title}">
      </picture>
  
      <div class="track-info__texts">
        <div>
          <a class="track-link" href="/track/${id}">
            <span class="track-info__title">${title}</span>
          </a>
        </div>
        <div class="track-info__artists">
          ${artists.map( artist => `<span class="track-info__artist">${artist}</span>`).join(',')}
        </div>
        
      </div>
      <span class="track-info__duration">2 min 35 sec</span>
    `
  )
}
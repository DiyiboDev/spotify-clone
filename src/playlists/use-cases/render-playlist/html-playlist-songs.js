import { Playlist } from "../../models/playlist.model"

/**
 * @param {Playlist} playlists 
 * @returns {HTMLDivElement}
 */
export const htmlSongs = ( playlists ) => {
  const $playlistContent = document.createElement('div')
  $playlistContent.classList.add('playlist__content')

  playlists.forEach( ({ title, artists }) => {
    const $playlistSong = document.createElement('div')
    const html = templateSongs({title, artists})
    
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
const templateSongs = ( {title, artists }) => {
  const imagesSrc = Math.floor(Math.random() * 4) + 1

  return (
    `
      <picture class="track-info__picture">
        <img class="track-info__image" src="/images/playlists/${imagesSrc}.jpg" alt="${title}">
      </picture>
  
      <div class="track-info__texts">
        <div>
          <span class="track-info__title">${title}</span>
        </div>
        <div class="track-info__artists">
          <span class="track-info__artist">${artists}</span>
        </div>
        
      </div>
      <span class="track-info__duration">2 min 35 sec</span>
    `
  )
}
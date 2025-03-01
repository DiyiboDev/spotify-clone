import { FavoriteIcon, MoreIcon, ShareIcon } from "../../../icons/icons"
import { selectorsName } from "../../../utils/dom"
import { Playlist } from "../../models/playlist.model"

/**
 * 
 * @param {Playlist} playlist
 */
export const htmlPlaylist = ( { id, coverPlaylist, cover, title, artists, color } ) => {
  const html = templatePlaylist({ coverPlaylist, cover, title, artists })
  const $playlist = document.createElement('div')

  $playlist.setAttribute('data-id', id)
  $playlist.classList.add('main__information')
  $playlist.style.backgroundImage =  `linear-gradient(${color || '#303038FF'} 10%,rgba(18, 18, 18, 0.616) 100%)`
  $playlist.innerHTML = html

  return $playlist
}

/**
 * 
 * @param {Playlist} playlist
 * @returns {string}
 */
const templatePlaylist = ( { cover, coverPlaylist, title, artists } ) => {
  return ( `
    <div class="main__content">
      <picture class="main__picture">
        <img class="main__image" src="${cover}" alt="${title}">
      </picture>

      <div class="main__texts">
        <h4 class="main__title">${title}</h4>

        <div class="artist">
          <div class="artist__container">
            <picture class="artist__picture">
              <img class="artist__image" src="${coverPlaylist}" alt="Artist: ${artists}">
            </picture>

            ${artists.map( artist => `<span class="artist__name">${artist}</span>`).join(',')}
          </div>

          <div class="main__time">
            <span>
              <time datetime="2024">2024</time>
            </span>
            <span>1 cancion, 2 min 35 s</span>
          </div>
        </div>

        <div class="main-controls">
          <div class="main-controls__buttons">
            <button class="main-controls__button tooltip tooltip--right" data-tooltip="Add to Liked Songs">
              <span class="controls__span">
                ${FavoriteIcon()}
              </span>
            </button>

            <button class="main-controls__button tooltip" data-tooltip="Share">
              <span class="controls__span">
              ${ShareIcon()}
              </span>
            </button>

            <button class="main-controls__button tooltip" data-tooltip="More options">
              <span class="controls__span">
              ${MoreIcon()}
              </span>
            </button>
          </div>

          <button data-control="play" class="main__play tooltip tooltip--top-mini" data-tooltip="Play">
            <span>
              <svg fill="currentColor" role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path></svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  `)
}
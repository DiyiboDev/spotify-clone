import { fetchPlaylistById } from "../../lib/playlist"
import { CLASSES } from "../../utils/contants"
import { $ } from "../../utils/dom"
import { Playlist } from "../models/playlist.model"

/**
 * 
 * @param {Playlist} currentPlaylist
 */
const htmlPlaylist = ({ id, title, color, cover, artists }) => { 
  const $playlist = document.createElement('div')
  $playlist.classList.add('main__information')
  $playlist.setAttribute('data-id', id)
  $playlist.setAttribute('style', `background-image: linear-gradient(${color} 10%,rgba(18, 18, 18, 0.616) 100%)`);
  $('.main').setAttribute('style', `background-color: ${color}`)

  const html =
      `
      <div class="main__content">
        <picture class="main__picture">
          <img class="main__image" src="/images/playlists/${cover}" alt="${title}">
        </picture>

        <div class="main__texts">
          <h4 class="main__title">${title}</h4>

          <div class="artist">
            <div class="artist__container">
              <picture class="artist__picture">
                <img class="artist__image" src="/images/playlists/${cover}" alt="Artist: ${artists}">
              </picture>

              <span class="artist__name">${artists}</span>
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
                  <svg viewBox="0 -960 960 960" fill="currentColor"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                </span>
              </button>

              <button class="main-controls__button tooltip" data-tooltip="Share">
                <span class="controls__span">
                  <svg viewBox="0 -960 960 960" fill="currentColor"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/></svg>
                </span>
              </button>

              <button class="main-controls__button tooltip" data-tooltip="More options">
                <span class="controls__span">
                  <svg viewBox="0 -960 960 960" fill="currentColor"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
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
      </div>`

  $playlist.innerHTML = html

  return $playlist
}

export const RenderPlaylist = async() => {

  const id = window.location.pathname.split('/')[2]

  try {
    const playlist = await fetchPlaylistById(id)

    const $playlist = htmlPlaylist(playlist)

    return $playlist
  } catch(error) {
    const $error = document.createElement('div')
    $error.classList.add('error')
    $error.textContent = 'Error to get Songs'

    return $error
  } finally {
    $('.loader', $('.main')).classList.add(CLASSES.HIDDEN)
  }
}
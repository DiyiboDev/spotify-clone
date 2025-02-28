  $song.addEventListener('click', async(event) =>  {
    event.preventDefault()

    const isSameUrl = navigateTo($song.href)
    if(isSameUrl) return

    const { $playlist, $songs } = await RenderPlaylist()
    const $playlistContent = $('.main__container')
    const $songsContainer = $('.playlist')

    $playlistContent.replaceChild($playlist, $playlistContent.children[0])
    $songsContainer.replaceChild($songs, $songsContainer.children[0])
  })

<div class="search__cancel">
  <button type="button" class="cancel__btn">
      <span">
        <svg role="img" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414z"></path></svg>
      </span>
</div>


<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clon Spotify</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; }
    button { margin: 10px; padding: 10px; cursor: pointer; }
  </style>
</head>
<body>

  <h1>Playlists</h1>
  <button onclick="navigateTo('/playlist/arcane')">🎵 Arcane</button>
  <button onclick="navigateTo('/playlist/rock')">🎸 Rock</button>
  <button onclick="navigateTo('/playlist/pop')">🎤 Pop</button>

  <div id="contenido"><h2>Selecciona una playlist</h2></div>

  <script src="script.js"></script>

</body>
</html>


<script>
  const playlists = {
    arcane: ["Enemy - Imagine Dragons", "Dynasties & Dystopia", "Goodbye"],
    rock: ["Bohemian Rhapsody - Queen", "Hotel California - Eagles", "Stairway to Heaven - Led Zeppelin"],
    pop: ["Blinding Lights - The Weeknd", "Shape of You - Ed Sheeran", "Uptown Funk - Bruno Mars"]
  };

  function loadPlaylist() {
    const path = window.location.pathname.split("/")[2]; // Obtiene el nombre de la playlist
    const contenido = document.querySelector("#contenido");

    if (!path || !playlists[path]) {
      contenido.innerHTML = "<h2>Selecciona una playlist</h2>";
      return;
    }

    const songs = playlists[path];

    contenido.innerHTML = `
      <h2>Playlist: ${path}</h2>
      <ul>${songs.map(song => `<li>${song}</li>`).join("")}</ul>
    `;
  }

  function navigateTo(route) {
    history.pushState({}, "", route); // Cambia la URL sin recargar
    loadPlaylist(); // Carga las canciones de la playlist seleccionada
  }

  window.addEventListener("popstate", loadPlaylist); // Detecta cambios en la URL
  document.addEventListener("DOMContentLoaded", loadPlaylist); // Carga la playlist al entrar

</script>




import './style.css';
import { $, $$ } from './utils/dom/dom'
import { AsideLibrary } from './components/AsideLibrary'
import { CurrentPlaylist } from './components/MainPlaylist'

const App = async () => {

  if(window.location.pathname === '/') {
    window.location.href = '/playlists/1'
  }

  const $asideLibrary = $('.aside-library')
  const $mainPlaylist = $('.main .scrollbar')

  $asideLibrary.innerHTML = 'Loading..'
  $mainPlaylist.innerHTML = 'Loading..'

  // library__songs

  try {
    const [LibraryComponent, PlaylistComponent] = await Promise.all([
      AsideLibrary(),
      CurrentPlaylist(),
    ])

    $asideLibrary.innerHTML = LibraryComponent
    $mainPlaylist.innerHTML = PlaylistComponent

    $('.library__songs').addEventListener('click', (event) => {
      const song = event.target.closest('.playlist__song')

      if (song) {
        const id = song.getAttribute('data-album-id')
        navigateTo(`/playlist/${id}`)
      }
    })

    const navigateTo = async (route) => {
      history.pushState({}, '', route)
      await loadPlaylist()
    }

    const loadPlaylist = async () => {
      try {
        const newPlaylistComponent = await CurrentPlaylist()
        $mainPlaylist.innerHTML = newPlaylistComponent
      } catch (error) {
        console.error('Error loading playlist:', error)
      }
    }

    window.addEventListener('popstate', loadPlaylist)
  } catch (error) {
    console.error('Error initializing app:', error)
  }
}

App()





















// const modalUI = $('.modal-ui')
// const showModalUI = $('[data-control="show-ui"]')
// const closeModalUI = $('[data-control="close-ui"]')
// const containerUI = $('.modal-ui__content')

// closeModalUI?.addEventListener('click', () => {
//   showModalUI.classList.remove('active')
//   modalUI.classList.remove('active')
// })

// showModalUI?.addEventListener('click', () => {
//   showModalUI.classList.toggle('active')
//   modalUI.classList.toggle('active')
// })

// const layouts = {
//   DEFAULT: 'default-layout',
//   VIDEO: 'layout-user--video',
//   LYRIC: 'layout-user--lyric',
//   MINIMALIST: 'layout-user--minimalist',
// }

// containerUI?.addEventListener('click', (event) => {
//   const currentButton = event.target.closest('button')
//   if(!currentButton) return

//   $$('.modal-ui__button', containerUI).forEach( button => button.classList.remove('active') )
//   currentButton.classList.add('active')

//   const currentLayout = currentButton.getAttribute('data-ui')

//   if(currentLayout) {
//     document.body.className = layouts[currentLayout.toUpperCase()] || layouts.DEFAULT
//   }
// })

// document.addEventListener('DOMContentLoaded', () => {
//   console.log($('[data-ui="default"]').classList.add('active'))
// })


// Hacer que si toca otra parte de la pantalla se cierre el modal


// const $resizable = $('.resizable')
// const $handle = $('.resizable-handle')

// let isResizing = false

// $handle?.addEventListener('mousedown', () =>  {
//   isResizing = true
//   document.addEventListener('mousemove', resize)
//   document.addEventListener('mouseup', stopResize)
// })

// const resize = ( event ) => {
  
//   if ( isResizing ) {  
//     const newWidth = Math.abs(event.clientX - $resizable.getBoundingClientRect().right)
//     console.log(newWidth);

//     $resizable.style.width = newWidth + 'px'
//     document.body.style.userSelect = 'none'
//     $handle.classList.add('active')
//   }
// }

// const stopResize = () => {
//   isResizing = false
//   document.addEventListener('mousemove', resize)
//   document.addEventListener('mouseup', stopResize)
//   document.body.style.userSelect = 'auto'
//   $handle.classList.remove('active')
// }


<script>



/**
 * Play Icon
 * @returns {String} svg
 */
export const Play = () => {
  return (
    `<svg fill="currentColor" role="img" viewBox="0 0 24 24" fill="currentColor"><path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path></svg>`
  )
}

/**
 * Pause Icon
 * @returns {String} svg
 */
export const Pause = () => {
  return (
    `<svg fill="currentColor" role="img" viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`
  )
}

/**
 * Next Icon
 * @returns {String} svg
 */
export const Next = () => {
  return (
    `<svg fill="currentColor" role="img" viewBox="0 0 24 24"><path d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg>`
  )
}

/**
 * Previous Icon
 * @returns {String} svg
 */
export const Previous = () => {
  return (
    `<svg fill="currentColor" role="img" viewBox="0 0 24 24"><path d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg>`
  )
}

/**
 * Shuffle Icon
 * @returns {String} svg
 */
export const Shuffle = () => {
  return (
    `<svg fill="currentColor" viewBox="0 0 24 24" role="img"><path d="M18.788 3.702a1 1 0 0 1 1.414-1.414L23.914 6l-3.712 3.712a1 1 0 1 1-1.414-1.414L20.086 7h-1.518a5 5 0 0 0-3.826 1.78l-7.346 8.73a7 7 0 0 1-5.356 2.494H1v-2h1.04a5 5 0 0 0 3.826-1.781l7.345-8.73A7 7 0 0 1 18.569 5h1.518l-1.298-1.298z"></path><path d="M18.788 14.289a1 1 0 0 0 0 1.414L20.086 17h-1.518a5 5 0 0 1-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0 0 18.568 19h1.518l-1.298 1.298a1 1 0 1 0 1.414 1.414L23.914 18l-3.712-3.713a1 1 0 0 0-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 0 0-3.826-1.78H1v-2h1.04A7 7 0 0 1 7.396 6.49z"></path></svg>`
  )
}

/**
 * Loop Icon
 * @returns {String} svg
 */
export const Loop = () => {
  return (
    `<svg role="img" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h1v-2H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4.798l1.298-1.298a1 1 0 1 0-1.414-1.414L9.373 19l3.713 3.712a1 1 0 0 0 1.414-1.414L13.202 20H18a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H6z"></path></svg>`
  )
}

/**
 * Volume High Icon
 * @returns {String} svg
 */
export const VolumeHigh = () => {
  return (
    `<svg fill="currentColor" role="presentation" aria-label="Volumen alto" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>`
  )
}

/**
 * Full Screen Icon
 * @returns {String} svg
 */
export const MiniPlayer = () => {
  return (
    `<svg fill="currentColor" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M16 2.45c0-.8-.65-1.45-1.45-1.45H1.45C.65 1 0 1.65 0 2.45v11.1C0 14.35.65 15 1.45 15h5.557v-1.5H1.5v-11h13V7H16V2.45z"></path><path d="M15.25 9.007a.75.75 0 0 1 .75.75v4.493a.75.75 0 0 1-.75.75H9.325a.75.75 0 0 1-.75-.75V9.757a.75.75 0 0 1 .75-.75h5.925z"></path></svg>`
  )
}

/**
 * Full Screen Icon
 * @returns {String} svg
 */
export const FullScreen = () => {
  return (
    `<svg fill="currentColor" role="img" viewBox="0 0 16 16"><path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"></path></svg>`
  )
}

/**
 * Lyrics Icon
 * @returns {String} svg
 */
export const Lyrics = () => {
  return (
    `<svg role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z"></path></svg>`
  )
}

/**
 * Download Icon
 * @returns {String} svg
 */
export const Download = () => {
  return (
    `<svg fill="currentColor" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z"></path></svg>`
  )
}

</script>




<style>
  body[data-device="desktop"] {
  /* Mostrar el tooltip al pasar el cursor sobre el botón */
  .tooltip:hover .tooltiptext {
    opacity: 1;
    visibility: visible;
  }

  /* Estilos para el tooltip */
  .tooltiptext {
    position: absolute;
    transform: translateX(-50%); /* Lo centra horizontalmente, sin importar su tamaño */
    
    /* Estilos visuales del tooltip */
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;  /* Evita que el texto se divida en varias líneas */
    
    /* Inicialmente oculto */
    opacity: 0;
    visibility: hidden;
    
    /* Transición para una aparición suave */
    transition: opacity 0.3s;
    
    /* Margen superior para separar el tooltip del botón */
    margin-top: 5px;
  
    font-size: .7rem;
    z-index: 999; 
  }


  
  .tooltiptext--top {
    bottom: 150%;
    left: 50%;
  }
  
  .tooltiptext--bottom {
    top: 100%;
    left: 50%;
    margin-top: 8px;
  }
  
  .tooltiptext--top-right {
    bottom: 180%;
    left: 50%;
    transform: translateX(-90%);
  }

  @media ( width <= 1024px ) {
    .tooltiptext--top-left {
      bottom: 140%;
      left: -20%;
      transform: translateX(10%);
    }
  }

  .tooltiptext--top-right-mini {
    bottom: 130%;
    left: 150%;
    transform: translateX(-120%);
  }
  
  .tooltiptext--top-mini {
    bottom: 130%;
    left: 40%;
  }

  .tooltiptext--top-mini-minimal {
    bottom: 100%;
    left: 40%;
  }
}
</style>

<style>
  .container-scrollbar {
  overflow: hidden;  
  border-radius: .5em;
  position: relative;
  width: 100%;
  height: 100%;

  &:hover ::-webkit-scrollbar-thumb {
    background-color: hsl(0deg 0% 100% / 50%);
  }
}

.scrollbar {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
/* Estilo para el scrollbar */
.scrollbar::-webkit-scrollbar {
  /* width: 0.625em; */
  width: 0em;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: hsl(0deg 0% 100% / 30%);
  background-color: transparent;
  opacity: .5;
  border-radius: 1px;
}
.scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 1px;
}
.scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: hsl(0deg 0% 100% / 50%);
}
.scrollbar::-webkit-scrollbar-thumb:active {
  background-color: hsl(0deg 0% 100% / 70%);
}
</style>

import { $, $$ } from './utils/dom.js'
import { CLASSES, DEVICES  } from './utils/contants.js'

const $video = $('video')

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} True if the user agent indicates a mobile device, otherwise false.
 */
const isMobile = () => {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
}

const handleMobileAndDesktop = () => {
  if(isMobile()) {
    document.body.dataset.device = DEVICES.MOBILE
  } else {
    document.body.dataset.device = DEVICES.DESKTOP
    $video.play()
  }
}


//  INIT
(() => {
  handleMobileAndDesktop()

  const $closeVideoBtn = $('#close-video')

  $closeVideoBtn.addEventListener('click', () => {
    $video.pause()
    $('.aside-video').classList.add(CLASSES.ACTIVE)
  })

  const $showVideoBtn = $('.aside-video__show')
  $showVideoBtn.addEventListener('click', () => {
    $video.play()
    $('.aside-video').classList.remove(CLASSES.ACTIVE)
  })
})()

const $rangeVolume = $('#range-volume')
const $rangeTime = $('#range-time')

const activeColor = "#1db954"
const inactiveColor = "#4d4d4d"

$rangeTime?.addEventListener("input", sincronizeBackground)
$rangeVolume?.addEventListener("input", sincronizeBackground)
$rangeTime?.addEventListener('mouseleave', white)
$rangeTime?.addEventListener('mouseenter', green)
$rangeVolume?.addEventListener('mouseleave', white)
$rangeVolume?.addEventListener('mouseenter', green)

function white() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100
  this.style.background = `linear-gradient(90deg, #fff ${ratio}%, ${inactiveColor} ${ratio}%)`
}

function green() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`
}

function sincronizeBackground() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`
}

const $buttonSearch = $('.search__icon')
const $inputSearch = $('.search__input')
const $header = $('.header')

$buttonSearch.addEventListener('click', ()  => {
  $header.classList.add(CLASSES.ACTIVE)

  setTimeout(() => {
    $inputSearch.focus()
    $header.classList.add(CLASSES.ACTIVE)
  }, 0)
})

$inputSearch.addEventListener('blur', () => {
  $header.classList.remove(CLASSES.ACTIVE)
})
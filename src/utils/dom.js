/**
 * Selects the first element matching the given selector within the specified context. 
 * @param {String} selector selector
 * @param {Document|HTMLElement} context context
 * @returns {Element|null} element
 */
export const $ =  ( selector, context = document ) => context.querySelector( selector )

/**
 * Selects all elements matching the given selector within the specified context.
 * @param {String} selector selector
 * @param {Document|HTMLElement} context context
 * @returns {NodeListOf<Element>} elements
 */
export const $$ = ( selector, context = document ) => context.querySelectorAll( selector )

// TODO: USE BETTER NAMES in the HTML, CSS and JavaScript
// Selectores CSS como constantes (fuente única de verdad)
const SELECTORS = {
  MAIN: '.main',
  ASIDE_PLAYLISTS: '.aside-playlists',
  PLAYLISTS: '.playlists',
  PLAYLISTS_SONGS: '.playlists__songs',
  PLAYLIST_SONG: '.playlist__song',
  MAIN_CONTAINER: '.main__container',
  PLAYLIST: '.playlist'
};

// Cache de elementos (mejor práctica para reutilización)
const elements = {
  main: null,
  asidePlaylists: null,
  playlists: null,
  playlistsSongs: null,
  playlistSong: null,
  mainContainer: null,
  playlist: null
};

// Inicialización controlada (asegura que el DOM esté listo)
export function initGlobals() {
  elements.main = $(SELECTORS.MAIN);
  elements.asidePlaylists = $(SELECTORS.ASIDE_PLAYLISTS);
  elements.playlists = $(SELECTORS.PLAYLISTS);
  elements.playlistsSongs = $(SELECTORS.PLAYLISTS_SONGS);
  elements.playlistSong = $(SELECTORS.PLAYLIST_SONG);
  elements.mainContainer = $(SELECTORS.MAIN_CONTAINER);
  elements.playlist = $(SELECTORS.PLAYLIST);

  Object.freeze(elements)
}


export const ELEMENTS = elements
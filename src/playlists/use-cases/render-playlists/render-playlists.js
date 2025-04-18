import { fetchPlaylists } from "../../../lib/playlist"
import {  ERROR_MESSAGE } from "../../../utils/contants"
import { Error } from '../../../components/Error'
import { HideLoader } from "../../../components/Loader"
import { htmlPlaylists } from "./html-playlists"
import { ELEMENTS } from "../../../utils/dom"

/**
 * @returns { Promise<DocumentFragment> | HTMLDivElement> }
 */
export const RenderPlaylists = async() => {
  const $fragment = document.createDocumentFragment()

  try {
    const playlists = await fetchPlaylists()

    playlists.forEach( ( { id, albumId, artists, color, cover, title } ) => {    
      const $song = htmlPlaylists( { id, albumId, artists, color, cover, title } )
      $fragment.append($song)
    })
    
    return $fragment
  } catch(error) {
    return Error(ERROR_MESSAGE.PLAYLISTS)
  } finally {
    HideLoader(ELEMENTS.playlists)
  }
}
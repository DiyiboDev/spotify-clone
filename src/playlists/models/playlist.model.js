export class Playlist {
  /**
   * 
   * @param {string} id 
   * @param {number} albumId 
   * @param {string} title 
   * @param {string} color 
   * @param {string} cover 
   * @param {Array<string>} artists 
   */
  constructor( id, albumId, title, color, cover, artists = [] ) {
    this.id = id
    this.albumId = albumId
    this.title = title
    this.color = color
    this.cover = cover
    this.artists = artists
  }
}
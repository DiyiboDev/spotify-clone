export class Playlist {
  /**
   * 
   * @param {string} id 
   * @param {number} albumId 
   * @param {string} title 
   * @param {string} color 
   * @param {string} cover 
   * @param {string} coverArtist
   * @param {Array<string>} artists 
   * @param {Array<string>} songs
   */
  constructor( id, albumId, title, color, cover, coverArtist, artists = [], songs = [] ) {
    this.id = id
    this.albumId = albumId
    this.title = title
    this.color = color
    this.cover = cover
    this.coverArtist = coverArtist
    this.artists = artists
    this.songs = songs
  }
}
export class UrlShortenedExists extends Error {
  constructor() {
    super('URL encurtada já existe.')
  }
}

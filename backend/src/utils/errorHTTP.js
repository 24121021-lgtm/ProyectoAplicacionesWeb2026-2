export class ErrorHTTP extends Error {

  constructor(status, mensaje) {

    super(mensaje)

    this.name = 'ErrorHTTP'
    this.status = status

  }

}
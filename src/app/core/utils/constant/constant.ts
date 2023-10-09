/**
 * Clase que nos permite tener una instancia de tipo DATE para el manejo de fechas
 */
export class Time {
  static SECOND: number = 1000;
  static MINUTE: number = this.SECOND * 60;
  static HOUR: number = this.MINUTE * 60;
  static DAY: number = this.HOUR * 24;

  /**
   * Método que nos devuelve la fecha actual según el sistema
   */
  static Now = (): Date => new Date();

  /**
   *  Métddo que nos permite setiar una fecha
   * @param date
   */
  static setDate = (date: Date): Date => new Date(date);

}

/**
 * Constante que nos permite obtener el tipo de extensión de un archivo según de la firma del string base 64s
 */
export const Signatures: any = {
  JVBERi0: {contentType: 'application/pdf', extension: 'pdf'},
  R0lGODdh: {contentType: 'image/gif', extension: 'gif'},
  R0lGODlh: {contentType: 'image/gif', extension: 'gif'},
  iVBORw0KGgo: {contentType: 'image/png', extension: 'png'},
  '/9j/4AAQSkZ': {contentType: 'image/jpeg', extension: 'jpg'},
  PD94bWwgdm: {contentType: 'image/svg+xml', extension: 'svg'},
  SUkq: {contentType: 'image/tif', extension: 'tif'},
};

/**
 * Clase que devuevle una instancia para realizar operaciones de tipo UserAgent
 */
export class UserAgent {

  /**
   * Función estatica que nos permite detectar si un dispositivo es mobile
   */
  static IsMobileDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export class Time {
  static SECOND: number = 1000;
  static MINUTE: number = this.SECOND * 60;
  static HOUR: number = this.MINUTE * 60;
  static DAY: number = this.HOUR * 24;

  static Now = (): Date => new Date();
  static setDate = (date: Date): Date => new Date(date);

}

export const Signatures: any = {
  JVBERi0: {contentType: 'application/pdf', extension: 'pdf'},
  R0lGODdh: {contentType: 'image/gif', extension: 'gif'},
  R0lGODlh: {contentType: 'image/gif', extension: 'gif'},
  iVBORw0KGgo: {contentType: 'image/png', extension: 'png'},
  '/9j/4AAQSkZ': {contentType: 'image/jpeg', extension: 'jpg'},
  PD94bWwgdm: {contentType: 'image/svg+xml', extension: 'svg'},
  SUkq: {contentType: 'image/tif', extension: 'tif'},
};

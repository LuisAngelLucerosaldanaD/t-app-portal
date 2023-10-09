import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';
import {Message} from "@app/core/models/toast";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('messageState', [
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1
        })
      ),
      transition('void => *', [style({
        transform: '{{showTransformParams}}',
        opacity: 0
      }), animate('{{showTransitionParams}}')]),
      transition('* => void', [
        animate(
          '{{hideTransitionParams}}',
          style({
            height: 0,
            opacity: 0,
            transform: '{{hideTransformParams}}'
          })
        )
      ])
    ])
  ],
})
export class ToastItemComponent implements AfterViewInit, OnDestroy {

  @Input() message!: Message;
  @Input() index: number = -1;
  @Input() showTransformOptions: string | undefined;
  @Input() hideTransformOptions: string | undefined;
  @Input() showTransitionOptions: string | undefined;
  @Input() hideTransitionOptions: string | undefined;
  @Output() onClose: EventEmitter<number> = new EventEmitter<number>();
  private timeout: any = null;

  constructor(
    private zone: NgZone
  ) {
  }

  ngAfterViewInit(): void {
    this.initTimeout();
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  /**
   * Método que limpia el contador de vida del item toast
   * @private
   */
  private clearTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  /**
   * Método que limpiar el contador cuando el usaurio da click en el item toast
   */
  public onMouseEnter(): void {
    this.clearTimeout();
  }

  /**
   * Método que reinicia el contador cuando el usaurio tenga el mouse sobre el item toast
   */
  public onMouseLeave(): void {
    this.initTimeout();
  }

  /**
   * Método que inicia el contador para eliminar el toast del listado de toasts
   * @private
   */
  private initTimeout(): void {
    this.zone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => {
        this.onClose.emit(this.index);
      }, this.message?.life || 3000);
    });
  }
}

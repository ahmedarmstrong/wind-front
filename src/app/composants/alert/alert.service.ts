import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import {AlertComponent} from "./alert.component";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private componentRef: ComponentRef<AlertComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(message: string = 'Alert message'): Promise<void> {
    const promise = new Promise<void>((resolve) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.componentRef.instance.message = message;
      this.componentRef.instance.closed.subscribe(() => {
        this.close();
        resolve();
      });

      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });

    return promise;
  }

  close() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}

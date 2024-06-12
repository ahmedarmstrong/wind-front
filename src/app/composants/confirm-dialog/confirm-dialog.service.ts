import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import {ConfirmDialogComponent} from "./confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private componentRef: ComponentRef<ConfirmDialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(message: string = 'Are you sure you want to proceed?'): Promise<boolean> {
    const promise = new Promise<boolean>((resolve) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.componentRef.instance.message = message;
      this.componentRef.instance.confirmed.subscribe((response: boolean) => {
        this.close();
        resolve(response);
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

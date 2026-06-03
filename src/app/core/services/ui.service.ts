import { Injectable, signal, Type, Injector, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiService {

  private _open = signal(false);
  private _component = signal<Type<any> | null>(null);
  private _data = signal<any>(null);
  private _injector = signal<Injector | undefined>(undefined); // ✅ NUEVO

  sidenavOpen = this._open.asReadonly();
  component = this._component.asReadonly();
  injector = this._injector.asReadonly();

  private parentInjector = inject(Injector);

  open(component: Type<any>, data?: any) {
    this._component.set(component);
    this._data.set(data);

    // ✅ CREAR UNA SOLA VEZ
    const injector = Injector.create({
      providers: [
        { provide: 'SIDENAV_DATA', useValue: data }
      ],
      parent: this.parentInjector
    });

    this._injector.set(injector);
    this._open.set(true);
  }

  close() {
    this._open.set(false);
  }
}
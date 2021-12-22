import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  public isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 1024;
    window.addEventListener('resize', () => {
      if (this.isMobile !== window.innerWidth < 1024) {
        this.isMobile = window.innerWidth < 1024;
        this.setMobile(this.isMobile);
      }
    });
    this.setMobile(this.isMobile);
  }

  private mobileSource = new BehaviorSubject(false);
  public mobile: Observable<boolean> = this.mobileSource.asObservable();

  setMobile(flag: boolean) {
    this.mobileSource.next(flag);
  }

  getMobile() {
    return this.isMobile;
  }

}


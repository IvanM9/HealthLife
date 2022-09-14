import { SpinnerService } from './spinner.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  private countRequest =0;
  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.countRequest)
      this.spinnerService.llamarSpinner();
    this.countRequest++;
    return next.handle(req).pipe(
      finalize(()=> {
        this.countRequest--;
        if(!this.countRequest)
          this.spinnerService.esconderSpinner()
      })
    );
  }
}

import {HttpInterceptorFn} from '@angular/common/http';
import {tap} from 'rxjs';

export const loggingHttpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event) => {
        console.log('Response:', event);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    })
  );
};

import { HttpInterceptorFn } from '@angular/common/http';

export const myHttpInterceptor: HttpInterceptorFn = (req, next) => {
    let token = localStorage.getItem("UserToken");
    console.log('Original Request:', req);

    if (token) {
      let clonedRequest = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`),
      });
      console.log('Modified Request with Token:', clonedRequest);
      return next(clonedRequest);
    }

    return next(req);
};

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/models/user.interface';
import jwtDecode from 'jwt-decode';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.authService.getCurrentUser();

    //Caso seja o login, lidar com o response para definir o header
    if (request.url === `${environment.gatewayBaseUrl}/auth/login`) {
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const token = event.body.token;
            const decodedToken: any = jwtDecode(token);

            if (decodedToken) {
              const values = JSON.parse(decodedToken.sub);

              const user: User = {
                id: values.id,
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                role: values.role,
                exp: decodedToken.exp,
                token
              };

              localStorage.setItem('user', JSON.stringify(user));
            }
          }
          return event;
        })
      );
    }

    //Colocar o token no header para os restantes pedidos, para caso seja gerado um novo token a cada pedido
    if (user && user.token != '') {
      request = request.clone({
        setHeaders: {
          'x-access-token': user.token
        }
      });
    }
    return next.handle(request);
  }
}

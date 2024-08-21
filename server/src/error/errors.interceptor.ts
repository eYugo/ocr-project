import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const code = err.code;
        console.log('code', code);
        console.log(Object.keys(err));
        console.log('meta', err.meta);
        console.log(err.name);
        console.log(err.response);
        console.log(Object.keys(context));
        console.log('args', context.getArgs());
        console.log('args', context.getArgs()[0].method);

        if (err.name.includes('NotFoundError'))
          throw new NotFoundException('Invoice not found');
        if (err.response?.message) {
          throw new ConflictException(err.response.message[0]);
        }

        switch (code) {
          case 'P2025':
            throw new NotFoundException('Invoice not found');
          default:
            throw new BadGatewayException();
        }
      }),
    );
  }
}
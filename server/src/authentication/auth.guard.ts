import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  // canActivate method is called by Nest to determine whether the current request is allowed to proceed
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // handleRequest method is called by Nest if canActivate returns true
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

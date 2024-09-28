import { UnauthorizedException } from '@nestjs/common';

export const authContext = ({ req }) => {
  if (req.headers?.authorization) {
    // validate jwt
    const token = req.headers.authorization;
    return { token };
  }
  throw new UnauthorizedException();
};

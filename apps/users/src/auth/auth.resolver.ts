import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '@app/common';
import { UsersService } from '../users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    const passwordIsValid = await this.authService.validateUser(
      password,
      user.password,
    );
    if (!passwordIsValid) {
      throw new Error('Invalid credentials');
    }
    const token = await this.authService.login(user);
    return token.access_token;
  }
}

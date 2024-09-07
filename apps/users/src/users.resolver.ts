/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Query((returns) => [User])
  users(): User[] {
    return this.usersService.findAll();
  }
  @Query((returns) => User)
  user(@Args('id') id: string): User {
    return this.usersService.findOne(id);
  }
  @Mutation((returns) => User)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('dob') dob: Date,
    @Args('roleId') roleId: string,
  ): User {
    return this.usersService.create({ name, email, password, dob, roleId });
  }
  @Mutation((returns) => User)
  updateUser(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('dob') dob: Date,
    @Args('roleId') roleId: string,
  ): User {
    return this.usersService.update(id, { name, email, password, dob, roleId });
  }
  @Mutation((returns) => Boolean)
  removeUser(@Args('id') id: string): boolean {
    this.usersService.remove(id);
    return true;
  }
}

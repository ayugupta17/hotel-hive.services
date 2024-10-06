/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Query((returns) => [User])
  @UseGuards(AuthGuard)
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Query((returns) => User)
  @UseGuards(AuthGuard)
  user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Mutation((returns) => User)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('dob') dob: Date,
    @Args('roleId') roleId: string,
  ): Promise<User> {
    return this.usersService.create({ name, email, password, dob, roleId });
  }
  @Mutation((returns) => User)
  @UseGuards(AuthGuard)
  updateUser(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('dob') dob: Date,
    @Args('roleId') roleId: string,
  ): Promise<User> {
    return this.usersService.update(id, { name, email, password, dob, roleId });
  }
  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  removeUser(@Args('id') id: string): boolean {
    this.usersService.remove(id);
    return true;
  }
  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<User> {
    return this.usersService.findOne(reference.id);
  }
}

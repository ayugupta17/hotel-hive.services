import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  create(createUserInput: CreateUserInput) {
    this.users.push(createUserInput);
    return createUserInput;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    const updatedUsers = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserInput };
      } else return { ...user };
    });
    this.users = updatedUsers;
    return updateUserInput;
  }

  remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return {
      id,
    };
  }
}

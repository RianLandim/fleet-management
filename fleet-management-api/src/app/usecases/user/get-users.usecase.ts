import { UserRepository } from '@app/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.find();

    return users;
  }
}

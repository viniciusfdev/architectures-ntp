import { inject, injectable } from 'tsyringe';
import Database from '../repository/database.repository';
import { User } from '../types/data.types';

@injectable()
export default class UserModel {
  constructor(@inject('Database') private database: Database) {}

  async create(user: User) {
    return await this.database.create('Users', user);
  }

  async retrieveUser(userId: string) {
    return await this.database.retrieve<User>('Users', { id: userId });
  }

  async updateUser(userId: string, user: Partial<User>) {
    delete user.author;
    delete user.createdAt;
    user.updatedAt = new Date();

    return await this.database.update('Users', userId, user);
  }

  async deleteUser(userId: string) {
    return await this.database.delete('Users', userId);
  }
}

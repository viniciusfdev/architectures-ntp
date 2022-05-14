import Database from '../repository/database.repository';
import { Index, Post } from '../types/data.types';
import { throwMissingRequiredAttributes } from '../utils/errors.utils';

export default class PostModel {
  database: Database;

  constructor(private code: string) {
    this.database = new Database(this.code);
  }

  async create(post: Post) {
    throwMissingRequiredAttributes(post, ['']);
    return await this.database.create('Posts', post);
  }

  async retrieveUserPosts(owner: Index) {
    return await this.database.retrieve<Post>('Posts', { author: owner });
  }

  async update(postId: Index, post: Partial<Post>) {
    delete post.author;
    delete post.createdAt;
    post.updatedAt = new Date();

    return await this.database.update('Posts', postId, post);
  }

  async delete(postId: Index) {
    return await this.database.delete('Posts', postId);
  }
}

import { Data, Document, Index } from '../types/data.types';
import { AppError } from '../utils/errors.utils';
import * as entrypoints from './data.repository';
import { Config } from './config.repository';
import { autoInjectable } from 'tsyringe';
import { nanoid } from 'nanoid';

@autoInjectable()
export default class Database {
  constructor(private code: string, private config?: Config) {}

  get connection(): Promise<Data> {
    return new Promise(async (resolve, reject) => {
      const config = await this.config.getConfiguration(this.code);
      const data = (entrypoints as any)[config.key];

      if (data) {
        resolve((entrypoints as any)[config.key]);
      } else {
        reject(new AppError(409, "The user request don't have a valid identity context"));
      }
    });
  }

  async create<T = any>(collection: string, data: T): Promise<string> {
    const conn = await this.connection;

    const id = nanoid(6);
    conn[collection][id] = {
      id,
      ...data,
      createdAt: new Date(),
    };
    return id;
  }

  async retrieve<T extends Document = any>(collection: string, query: Partial<T>): Promise<T[]> {
    console.log('query', query);
    const conn = await this.connection;
    const results: T[] = [];

    if (!conn[collection]) {
      throw Error('Invalid collection');
    }

    for (const d of Object.values(conn[collection])) {
      let match = true;

      for (const [attribute, value] of Object.entries(query)) {
        if (d[attribute] !== value) {
          match = false;
          break;
        }
      }

      if (match) {
        results.push(d as T);
      }
    }

    return results;
  }

  async update<T>(collection: string, id: Index, data: Partial<T>) {
    const conn = await this.connection;

    conn[collection][id] = {
      ...conn[collection][id],
      ...data,
    };
    return id;
  }

  async delete(collection: string, id: Index) {
    const conn = await this.connection;

    if (!conn[collection]) {
      throw Error('Invalid collection');
    }

    for (const _id in conn[collection]) {
      if (_id === id) {
        delete conn[collection][_id];
        break;
      }
    }
  }
}

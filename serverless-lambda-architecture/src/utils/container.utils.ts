import 'reflect-metadata';
import { container } from 'tsyringe';
import AuthModel from '../models/auth.model';
import { Config } from '../repository/config.repository';

container.registerSingleton('Config', Config);
container.registerSingleton('AuthModel', AuthModel);

export const AppContainer = container;

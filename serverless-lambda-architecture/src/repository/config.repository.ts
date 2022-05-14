import { singleton } from 'tsyringe';
import { AppLogger } from '../utils/log.utils';

/**
 * Simulates s3 resources
 */
const Configurations: { [code: string]: Configuration } = {
  cfg1: {
    name: 'Experiment1',
    key: 'DATA_1',
  },
  cfg2: {
    name: 'Experiment2',
    key: 'DATA_2',
  },
};

export type Configuration = {
  key: string;
  [attr: string]: any;
};

@singleton()
export class Config {
  configurations: { [code: string]: Configuration };

  constructor() {
    this.configurations = {};
  }

  async getConfiguration(code: string) {
    if (this.configurations[code] == null) {
      AppLogger.log('config.getConfiguration', `Config ${code} not cached`);
      this.configurations[code] = await Configurations[code];
    } else {
      AppLogger.log('config.getConfiguration', `Config ${code} cached`);
    }

    return this.configurations[code];
  }
}

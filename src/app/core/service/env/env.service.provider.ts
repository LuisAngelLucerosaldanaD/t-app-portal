import {EnvService} from './env.service';

/**
 * Método que permite obtener las instancias de las variables de entorno del sistema
 */
export const EnvServiceFactory = () => {
  const env: any = new EnvService();

  const browserWindow: any = window || {};
  const browserWindowEnv = browserWindow['__env'] || {};

  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      // @ts-ignore
      env[key] = window['__env'][key];
    }
  }

  return env;
};

/**
 * Constante que nos permite obtener el listado de variables de entorno
 */
export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};

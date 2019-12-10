const NODE_ENV_TYPE = global.process.env.NODE_ENV_TYPE;

const ORMBASE = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest',
  synchronize: true,
  logging: true,
  entities: [__dirname + '\\src\\**\\*.entity{.ts,.js}'],
};

const HOME = {
  port: 3308,
  username: 'nest',
  password: 'password',
};

const COMPANY = {
  port: 3306,
  username: 'root',
  password: 'root',
};

let CONFIG;

if ( NODE_ENV_TYPE === 'home' ) {
  CONFIG = { ...ORMBASE, ...HOME };
} else if ( NODE_ENV_TYPE === 'company' ) {
  CONFIG = { ...ORMBASE, ...COMPANY };
} else {
  CONFIG = { ...ORMBASE };
}

export default CONFIG;

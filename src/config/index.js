import development from "./development.config";
import production from "./production.config";
const env = process.env.APP_ENV || 'development';

const config = {
  development,
  production
};

export default config[env];

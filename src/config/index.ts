import development from "./development"; // 本地开发环境配置
import production from "./production"; // 生产环境配置

type env = "development" | "production";
const configs = {
    development,
    production,
};
const confEnv = process.env.REACT_APP_CONF_ENV as env;

export default configs[confEnv];

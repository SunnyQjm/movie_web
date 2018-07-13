// https://jx.qjm253.cn/api
const ServerConfig = {
    protocol: 'https',
    host: 'jx.qjm253.cn',
    port: 4897,
    sub_domain: '/api',
};

const TestServerConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 4897,
    sub_domain: '',
};

ServerConfig.BASE_URL = `${ServerConfig.protocol}://${ServerConfig.host}${ServerConfig.sub_domain}`;
//test
// ServerConfig.BASE_URL = `${TestServerConfig.protocol}://${TestServerConfig.host}:${TestServerConfig.port}${TestServerConfig.sub_domain}`;


const TorrentTransferServerConfig = {
    protocol: 'https',
    host: 'movie.qjm253.cn',
    port: 80,
    sub_domain: '/movie',
};

TorrentTransferServerConfig.BASE_URL = `${TorrentTransferServerConfig.protocol}://${TorrentTransferServerConfig.host}${TorrentTransferServerConfig.sub_domain}`;

const ShareWebsiteServerConfig = {
    protocol: 'https',
    host: 'movie.qjm253.cn',
    port: 80,
    sub_domain: '/statics',
};

ShareWebsiteServerConfig.BASE_URL = `${ShareWebsiteServerConfig.protocol}://${ShareWebsiteServerConfig.host}${ShareWebsiteServerConfig.sub_domain}`;



const StaticFileConfig = {
    protocol: 'https',
    host: 'jx.qjm253.cn',
    port: 9749,
    sub_domain: '/static',
};
StaticFileConfig.BASE_URL = `${StaticFileConfig.protocol}://${StaticFileConfig.host}${StaticFileConfig.sub_domain}`;

export {
    ServerConfig,
    TorrentTransferServerConfig,
    StaticFileConfig,
    ShareWebsiteServerConfig,
}
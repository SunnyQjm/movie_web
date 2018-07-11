const ServerConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 4897,
    sub_domain: '',
};

ServerConfig.BASE_URL = `${ServerConfig.protocol}://${ServerConfig.host}:${ServerConfig.port}${ServerConfig.sub_domain}`;

const TorrentTransferServerConfig = {
    protocol: 'https',
    host: 'movie.qjm253.cn',
    port: 80,
    sub_domain: '/movie',
};

TorrentTransferServerConfig.BASE_URL = `${TorrentTransferServerConfig.protocol}://${TorrentTransferServerConfig.host}${TorrentTransferServerConfig.sub_domain}`;

const StaticFileConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 9748,
    sub_domain: '',
};
StaticFileConfig.BASE_URL = `${StaticFileConfig.protocol}://${StaticFileConfig.host}:${StaticFileConfig.port}${StaticFileConfig.sub_domain}`;

export {
    ServerConfig,
    TorrentTransferServerConfig,
    StaticFileConfig
}
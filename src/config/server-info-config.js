// https://jx.qjm253.cn/api
const IntranetServerConfig = {
    protocol: 'http',
    host: 'jx.qjm253.cn',
    port: 9749,
    sub_domain: '/api',
    static_domain: '/statics',
};

const TestServerConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 9749,
    sub_domain: '',
    static_domain: '/statics',
};

IntranetServerConfig.BASE_URL = `${IntranetServerConfig.protocol}://${IntranetServerConfig.host}:${IntranetServerConfig.port}${IntranetServerConfig.sub_domain}`;
IntranetServerConfig.STATIC_URL = `${IntranetServerConfig.protocol}://${IntranetServerConfig.host}:${IntranetServerConfig.port}${IntranetServerConfig.static_domain}`;

//test
// IntranetServerConfig.BASE_URL = `${TestServerConfig.protocol}://${TestServerConfig.host}:${TestServerConfig.port}${TestServerConfig.sub_domain}`;
// IntranetServerConfig.STATIC_URL = `${TestServerConfig.protocol}://${TestServerConfig.host}${TestServerConfig.static_domain}/`;


const CloudServerConfig = {
    protocol: 'http',
    host: 'jx.qjm253.cn',
    port: 9749,
    sub_domain: '/api',
    static_domain: '/statics'
};

CloudServerConfig.BASE_URL = `${CloudServerConfig.protocol}://${CloudServerConfig.host}:${CloudServerConfig.port}${CloudServerConfig.sub_domain}`;
CloudServerConfig.STATIC_URL = `${CloudServerConfig.protocol}://${CloudServerConfig.host}:${CloudServerConfig.port}${CloudServerConfig.static_domain}/`;

export {
    IntranetServerConfig,
    CloudServerConfig,
}
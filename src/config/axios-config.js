import {
    ServerConfig,
} from './server-info-config';
import axios from 'axios';

axios.defaults.baseURL = `http://${ServerConfig.host}:${ServerConfig.port}`;

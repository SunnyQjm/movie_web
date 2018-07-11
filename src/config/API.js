import {
    TorrentTransferServerConfig,
    ServerConfig
} from './server-info-config';
import thunky from 'thunky';
import axios from 'axios';

const TorrentTransferAPI = {
    BASE_URL: TorrentTransferServerConfig.BASE_URL,
    PUSH_ID: {
        api: '/pushId',
        PARAM_TORRENT_ID: 'torrentId',
    },
    GET_ID: {
        api: '/getId',
        PARAM_CODE: 'code',
    }
};

const getTorrentTransferAxois = thunky(cb => {
    const instance = axios.create({
        baseURL: TorrentTransferAPI.BASE_URL,
    });
    cb(instance);
});

const MovieAPI = {
    BASE_URL: ServerConfig.BASE_URL,
    /**
     * GET 获取电影信息的接口
     */
    GET_MOVIES: {
        api: '/getMovies',
        /**
         * 过滤是否获取已缓存的电影
         *  不传：获取的电影包括已缓存和未缓存的
         *  1：只获取已缓存的电影
         *  0：只获取未缓存的电影
         */
        PARAM_IS_DOWNLOAD: 'isDownload',
        PARAM_PAGE: 'page',                     //页数（从1开始）
        PARAM_SIZE: 'size',                     //指定每页的大小
        PARAM_ORDER_PROP: 'orderProp',          //用哪个属性排序（可以取返回数据格式中的任一字段，比如你可以用createdAt字段）
        PARAM_ORDER: 'order',                   //排序的方式 “ASC” => 升序 “DESC” => 降序
        /**
         * video => 视频
         * audio => 音频
         * image => 图片
         * application => 文档
         */
        PARAM_TYPE: 'type',                     //分类查询
        TYPE_VIDEO: 'video',
        TYPE_AUDIO: 'audio',
        TYPE_IMAGE: 'image',
        TYPE_APPLICATION: 'application',
    },

    /**
     * GET 根据电影名字检索电影
     */
    QUERY_MOVIE_BY_NAME: {
        api: '/queryMovieByName',
        PARAM_NAME: 'name',                     //欲搜索电影包含的关键字
    },

    /**
     * GET 查询MD5
     * 接口说明: 该接口主要是防止客户端对同一文件的冗余上传，客户端在上传之前计算文件的MD5。
     *          并通过这个接口判断服务器端是否有该MD5对应的文件。有则不应该再上传，服务器端会 返回该文件的信息，没有则执行上传操作。
     * 参数说明:
     *          md5: 客户端计算所得的欲上传文件的MD5
     * 返回数据格式：
     *          exist == true: 表示服务器上对应MD5的文件已经存在，不用再上传了
     *          exist == false：表示服务器上没有对应MD5的文件，上传不会冗余
     *          movie: 如果exist == true，则该字段包含文件的详细信息，否则没有该字段
     */
    JUDGE_MD5: {
        api: '/judgeMD5',
        PARAM_MD5: 'md5',       //客户端计算所得的欲上传文件的MD5
    },
    UPLOAD_FILE: {
        api: '/upload',
        url: `http://${ServerConfig.host}:${ServerConfig.port}/upload`,
        PARAM_KEY: 'file',
    }
};

const getMovieAxios = thunky(cb => {
    const instance = axios.create({
        baseURL: MovieAPI.BASE_URL,
    });
    cb(instance);
});

export {
    TorrentTransferAPI,
    MovieAPI,
    getMovieAxios,
    getTorrentTransferAxois,
}
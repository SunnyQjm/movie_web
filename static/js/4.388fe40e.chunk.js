webpackJsonp([4],{827:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(27),c=n(107),o=n(31),u=n(35);e.default=Object(c.b)(function(t){return Object.assign({},t.P2pShareReducer)},function(t){return{addTorrent:function(e){Object(u.c)(function(n){var c={};c[u.a.PUSH_ID.PARAM_TORRENT_ID]=e.magnetURI,n.post("/pushId",c).then(function(n){0===n.data.code&&(e.code=n.data.data),t({type:a.i,data:e})}).catch(function(n){t({type:a.i,data:e}),console.log(n)})})},updateClientInfo:function(e){t({type:a.l,data:e})},removeTorrent:function(e){t({type:a.k,data:e})},changeState:function(e){t({type:a.j,data:e})}}})(o.h)}});
//# sourceMappingURL=4.388fe40e.chunk.js.map
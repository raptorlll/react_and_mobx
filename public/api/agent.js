import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = '';
const encode = encodeURIComponent;
const handleErrors = err => {
};
const responseBody = res => res.body;
const tokenPlugin = req => {
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
};

const limitData = (count, p) => `count=${count}&start=${p ? p * count : 0}`;

const Rooms = {
  all: (page, lim = 10) =>
    requests.get(`/rooms/get?${limitData(lim, page)}`),
  search: (text, status, page, lim = 10) => {
      let o = [['name', text], ['status', status], ['page', page], ['offset', lim]];
      let ar = [].slice.call(arguments);
      let string = /*o.map((a, i)=>{return [a, arguments[i]];}).filter(a=>a[1]!==undefined)*/
          o.map(a=>{return a[0]+"="+a[1]}).join('&');
      return requests.get(`/rooms/get?${string}`)
  },
  get: (giud) =>
      requests.get(`/rooms/${giud}`),
  del: giud =>
    requests.del(`/rooms/${giud}`),
  update: room =>
    requests.put(`/rooms/${room.identifier}`, room),
  create: room =>
    requests.post('/rooms', room)
};

export default {
  Rooms
};

const {
  urlPathOf,
  respondWith200OkJson,
} = require('../httpHelpers');

const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {
  if (urlPathOf(request) !== '/contactDetails') {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  if (request.method !== 'GET') {
    return routerHandleResult.NO_HTTP_METHOD_MATCH;
  }

  
}

module.exports = {
  handle,
};

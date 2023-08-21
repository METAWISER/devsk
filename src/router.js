const {
  respondWith404NotFound,
} = require('./httpHelpers');
const { routerHandleResult } = require('./routerHandleResult');

const routers = [
  require('./ping').pingRouter,
  require('./contacts').contactsRouter,
  require('./contactDetails').contactDetailsRouter,
];

module.exports = function(request, response) {
  let handled = false;

  for (const router of routers) {
    if (router.handle(request, response) === routerHandleResult.HANDLED) {
      handled = true;
      break;
    }
  }

  if (!handled) {
    respondWith404NotFound(response);
  }
};
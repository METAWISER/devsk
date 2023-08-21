const url = require('url');

module.exports = {
  urlPathOf: (request) => url.parse(request.url).pathname,

  respondWith200OkText: (response, textBody) => {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    response.end(textBody);
  },

  respondWith200OkJson: (response, jsonBody) => {
    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    response.end(JSON.stringify(jsonBody));
  },

  respondWith404NotFound: (response) => {
    response.writeHead(404);
    response.end();
  },

  respondWith400BadRequest: (response) => {
    response.writeHead(400);
    response.end();
  },
};

const {
  urlPathOf,
  respondWith200OkJson,
  respondWith400BadRequest,
} = require('../httpHelpers');
const querystring = require('querystring');

const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {

  if (!urlPathOf(request).startsWith('/contacts') ) {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  if (request.method === 'DELETE') {
    const pathParams = urlPathOf(request).split('/').slice(1); 
    const contactId = pathParams[1];
console.log('aqui esta el error', contactId);
    if (contactId) {
      const contactToDelete = fakeDatabase.selectFromContactsById(contactId);
      if (contactToDelete) {
        fakeDatabase.deleteContactsById(contactId);
        respondWith200OkJson(response);
      } else {
        respondWith404NotFound(response);
      }
    } else {
      respondWith400BadRequest(response);
    }

    return routerHandleResult.HANDLED;
  }

  else if (request.method === 'GET') {
    
  let contacts = fakeDatabase.selectAllFromContacts();

  const queryParameters = querystring.parse(request.url.split('?')[1]);
  
  const phrase = queryParameters.phrase;

  if (phrase) {
    const lowercasedPhrase = phrase.toLowerCase();
    contacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowercasedPhrase)
    );
  } else {
    respondWith400BadRequest(response);
    return routerHandleResult.HANDLED;
  }

  const limit = parseInt(queryParameters.limit, 10); // Parse the limit parameter
  if (Number.isNaN(limit) || limit < 0) {
    respondWith400BadRequest(response); // Respond with 400 Bad Request
    return routerHandleResult.HANDLED;
  }

  // Apply the limit to the contacts
  if (limit > 0) {
    contacts = contacts.slice(0, limit);
  }

  
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  respondWith200OkJson(response, contacts);
  return routerHandleResult.HANDLED;
} else {
  return routerHandleResult.NO_METHOD_MATCH;
}

}

module.exports = {
  handle,
};

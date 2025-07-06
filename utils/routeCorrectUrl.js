function routeCorrectUrl(baseUrl, id) {
  if (id && id != "0") {
    return `/${baseUrl}/${id}`;
  } else {
    return `/${baseUrl}`;
  }
}

module.exports = routeCorrectUrl;

function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const { method, url } = req;
    console.log(`[${timestamp}] ${method} ${url}`);
  console.log("Headers:");
    for (let header in req.headers) {
      console.log(`${header}: ${req.headers[header]}`);
    }
    if (Object.keys(req.body).length > 0) {
      console.log("Request Body:");
      console.log(req.body);
    }
    next();
  }
  
  module.exports = loggingMiddleware;
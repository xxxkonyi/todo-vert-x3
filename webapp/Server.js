var StaticHandler = require('vertx-web-js/static_handler');
var Router = require('vertx-web-js/router');

var mainRouter = Router.router(vertx);

mainRouter.route('/app/*').handler(StaticHandler.create().handle);

vertx.createHttpServer().requestHandler(router.accept).listen(8080);

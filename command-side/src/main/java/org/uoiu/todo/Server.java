package org.uoiu.todo;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.core.logging.SLF4JLogDelegateFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.LoggerHandler;
import io.vertx.ext.web.handler.ResponseTimeHandler;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.PermittedOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;

public class Server extends AbstractVerticle {

  static {
    System.setProperty(LoggerFactory.LOGGER_DELEGATE_FACTORY_CLASS_NAME, SLF4JLogDelegateFactory.class.getName());
  }

  private static final Logger log = LoggerFactory.getLogger(Server.class);

  private final static int PORT = 8082;

  public static void main(String[] args) {
    Vertx vertx = Vertx.vertx();
    vertx.deployVerticle(Server.class.getName());
  }

  @Override
  public void start() throws Exception {
    log.info("Starting HTTP server for vert.x web application");

    Router router = Router.router(vertx);

    router.route().handler(LoggerHandler.create());
    router.route().handler(ResponseTimeHandler.create());

    router.route().path("/").handler(request -> request.response().end("Hello Vertx Event Bus !"));

    router.route("/eventbus/*").handler(CorsHandler.create("*")
      .allowedMethod(HttpMethod.GET)
      .allowedMethod(HttpMethod.POST)
      .allowedMethod(HttpMethod.PUT)
      .allowedMethod(HttpMethod.DELETE)
      .allowedMethod(HttpMethod.OPTIONS)
      .allowedHeader("X-PINGARUNER")
      .allowedHeader("Content-Type"));


    // Allow events for the designated addresses in/out of the event bus bridge
    BridgeOptions bridgeOptions = new BridgeOptions()
      .addInboundPermitted(new PermittedOptions().setAddress("axon.sender"))
      .addOutboundPermitted(new PermittedOptions().setAddress("axon.publisher"));

    // Create the event bus bridge and add it to the router.
    SockJSHandler sockJSHandler = SockJSHandler.create(vertx).bridge(bridgeOptions);
    router.route("/eventbus/*").handler(sockJSHandler);

    // Start the web server and tell it to use the router to handle requests.
    vertx.createHttpServer().requestHandler(router::accept).listen(PORT);

    log.info("Started on port(s): {} (http)", String.valueOf(PORT));

  }
}

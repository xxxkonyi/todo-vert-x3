package org.uoiu.todo;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.core.logging.SLF4JLogDelegateFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.LoggerHandler;
import io.vertx.ext.web.handler.ResponseTimeHandler;
import io.vertx.ext.web.handler.sockjs.BridgeEventType;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.PermittedOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;

import java.util.Objects;

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

    EventBus eventBus = vertx.eventBus();
    // Create the event bus bridge and add it to the router.
    SockJSHandler sockJSHandler = SockJSHandler.create(vertx).bridge(bridgeOptions, be -> {
      log.info(be.type() + (Objects.isNull(be.getRawMessage()) ? "" : be.getRawMessage().toString()));
      if (be.type() == BridgeEventType.PUBLISH || be.type() == BridgeEventType.SEND) {
        // Add some headers
        JsonObject headers = new JsonObject().put("header1", "val").put("header2", "val2");
        JsonObject rawMessage = be.getRawMessage();
        rawMessage.put("headers", headers);
        be.setRawMessage(rawMessage);
      }
      be.complete(true);
    });
    router.route("/eventbus/*").handler(sockJSHandler);

    // Start the web server and tell it to use the router to handle requests.
    vertx.createHttpServer().requestHandler(router::accept).listen(PORT);

    log.info("Started on port(s): {} (http)", String.valueOf(PORT));

//    vertx.setPeriodic(1000, t -> {
//      eventBus.send("axon.publisher", "vertx send " + Instant.now().toEpochMilli());
//      eventBus.publish("axon.publisher", "vertx publish " + (Instant.now().toEpochMilli() + 1));
//    });

    eventBus.consumer("axon.sender").handler(message -> {
      System.out.println("I have received a message: " + message.body());
      message.reply("how interesting!");
    });

    eventBus.consumer("axon.sender").handler(message -> {
      System.out.println("I have received a message: " + message.body());
      message.reply("how interesting!");
    });

  }
}

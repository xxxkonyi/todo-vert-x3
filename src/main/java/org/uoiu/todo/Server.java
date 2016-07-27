package org.uoiu.todo;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServer;

public class Server extends AbstractVerticle {

  @Override
  public void start() throws Exception {
    HttpServer server = vertx.createHttpServer().requestHandler(request -> {
      request.response().end("Hello Java world !");
    });

    server.listen(8080);
  }
}

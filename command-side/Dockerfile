###
# vert.x docker example using a Java verticle packaged as a fatjar
# To build:
#  docker build -t command-side .
# To run:
#   docker run -t -i -p 8080:8080 command-side
###

FROM java:8-jre

ENV VERTICLE_FILE command-side-3.3.2-all.jar

# Set the location of the verticles
ENV VERTICLE_HOME /usr/verticles

EXPOSE 8080

# Copy your fat jar to the container
COPY build/libs/$VERTICLE_FILE $VERTICLE_HOME/

# Launch the verticle
WORKDIR $VERTICLE_HOME
ENTRYPOINT ["sh", "-c"]
CMD ["java -Djava.security.egd=file:/dev/./urandom -jar $VERTICLE_FILE"]

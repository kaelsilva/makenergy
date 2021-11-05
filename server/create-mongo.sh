#!/bin/bash

docker run --name energy-mongo -p 27017:27017 -d mongo

TOKENSECRET="TOKENSECRET=secret"
MONGO_ADDRESS="MONGO_ADDRESS=localhost"
MONGO_PORT="MONGO_PORT=27017"

echo $TOKENSECRET > .env && echo $MONGO_ADDRESS >> .env && echo $MONGO_PORT >> .env

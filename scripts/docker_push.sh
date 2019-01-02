#!/bin/bash

echo "Log in to hub.docker.com"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -t skynewz/fortnite-api:$TRAVIS_TAG -f scripts/Dockerfile .
docker push skynewz/fortnite-api:$TRAVIS_TAG
docker tag skynewz/fortnite-api:$TRAVIS_TAG skynewz/fortnite-api:latest
docker push skynewz/fortnite-api:latest
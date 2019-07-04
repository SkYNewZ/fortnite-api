#!/bin/bash

echo "Log in to hub.docker.com"
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "Log in to docker.pkg.github.com"
echo "$DOCKER_PACKAGES_TOKEN" | docker login docker.pkg.github.com -u "$DOCKER_USERNAME" --password-stdin

echo "Builing"
docker build -t api -f scripts/Dockerfile .

echo "Pushing tag to hub.docker.com"
docker tag api skynewz/fortnite-api:$TRAVIS_TAG
docker push skynewz/fortnite-api:$TRAVIS_TAG

echo "Pushing latest to hub.docker.com"
docker tag skynewz/fortnite-api:$TRAVIS_TAG skynewz/fortnite-api:latest
docker push skynewz/fortnite-api:latest

echo "Pushing tag to docker.pkg.github.com"
docker tag api docker.pkg.github.com/skynewz/fortnite-api/fortnite-api:$TRAVIS_TAG
docker push docker.pkg.github.com/skynewz/fortnite-api/fortnite-api:$TRAVIS_TAG

echo "Pushing latest to docker.pkg.github.com"
docker tag docker.pkg.github.com/skynewz/fortnite-api/fortnite-api:$TRAVIS_TAG docker.pkg.github.com/skynewz/fortnite-api/fortnite-api:latest
docker push docker.pkg.github.com/skynewz/fortnite-api/fortnite-api:latest

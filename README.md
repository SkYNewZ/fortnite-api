# Fortnite-API

[![Travis](https://img.shields.io/travis/SkYNewZ/fortnite-api.svg?style=for-the-badge&logo=travis)](https://travis-ci.org/SkYNewZ/fornite-api)
[![Docker Pulls](https://img.shields.io/docker/pulls/skynewz/fortnite-api.svg?style=for-the-badge&logo=docker)](https://hub.docker.com/r/skynewz/fortnite-api/)
[![Codecov](https://img.shields.io/codecov/c/github/SkYNewZ/fortnite-api/master.svg?style=for-the-badge)](https://codecov.io/gh/SkYNewZ/fortnite-api)
[![Donate](https://img.shields.io/badge/Donate-Playpal-blue.svg?style=for-the-badge&logo=paypal)](https://www.paypal.me/QLemaire/2)

A simple NodeJS API to retrieve stats and infos from [Fortnite Game](https://www.epicgames.com/fortnite/fr/home).

Powered by [Fortnite Client](https://github.com/weeco/fortnite-client)

## Deploy with docker

```bash
docker run -it --rm -p 8080:3000 \
        -e FORTNITE_ACCOUNT_EMAIL=email@epicgames.com \
        -e FORTNITE_ACCOUNT_PASSWORD=password \
        skynewz/fortnite-api
```
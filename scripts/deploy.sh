#!/bin/bash

echo "Installing Sentry cli"
curl -sL https://sentry.io/get-cli/ | bash

# Assumes you're in a git repository
export SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
export SENTRY_ORG=skynewz

# Create a release
sentry-cli releases new -p 'fortnite-api' $TRAVIS_TAG

# Associate commits with the release
sentry-cli releases set-commits --auto $TRAVIS_TAG
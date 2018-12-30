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

# curl https://sentry.io/api/hooks/release/builtin/1361959/d6bc088a64570eeb34482aabcf29b90e19c86fccde9f24e1c5ee8b0ceda8e01c/ \
#   -X POST \
#   -H 'Content-Type: application/json' \
#   -d "{\"version\":\"$VERSION\"}"
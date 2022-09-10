#!/bin/sh

export TOKEN=""
export USER_ID=""
export SECRET=""

export SESSION_COOKIE_NAME="GHIDORAH-COOKIE"
export DEBUG=false
export SERVERTYPE="SERVERLESS"

git stash
git pull

node core/index.js
#!/bin/sh

export TOKEN="OTY5MDI1ODQxMTM0NzE0OTAx.GRRdGx.wj-odij_foL22GvSJystwSUABtf09lmXQpAaSg"
export USER_ID="969025841134714901"
export SECRET="bACqWvbhpfakVvwt2u_G8Y5xc2qnXtGr"
export PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAa3Q8APJKOMv0Ki5mBDh70+xidm2cJ1lW
SF1PTh64Mv466t5wjKMN3pqyaEIsyfxVzDoduhcPKUMuCeuF2XOl/QIDAQAB
-----END PUBLIC KEY-----"
export ROOM_NETWORK="room@ghidorah.net"

export DEFAULT_GUILD="917714328327692338"
export UNVERIFIED_ROLE="934501017800806510"
export DISCORD_INVITES="https://discord.gg/cnBerxRBEG"

export REDIS_HOST="127.0.0.1"
export REDIS_PORT=6379
export NODE_ENV="public"

export SESSION_COOKIE_NAME="GHIDORAH-COOKIE"

export HTTP_HOST="10.0.0.57"
export PORT="3000"

export DEFAULT_DOMAIN="https://skf-studios.com"
export DEFAULT_PORT=3001

export DEBUG=false

export TWITCH_CLIENT="f5hq6u1aqb4agwq4ivatz5dw40e8wv"
export TWITCH_SECRET="5x7ut5vl43l9wryc3161yiqtwn0l92"

export RANK_MULTIPLIER=4

export XP_BOOST=5

export TWITCH_OAUTH_SECRET="fvai5h11982dgv8f3r1yjquoqa7luh"

git stash
git pull

node core/index.js
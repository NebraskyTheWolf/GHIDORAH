#!/bin/sh

REQUIRE_NODE_VERSION="v16.15.0"
CURRENT_VERSION=$(node -v)

echo "Exporting environements..."

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

node index.js
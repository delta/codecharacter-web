#!/bin/bash

cd /usr/src/app
yarn
yarn run build
cd server
yarn
yarn start
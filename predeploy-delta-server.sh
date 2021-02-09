#!/bin/bash

# Predeploy script to be executed to host the site from /codechar instead of / in Delta server

# Change public path in webpack config
sed -i s/template:\ \'assets\\/index.html\'/template:\ \'assets\\/index.html\',\\n\ \ \ \ \ \ publicPath:\ \'\\/codechar\'/g webpack.config.js

# Change base route
sed -i s/\<BrowserRouter\>/\<BrowserRouter\ basename=\'codechar\'\>/g src/app/index.tsx
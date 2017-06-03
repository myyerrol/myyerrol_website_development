#!/usr/bin/env bash

set -e

# Install plugins.
npm install hexo-tag-bootstrap --save
npm install hexo-generator-search --save

# Install git.
npm install hexo-deployer-git --save

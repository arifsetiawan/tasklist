#!/bin/sh

export PORT=3000
export STORAGE_NAME=STORAGE_NAME
export STORAGE_KEY=STORAGE_KEY
export TABLE_NAME=tasksprod
export PARTITION_KEY=mytasks

nodemon --ext ".js|.css|.swig|.html" app.js


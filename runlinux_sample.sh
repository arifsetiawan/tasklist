#!/bin/sh

if [ $(forever list | grep tasklist/app.js | awk '{print $2}' | cut -c2) ]
then
    echo "Tasklist is running. Restart"
    forever restart $(forever list | grep tasklist/app.js | awk '{print $2}' | cut -c2)
else
    echo "Tasklist is not running"
    export PORT=3000
    export STORAGE_NAME=STORAGE_NAME
    export STORAGE_KEY=STORAGE_KEY
    export TABLE_NAME=tasksprod
    export PARTITION_KEY=mytasks
    forever start ~/tasklist/app.js > /dev/null
fi


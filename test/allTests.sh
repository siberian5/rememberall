#!/bin/bash

set -x

SERVER="http://localhost:4000"

echo unfinished tasks  1 : 
curl $SERVER/users/404203742/tasks




echo new task "пнуть пня":
curl $SERVER/users/404203742/new-task --data "description=%D0%BF%D0%BD%D1%83%D1%82%D1%8C%20%D0%BF%D0%BD%D1%8F"

echo unfinished tasks  2 : 
curl $SERVER/users/404203742/tasks

#!/bin/bash

#set -x

SERVER="https://remembrallbot.herokuapp.com"

echo unfinished tasks  1 : 
curl $SERVER/users/404203742/tasks

echo
echo


echo new task "пнуть пня":
curl $SERVER/users/404203742/new-task --data "description=%D0%BF%D0%BD%D1%83%D1%82%D1%8C%20%D0%BF%D0%BD%D1%8F"

echo 
echo


echo unfinished tasks  2 : 
curl $SERVER/users/404203742/tasks

echo
echo

echo finish task "/task29":
curl $SERVER/users/404203742/finish-task --data "name=/task29"

echo
echo


echo get task with the name "/task29":  
curl $SERVER/users/404203742/get-task --data "name=/task29"

echo
echo

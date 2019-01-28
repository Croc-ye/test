#!/bin/bash
container_name=(blog_db blog_redis)

function do_command() {
  echo $1
  $1
}

function init() {
  echo "localtest begin"
  do_command "cd docker"
  for data in ${container_name[@]}
  do
    do_command "docker-compose up -d --build ${data}"
  done
  second=20
  echo "sleep ${second}, waiting db start"
  sleep ${second}
  do_command "docker-compose up -d --build db_restore"
  do_command "docker-compose up -d --build blog_server"
}

function clean() {
  for data in ${container_name[@]}
  do
    do_command "docker rm -f ${data}"
  done
}

case "$1" in
  init)
    init
    ;;

  clean)
    clean
    ;;

  *)
    exit 1
esac

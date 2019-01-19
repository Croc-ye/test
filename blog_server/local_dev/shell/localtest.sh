#!/bin/bash
container_name=(blog_server blog_db db_restore blog_redis)

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

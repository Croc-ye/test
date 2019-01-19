#!/bin/bash
container_name=(blog_server blog_db db_restore blog_redis)
server_address=95.163.202.160
project_name="blog_server"

function deploy() {
  echo "===================================>"
  echo "deploy....."
  echo "maybe a little bit slow because will push this file to your-server"
  rsync -avz --delete ../../${project_name} root@${server_address}:/root

  cmd="cd ${project_name}/local_dev/docker;"
  for data in ${container_name[@]}
  do
      cmd=${cmd}"docker-compose up -d --build ${data};"
  done
  echo ${cmd}
  ssh root@${server_address} ${cmd}
}

function restore() {
  second=10
  echo "sleep ${second} seconds to wait db start"
  sleep ${second}
  mysql -h${DB_HOST} -uroot -p${MYSQL_ROOT_PASSWORD} ${MYSQL_DATABASE} < ./db/sql/latest_dump.sql
}

case "$1" in
  deploy)
    deploy
    ;;

  restore)
    restore
    ;;

  *)
    exit 1
esac

.PHONY: blog_frontend

CONTAINER_NAME=blog_frontend

init:
	make clean
	make build_app

build_app:
	docker-compose up --build -d nginx

stop:
	docker stop ${CONTAINER_NAME} || true

clean:
	docker rm -f ${CONTAINER_NAME} || true

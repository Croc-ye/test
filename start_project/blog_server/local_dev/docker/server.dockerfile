FROM ubuntu:16.04

# proxy for apt-get
COPY ./local_dev/docker/sources.list /etc/apt/sources.list

RUN apt-get update -y
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN pip3 install --no-cache-dir --upgrade pip
RUN apt-get install nginx -y

# proxy for pip3 install
COPY ./local_dev/docker/pip.conf /etc/pip.conf

RUN pip3 install uwsgi

ARG WORKSPACE="/python3/blog_server"
COPY ./app ${WORKSPACE}/app
COPY ./local_dev/docker ${WORKSPACE}/local_dev/docker

WORKDIR ${WORKSPACE}/local_dev/docker
RUN pip3 install -r ./server_requirements.txt

WORKDIR ${WORKSPACE}/app

# CMD ["python3", "-u", "app.py"]
ENTRYPOINT nginx -g "daemon on;" && uwsgi myapp.ini

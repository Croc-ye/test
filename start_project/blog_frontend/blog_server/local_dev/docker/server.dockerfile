FROM python:3

# proxy for pip3 install
COPY ./local_dev/docker/pip.conf /etc/pip.conf

ARG WORKSPACE="/python3/blog_server"
COPY ./app ${WORKSPACE}/app
COPY ./local_dev/docker ${WORKSPACE}/local_dev/docker

WORKDIR ${WORKSPACE}/local_dev/docker
RUN pip3 install -r ./server_requirements.txt

WORKDIR ${WORKSPACE}/app

CMD ["python3" , "app.py"]

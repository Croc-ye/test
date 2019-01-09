FROM nginx:latest

ARG NODE_JS_VERSION="v9.9.0"
ARG NODE_JS_FILE="node-v9.9.0-linux-x64.tar.gz"

RUN apt-get update && apt-get install -y wget
RUN wget https://npm.taobao.org/mirrors/node/${NODE_JS_VERSION}/${NODE_JS_FILE} && \
    tar -C /usr/local --strip-components 1 -xzf ${NODE_JS_FILE} && \
    rm ${NODE_JS_FILE}

ARG BUILD_DIR="/tmp/blog_frontend/"

COPY ./app ${BUILD_DIR}/app
COPY ./package.json ${BUILD_DIR}
COPY ./webpack.config.js ${BUILD_DIR}

WORKDIR ${BUILD_DIR}
RUN npm config set registry http://registry.npm.taobao.org/
RUN npm install
RUN npm run build

ARG WORKSPACE="/usr/share/nginx/html/"
RUN cp -r ./build/* ${WORKSPACE}

CMD ["nginx", "-g", "daemon off;"]

#!/bin/bash

function build-cpp() {
  g++ ./cpp/main.cpp -o ./cpp/main && ./cpp/main
}


case "$1" in
  build-cpp)
    build-cpp
    ;;
  *)
    echo "please choose one {dump | restore}"
    exit 1
esac

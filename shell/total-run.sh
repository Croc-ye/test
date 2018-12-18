#!/bin/bash

function build-cpp() {
  g++ ./cpp/main.cpp -o ./cpp/main && ./cpp/main
}

function build-go() {
  go run ./go/image.go
}


case "$1" in
  build-cpp)
    build-cpp
    ;;

  build-go)
    build-go
    ;;
    
  *)
    echo "please choose one {dump | restore}"
    exit 1
esac

.PHONY: test

build-cpp:
	@./shell/total-run.sh build-cpp

build-go:
	@./shell/total-run.sh build-go

clean:
	rm -rf ./cpp/main

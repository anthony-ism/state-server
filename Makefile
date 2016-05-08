ISTANBUL = node ./node_modules/istanbul/lib/cli.js
NPM_BIN = ./node_modules/.bin
TESTS=$(shell find ${PWD}/test -name '*test.js')

clean:
	@rm -rf ./node_modules
	@rm -rf ./coverage

install:
	@npm install

test: install
	$(ISTANBUL) cover $(NPM_BIN)/_mocha -dir ./coverage/unit -i "lib/**/*.js"  --include-all-sources -- $(TESTS)

run: test
	./bin/state-server

all: clean install test run
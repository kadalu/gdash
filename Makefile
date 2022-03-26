.PHONY: fmt-check lint fmt help

VERSION ?= "main"

help:
	@echo "make release - Create Single file Release"

fmt-check:
	crystal tool format --check src

lint:
	cd lint && shards install
	./lint/bin/ameba src

fmt:
	crystal tool format src

release:
	tar czvf gdash.tar.gz views public bin/gdash*

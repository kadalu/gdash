.PHONY: fmt-check lint fmt help release build css-build css-watch

VERSION ?= "main"

help:
	@echo "make fmt-check  - Check the Code formatting"
	@echo "make lint       - Lint Checks"
	@echo "make fmt        - Code Format"
	@echo "make build      - Build the Project(Dev build)"
	@echo "make css-build  - TailwindCSS build"
	@echo "make css-watch  - Watch the source files and build TailwindCSS"
	@echo "make gdash-data - Gdash data file release"

fmt-check:
	crystal tool format --check src

lint:
	cd lint && shards install
	./lint/bin/ameba src

fmt:
	crystal tool format src

build:
	shards build

css-build:
	npx tailwindcss -i ./input.css -o ./public/stylesheet.css

css-watch:
	npx tailwindcss -i ./input.css -o ./public/stylesheet.css

gdash-data: css-build
	tar czvf gdash-data.tar.gz views public


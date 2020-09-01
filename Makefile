VERSION ?= "master"
PYTHON ?= python3
PROGNAME = gdash

help:
	@echo "make release - Create Single file Release"

build-ui:
	cd ui && npm install && npm run build;

gen-version:
	@echo "\"\"\"Version\"\"\"" > gdash/version.py
	@echo "VERSION = \"${VERSION}\"" >> gdash/version.py

release: gen-version build-ui
	@rm -rf build
	@mkdir -p build/src
	@cp -r gdash/* build/src/
	@${PYTHON} -m pip install --system -r requirements.txt --target build/src
	@cp -r ui/build build/src/ui
	@cd build/src && zip -r ../${PROGNAME}.zip *
	@echo '#!/usr/bin/env ${PYTHON}' | cat - build/${PROGNAME}.zip > build/${PROGNAME}
	@chmod +x build/${PROGNAME}
	@rm -rf build/src
	@rm -f build/${PROGNAME}.zip
	@echo "Single deployment file is ready: build/${PROGNAME}"

pypi-release: gen-version build-ui
	@cp -r ui/build gdash/ui
	python3 setup.py sdist

.PHONY: help release gen-version build-ui pypi-release

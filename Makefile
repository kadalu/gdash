FLASK_APP=glusterdash

setup:
	cd ui; npm install && bower install;

buildui:
	cd ui; ember build --environment production
	rm -rf "$(FLASK_APP)/dist"
	cp -r ui/dist "$(FLASK_APP)/"

.PHONY: setup buildui

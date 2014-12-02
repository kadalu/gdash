FLASK_APP=glusterdash/

buildui:
	cd ui; ember build --environment production
	rm -rf "$(FLASK_APP)/dist"
	cp -r dist "$(FLASK_APP)/"

.PHONY: buildui

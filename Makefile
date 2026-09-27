.PHONY: all validate build reconcile

all: validate build

validate:
	python3 scripts/validate.py --strict

build:
	python3 scripts/build.py

reconcile:
	python3 scripts/reconcile.py source/taxonomy-v0.md

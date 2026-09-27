.PHONY: all validate build reconcile

all: validate build

validate:
	python3 scripts/validate.py --strict

build:
	python3 scripts/build.py

LATEST_SNAPSHOT := $(shell ls source/taxonomy-v*.yaml | sort -V | tail -1)

# Checks the working taxonomy against the most recent snapshot (and the original input).
reconcile:
	python3 scripts/reconcile.py $(LATEST_SNAPSHOT)
	python3 scripts/reconcile.py source/taxonomy-v0.md

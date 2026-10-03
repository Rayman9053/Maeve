.PHONY: all validate build reconcile mods-check

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

# Claude Code mods under mods/ (see mods/README.md): validate each, then run its tests.
mods-check:
	@set -e; for m in mods/*/; do echo "== $$m"; claude plugin validate $$m; (cd $$m && claude plugin test); done

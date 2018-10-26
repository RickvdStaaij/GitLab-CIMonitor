.PHONY: all

# ===========================
# Default: help section
# ===========================

info: intro commands
intro:
	@echo "........................................................................."
	@echo "..####...######..##...##...####...##..##..######..######...####...#####.."
	@echo ".##..##....##....###.###..##..##..###.##....##......##....##..##..##..##."
	@echo ".##........##....##.#.##..##..##..##.###....##......##....##..##..#####.."
	@echo ".##..##....##....##...##..##..##..##..##....##......##....##..##..##..##."
	@echo "..####...######..##...##...####...##..##..######....##.....####...##..##."
	@echo "........................................................................."

# ===========================
# Main commands
# ===========================

init: intro install-git-hooks run-updates commands

github: intro checkout-pr run-updates
update-project: intro run-updates
update: intro switch-branch run-updates
git-hooks: intro install-git-hooks

build-dev-server: intro dev-server
build-dev-dashboard: intro dev-dashboard
build-production: intro run-updates production-build

test: intro test-prettier
pre-commit: intro test-prettier commit-intro

# ===========================
# Recipes
# ===========================

commands:
	@echo "\n=== Make CIMonitor ===\n"
	@echo "make                        Show the make commands you can run."
	@echo "make init                   Initialise the project for development."
	@echo "make update-project         Install all dependencies and generate required files."
	@echo "make update BRANCH=<branch> Switch to a branch and run update-project."
	@echo "make github PR=<number>     Check out a PR from github and update the project."
	@echo "make git-hooks              Install the available git hooks."
	@echo "make build-dev-server       Build and run the development server."
	@echo "make build-dev-dashboard    Build, run and watch the development dashboard."
	@echo "make build-production       Build all the files required for production."
	@echo "make test                   Run the testsuite."

switch-branch:
	@if [ -z $$BRANCH ]; then echo "No branch is set, please run:\nmake update BRANCH=<branch>"; exit 1; fi
	@echo "\n=== Switching to and updating $$BRANCH ===\n"
	git checkout $$BRANCH
	git pull upstream $$BRANCH

checkout-pr:
	@if [ -z $$PR ]; then echo "No PR number is set, please run:\nmake github PR=<number>"; exit 1; fi
	@echo "\n=== Checking out Pull Request $$PR ===\n"
	git fetch upstream refs/pull/$$PR/head:refs/remotes/upstream/pr/$$PR
	git checkout upstream/pr/$$PR

run-updates:
	@echo "\n=== Updating project ===\n"
	yarn install

run-watch:
	@echo "\n=== Running file watchers ===\n"
	rm -rf dist/*
	yarn watch

dev-server:
	@echo "\n=== Starting server application ===\n"
	yarn start

dev-dashboard:
	@echo "\n=== Building and watching files ===\n"
	yarn watch

production-build:
	@echo "\n=== Building files for production ===\n"
	yarn build

test-prettier:
	@echo "\n=== Prettier style check ===\n"
	@echo "Wrongly formatted files:"
	@node_modules/.bin/prettier -l "{server,monitor}/**/*.{js,vue}" && echo "None ❤️"

# test-eslint:
# 	@echo "\n=== Running ESLint ===\n"
# 	@node_modules/.bin/eslint --color "{server,monitor}/**/*.{js,vue}" && echo "No errors ❤️"

commit-intro:
	@echo "\n=== Committing ===\n"

install-git-hooks:
	@echo "\n=== Installing git hooks ===\n"
	cp dev/git-hooks/* .git/hooks
	chmod +x .git/hooks/*

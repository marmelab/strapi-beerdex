DOCKER_COMPOSE = docker-compose

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

## DEVELOPMENT

install: ## Install the application
	${DOCKER_COMPOSE} pull

start: ## Start the application
	${DOCKER_COMPOSE} up -d

stop: ## Stop the application
	${DOCKER_COMPOSE} down

logs: ## Display the containers logs
	${DOCKER_COMPOSE} logs -f
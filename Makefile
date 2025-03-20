create:
	@powershell -Command "New-Item -Path $(word 1,$(filter-out $@,$(MAKECMDGOALS))) -Name $(word 2,$(filter-out $@,$(MAKECMDGOALS))) -ItemType File"

# Docker commands
docker-image:
	docker build -t bio-king .

docker-tag:
	docker tag bio-king:latest bio-king:$(shell git describe --tags --abbrev=0)

docker-tag-latest:
	git tag -a "$(shell docker tag bio-king:latest)" -m "latest image"

docker-build:
	docker-compose build .

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

docker-restart:
	docker-compose down && docker-compose up -d

docker-exec:
	docker-compose exec app sh

docker-db-backup:
	docker-compose exec db pg_dump -U bio bio_db > backup-$$(date +%Y%m%d%H%M%S).sql

docker-db-restore:
	docker-compose exec -T db psql -U bio bio_db < $(file)

docker-prune:
	docker system prune -af
	docker volume prune -f
	
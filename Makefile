create:
	@powershell -Command "New-Item -Path $(word 1,$(filter-out $@,$(MAKECMDGOALS))) -Name $(word 2,$(filter-out $@,$(MAKECMDGOALS))) -ItemType File"
	
#! bin/bash

# start all docker containers as defined in the docker-compose file, run in "daemon mode"
docker-compose up -d 

# we could get fancy and poll for connections continuosly but this works fine
echo 'database started will wait for 10 seconds for connection to be ready'
sleep 10

# runs sql script 'create database memery_development' inside the postgres container we just created
docker exec -it my_postgres  psql --user postgres -c 'create database memery_development'

# run migrations
cd memery 
bin/rails db:migrate RAILS_ENV=development

echo '\n ***COMPLETED*** memery_development database setup \n'

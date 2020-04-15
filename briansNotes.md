
## part 01 (getting it to run)

why did bundle install take so long?

had to do bundle install --path (said it was deprecated)

no database was running
was trying to connect to unix socket 

pulled down docker image 

then 
ActiveRecord::PendingMigrationError (

Migrations are pending. To resolve this issue, run:

        bin/rails db:migrate RAILS_ENV=development

):

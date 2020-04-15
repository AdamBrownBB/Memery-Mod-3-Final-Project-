
## part 01 (getting it to run)

why did bundle install take so long?

had to do bundle install --path (said it was deprecated)

```
Your user account isn't allowed to install to the system RubyGems.
  You can cancel this installation and run:

      bundle install --path vendor/bundle

  to install the gems into ./vendor/bundle/, or you can enter your password
  and install the bundled gems to RubyGems using sudo.

  Password: 
```

no database was running
was trying to connect to unix socket 

pulled down docker image 

then 
ActiveRecord::PendingMigrationError (

Migrations are pending. To resolve this issue, run:
    bin/rails db:migrate RAILS_ENV=development
):

maybe include a note about enabling different environments ?
[database file](memery/config/database.yml)


## part 02 (front end)

can you have the rails server also serve up the react app? VS having to open in via the terminal ?

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

build this in React Angular or Vue, nobody does direct dom minipulation anymore, some people use Jquery but event that is deprecated at this point 

can you have the rails server also serve up the react app? VS having to open in via the terminal ?

flesh out the login page
right now login, and signup seems the same
maybe implement social sign in?
the login feature doesn't seem to do anything, would be nice if there was a leaderboard or something

### important 
make the styling responsive, consider using breakpoints
make it look good on mobile
you can use a combo of grid and flex box
https://www.webdesignerdepot.com/2018/09/grid-vs-flexbox-which-should-you-choose/

I know the idea of the game is fun and goofy but maybe make it look more modern + slick?
maybe use material UI ?


(3) [{…}, {…}, {…}]
0: {id: 1, name: "brian", games: Array(0)}
1: {id: 2, name: "adam", games: Array(0)}
2: {id: 3, name: "brian", games: Array(0)} THIS LOOKS LIKE A BUG
length: 3
__proto__: Array(0)
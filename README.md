# Memery

## Demo: https://youtu.be/a401QagA5xI

Welcome to Memery, a card-based matching game, with a twist.

There are four levels, which get progressively more challenging as you go. For example, Level 1 has 4 pairs of memes/gifs to match and 1 'bomb' - click on it by accident and you lose the round. 

Level 2 has 7 pairs and 2 bombs. 
Level 3 has 11 pairs and 3 bombs. 
Level 4 has 16 pairs and 4 bombs. 

It's harder than you think!

Scoring is calculated based on the number of tries it takes you to make all the matches. Less tries will earn you a higher score. 

### Running the app locally

From your terminal, clone down this repository.

*prerequisites*    
ruby + rails framework installed   
docker installed (to run the database as self contained docker image, you can run postgres directly on your host machine if you prefer )

*database setup*  
run `sh debsetup.sh`  
see [dbsetup.sh](dbsetup.sh) for inline comments on what each step is doing   
if you run into issues you can run each command individually and debug as needed 
for more on pg image https://hub.docker.com/_/postgres

1) `cd` into the 'memery' folder and run `bundle install` to install necessary dependencies

1) run `rails s` to start the server and access user and game data.

1) Open a new terminal window, and `cd` into the 'memery_frontend' folder.

1) run `open index.html` and go to your active browser window which should have automatically opened the index.html file. Sign in and start playing!

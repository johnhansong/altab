from app.models import db, Website, environment, SCHEMA
from sqlalchemy.sql import text

def seed_websites():
  muscle_wiki = Website(
    name='Muscle Wiki', user_id=1, link='https://musclewiki.com',
    description='A website to help you work out. Identify desired muscle groups and find instant guides',
    preview_img='')
  temp_email = Website(
    name='Temporary Email', user_id=1, link='https://temp-mail.org/en/',
    description='If you need a temporary email for any reason, use this site to obtain and receive emails with a temporary email address!',
    preview_img='')
  just_the_recipe = Website(
    name='Just the Recipe', user_id=1, link='https://www.justtherecipe.com/',
    description='Get your recipe without any of the fluff, popups, ads, or life stories',
    preview_img='')
  mcbroken = Website(
    name='McBroken', user_id=1, link='https://mcbroken.com/',
    description="Check if a Mc Donald's ice cream machine is broken before getting there",
    preview_img='')
  my_fridge_food = Website(
    name='My Fridge Food', user_id=2, link='https://myfridgefood.com/',
    description="If you have food in your fridge and don't know what to make, check this website out and discover recipes based on the ingredients you have.",
    preview_img='')
  retro_tv = Website(
    name='My Retro TVs', user_id=2, link='https://90s.myretrotvs.com/',
    description="Feeling nostalgic? Want to wind down? Kick back, grab some popcorn, and enjoy the 90s TV on this website!",
    preview_img='')
  eat_this_much = Website(
    name='Eat This Much', user_id=2, link='https://www.eatthismuch.com/',
    description="Eat This Much creates personalized meal plans based on your food preferences, budget, and schedule. Reach your diet and nutritional goals with our calorie calculator, weekly meal plans, grocery lists and more. Create your meal plan right here in seconds.",
    preview_img='')
  just_watch = Website(
    name='Just Watch', user_id=2, link='https://www.justwatch.com/',
    description="We show you where you can legally watch movies and TV shows that you love. You are kept up to date with what is new on Netflix, Amazon Prime, Apple TV and many other streaming platforms.",
    preview_img='')
  worn_on_tv = Website(
    name='Worn on TV', user_id=3, link='https://wornontv.net/',
    description="Curious as to what celebrities are wearing on TV? Check out our catalogue of what most popular celebrities have worn on TV shows",
    preview_img='')
  wifi_space = Website(
    name='WiFi Space', user_id=3, link='https://wifispc.com/',
    description="Service that helps you find WiFi access anywhere in the world. Free map of WiFi passwords anywhere you go!",
    preview_img='')
  drive_and_listen = Website(
    name='Drive & Listen', user_id=3, link='https://driveandlisten.herokuapp.com/',
    description="Travel the world and drive around with this website. Headphones recommended.",
    preview_img='')
  make_me_a_cocktail = Website(
    name='Make Me a Cocktail', user_id=3, link='https://makemeacocktail.com/',
    description="For all cocktail enthusiasts. Discover cocktails, uncover unique techniques, or learn how to create one.",
    preview_img='')
  tune_find = Website(
    name='Tune Find', user_id=4, link='https://www.tunefind.com/',
    description="The Internet's best source for TV, movie and video game soundtracks since 2005.",
    preview_img='')
  retro_games = Website(
    name='Play Retro Games', user_id=4, link='https://www.playretrogames.com/',
    description="Play retro games online in your browser at playretrogames.com We are an online emulator website and community. We support many classic systems, and add some very often. Our emulators are written using Adobe Flash technology in order to be compatible with most computers.",
    preview_img='')
  plan_your_room = Website(
    name='Plan Your Room', user_id=4, link='https://www.planyourroom.com/',
    description="Plan your room's layout. Create mock furniture, blueprints, and designs for your new or existing room or home.",
    preview_img='')
  alternative_to = Website(
    name='Alternative To', user_id=4, link='https://alternativeto.net/',
    description="Discover alternative software and/or services for the most popular utilities and tools online including word, PDF managers, photo editors, and more.",
    preview_img='')




  db.session.add(muscle_wiki)
  db.session.add(temp_email)
  db.session.add(just_the_recipe)
  db.session.add(mcbroken)
  db.session.add(my_fridge_food)
  db.session.add(retro_tv)
  db.session.add(eat_this_much)
  db.session.add(just_watch)
  db.session.add(worn_on_tv)
  db.session.add(wifi_space)
  db.session.add(drive_and_listen)
  db.session.add(make_me_a_cocktail)
  db.session.add(tune_find)
  db.session.add(retro_games)
  db.session.add(plan_your_room)
  db.session.add(alternative_to)
  db.session.commit()


def undo_websites():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.websites RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM websites"))

  db.session.commit()

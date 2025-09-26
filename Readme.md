<!-- how to run articles-cms project -->

Clone project
Create and copy  the .env file in laravel project
make sure docker is install and running
Open your terminal and go to project articles-cms/docker (where docker-compose.yml is located):

run docker-compose up -d --build
run docker ps
you should see container running:
php_app (for php/Laravel)
mysql (for Database)
nginx (for web server)
frontend (for React)

then, run  docker exec -it php_app bash (now you are inside container)


run this command:
composer install       # Install PHP dependencies
php artisan key:generate
php artisan migrate    # Run database migrations
php artisan db:seed    # Seed database if needed(password for user is "password")


you will ready to use :Frontend (React with vite using default Docker port 5173): http://localhost:5173


<!-- this is my .env file in laravel project copy this in .env file: -->


APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:PuSXdf/g/B9Ho/Ky7O1XJMBgvxHM5vlPEMVRRHZGBSM=
APP_DEBUG=true
APP_URL=http://localhost:8081

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=cms_db
DB_USERNAME=cms_user
DB_PASSWORD=cms_pass

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"


AUTH_GUARD=api

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

JWT_SECRET=8dUXXf2aLx9LC8hY6gRNmJUHfBRoCAxr8pQWovqOw36pto6XzFXT6OQnpaPWq6qy



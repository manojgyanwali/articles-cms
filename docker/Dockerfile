# Use official PHP FPM image
FROM php:8.3-fpm

# Install system dependencies and PDO MySQL
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath xml

# Set working directory
WORKDIR /var/www/html

# Copy composer (optional if you want composer in container)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

FROM php:8.2-fpm
WORKDIR /ex_1
COPY  . .
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN  composer install \
    && php artisan key:generate \
    && php artisan db:seed \
    && php artisan config:clear
CMD ["php", "artisan", "serve"]
EXPOSE 8000

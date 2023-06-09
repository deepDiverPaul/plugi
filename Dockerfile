FROM php:8.2-apache-bullseye
WORKDIR "/var/www/html"

RUN apt-get update; \
    docker-php-ext-install pdo pdo_mysql; \
    apt-get -y --no-install-recommends install \
        git \
        php8.2-mysql; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

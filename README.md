![Plugi](https://github.com/deepDiverPaul/plugi/blob/0357cc90d603ff3c33e68d5e5de160abce7315c0/plugi-core/dist/images/plugi-banner.png)

> A fork of [PHPagebuilder](https://github.com/HansSchouten/PHPagebuilder) by [Hans Schouten](https://github.com/HansSchouten).

> Still a work-in-progress

This boilerplate defines the project structure for quickly creating a website that can be managed with a drag and drop
pagebuilder.

## Installation

To setup your website download the latest version of Plugi and upload it to the webroot directory of your website.

### Edit the config file
The file `config.php` holds all the basic configuration for your project. Edit as needed. Be sure to update the
login-credentials.

### Login
Now you should be able to log in to the admin panel by going to the `/admin` URL of your website using `admin` and
`admin` (you can change these in the config file). If you are able to login you can start building your website.

Note: make sure to disable error reporting in `index.php` once your website goes into production!

## Docker 
Simply run `docker-compose up -d` using the supplied `docker-compose.yml`. The image uses PHP 8.2

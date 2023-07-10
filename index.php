<?php
require_once __DIR__.'/plugi-core/src/Core/EnvLoader.php';

(new Plugi\Core\EnvLoader())->load();

if ($_ENV['STAGE'] !== 'production') {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
}

require_once __DIR__ . '/plugi-core/src/Core/helpers.php';
spl_autoload_register('phpb_autoload');

$config = require __DIR__ . '/config.php';

$builder = new Plugi\Plugi($config);
$builder->handleRequest();

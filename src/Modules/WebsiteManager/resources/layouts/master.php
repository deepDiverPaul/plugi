<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?= phpb_trans('website-manager.title') ?></title>

    <?= phpb_registered_assets('admin-header') ?>
    <link href="<?= phpb_asset('WebsiteManager.css') ?>" rel="stylesheet">
</head>
<body>

<div class="">
    <?php
    if (phpb_config('auth.use_login')):
    ?>
    <a href="<?= phpb_url('auth', ['action' => 'logout']) ?>" class="absolute top-0 right-0 btn btn-light clear btn-sm mt-2 mr-2">
        <i class="fas fa-sign-out-alt"></i> <?= phpb_trans('website-manager.logout') ?>
    </a>
    <?php
    endif;
    ?>

    <?php
    require __DIR__ . '/../views/' . $viewFile . '.php';
    ?>

    <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">Powered by <a href="https://github.com/HansSchouten/PHPageBuilder" target="_blank">PHPageBuilder</a></p>
    </footer>
</div>

<script src="<?= phpb_asset('WebsiteManager.js') ?>"></script>
</body>
</html>

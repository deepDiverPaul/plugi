<!doctype html>
<html lang="<?= phpb_current_language() ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?= phpb_trans('auth.title') ?></title>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link href="<?= phpb_asset('WebsiteManager.css') ?>" rel="stylesheet">
</head>
<body>

<div class="container p-4">
    <?php
    require  __DIR__ . '/' . $viewFile . '.php';
    ?>

    <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">Powered by <a href="https://github.com/deepDiverPaul/plugi" target="_blank">Plugi Page Builder</a></p>
    </footer>
</div>

</body>
</html>

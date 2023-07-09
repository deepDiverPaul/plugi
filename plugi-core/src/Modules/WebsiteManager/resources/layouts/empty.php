<!doctype html>
<html lang="<?= phpb_current_language() ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Plugi Page Builder</title>

    <link href="<?= phpb_asset('WebsiteManager.css') ?>" rel="stylesheet">

</head>
<body class="bg-light">

<div class="container">
    <?php
    require __DIR__ . '/../views/' . $viewFile . '.php';
    ?>
</div>

<script src="<?= phpb_asset('WebsiteManager.js') ?>"></script>
</body>
</html>

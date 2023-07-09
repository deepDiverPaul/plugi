<?php

use Plugi\Repositories\MenuRepository;

?>
<!doctype html>
<html lang="<?= phpb_current_language() ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title><?= phpb_e($page->getTranslation('meta_title')) ?></title>
    <meta name="description" content="<?= phpb_e($page->getTranslation('meta_description')) ?>">

    <link href="<?= phpb_asset('icons/duotone/style.css') ?>" rel="stylesheet">
    <link href="<?= phpb_asset('icons/regular/style.css') ?>" rel="stylesheet">
    <link href="<?= phpb_asset('icons/bold/style.css') ?>" rel="stylesheet">

    <link href="<?= phpb_theme_asset('dist/style.css') ?>" rel="stylesheet">
</head>

<body>

<header>
    <nav class="">
        <ul class="flex flex-col">

            <?php

            foreach ((new MenuRepository)->getHydratedMenu('Main')['pages'] as $menuPage): ?>
                <li>
                    <a href="<?= phpb_e($menuPage['route']) ?>" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                        <?= phpb_e($menuPage['title']) ?>
                    </a>
                </li>
            <?php
            endforeach;
            ?>
        </ul>
    </nav>
</header>

<main class="#main-content">
    <?= $body ?>
</main>

<footer class="">
    <div class="mx-auto max-w-screen-xl text-center">
        <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            <?php

            foreach ((new MenuRepository)->getHydratedMenu('Footer')['pages'] as $menuPage): ?>
                <li>
                    <a href="<?= phpb_e($menuPage['route']) ?>" class="mr-4 hover:underline md:mr-6 "><?= phpb_e($menuPage['title']) ?></a>
                </li>
            <?php
            endforeach;
            ?>
        </ul>
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© <?= phpb_e(date("Y"))?></span>
        <div class="dropdown dropdown-hover">
            <label tabindex="0" class="btn m-1 btn-xs"><i class="ph ph-translate"></i></label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <?php
                foreach ((new MenuRepository)->getLanguageMenu($page->getTranslation('page_id')) as $lang): ?>
                    <li>
                        <a href="<?= phpb_e($lang['route']) ?>"><?= phpb_e($lang['title']) ?></a>
                    </li>
                <?php
                endforeach;
                ?>
            </ul>
        </div>
    </div>
</footer>

<script src="<?= phpb_theme_asset('dist/phpb-demo-template.js') ?>"></script>

<!-- Run Plugi script.js files -->
<script type="text/javascript">
    document.querySelectorAll("script").forEach(function(scriptTag) {
        scriptTag.dispatchEvent(new Event('run-script'));
    });
</script>
</body>
</html>

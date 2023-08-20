<?php

use Plugi\Extensions;
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
    <?= Extensions::getHtmlBlocks() ?>

</head>

<body>
<?= Extensions::getHtmlBlocks('body-start') ?>

<div class="navbar bg-base-100">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <?php

                foreach ((new MenuRepository)->getHydratedMenu('Main')['pages'] as $menuPage): ?>
                    <li>
                        <a href="<?= phpb_e($menuPage['route']) ?>"><?= phpb_e($menuPage['title']) ?></a>
                    </li>
                <?php
                endforeach;
                ?>
<!--                <li>-->
<!--                    <a>Parent</a>-->
<!--                    <ul class="p-2">-->
<!--                        <li><a>Submenu 1</a></li>-->
<!--                        <li><a>Submenu 2</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
            </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            <?php

            foreach ((new MenuRepository)->getHydratedMenu('Main')['pages'] as $menuPage): ?>
                <li>
                    <a href="<?= phpb_e($menuPage['route']) ?>"><?= phpb_e($menuPage['title']) ?></a>
                </li>
            <?php
            endforeach;
            ?>
<!--            <li tabindex="0">-->
<!--                <details>-->
<!--                    <summary>Parent</summary>-->
<!--                    <ul class="p-2">-->
<!--                        <li><a>Submenu 1</a></li>-->
<!--                        <li><a>Submenu 2</a></li>-->
<!--                    </ul>-->
<!--                </details>-->
<!--            </li>-->
        </ul>
    </div>
    <div class="navbar-end">
        <a class="btn">Button</a>
    </div>
</div>

<main class="#main-content">
    <?= $body ?>
</main>

<footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
        <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            <?php

            foreach ((new MenuRepository)->getHydratedMenu('Footer')['pages'] as $menuPage): ?>
                <li>
                    <a href="<?= phpb_e($menuPage['route']) ?>" class="mr-4 hover:underline md:mr-6 "><?= phpb_e($menuPage['title']) ?></a>
                </li>
            <?php
            endforeach;
            ?>
            <li>
                <div class="dropdown dropdown-hover dropdown-top">
                    <label tabindex="0" class="btn m-1 btn-xs"><i class="ph ph-translate"></i></label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <?php
                        foreach ((new MenuRepository)->getLanguageMenu($page->getTranslation('page_id')) as $lang): ?>
                            <li x-data="{emoji: ''}" x-init="emoji = plugi.getFlagEmoji('<?= phpb_e($lang['locale']) ?>')">
                                <a href="<?= phpb_e($lang['route']) ?>">
                                    <span x-text="emoji"></span>
                                    <?= phpb_e($lang['title']) ?>
                                </a>
                            </li>
                        <?php
                        endforeach;
                        ?>
                    </ul>
                </div>
            </li>
        </ul>
        <p>Copyright © <?= phpb_e(date("Y"))?></p>
    </div>
</footer>

<script src="<?= phpb_theme_asset('dist/phpb-demo-template.js') ?>"></script>

<!-- Run Plugi script.js files -->
<script type="text/javascript">
    document.querySelectorAll("script").forEach(function(scriptTag) {
        scriptTag.dispatchEvent(new Event('run-script'));
    });
</script>
<?= Extensions::getHtmlBlocks('body-end') ?>

</body>
</html>

<?php

use Plugi\Extensions;
$tabs = include __DIR__ . '/../views/tabs/config.php';
$tabs = array_merge($tabs, Extensions::getBackends());
$activeSlug = $_GET['tab'] ?: array_key_first($tabs);
?>
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

<div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-top">
        <!-- Page content here -->
        <div class="navbar bg-base-100 lg:hidden">
            <div class="navbar-start">
                <label for="my-drawer-2" class="btn btn-square btn-ghost drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div class="navbar-center">
                <span class="text-xl"><?= phpb_trans('website-manager.title') ?></span>
            </div>
            <div class="navbar-end">
                <a href="<?= phpb_url('auth', ['action' => 'logout']) ?>" class="btn btn-square btn-ghost">
                    <i class="text-lg ph ph-sign-out"></i>
                </a>
            </div>
        </div>
        <?php
        require __DIR__ . '/../views/' . $viewFile . '.php';
        ?>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">Powered by <a href="https://github.com/deepDiverPaul/plugi" target="_blank">Plugi Page Builder</a></p>
        </footer>

    </div>
    <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <!-- Sidebar content here -->
            <div class="py-5 text-2xl text-center">
                <h2><?= phpb_trans('website-manager.title') ?></h2>
            </div>
            <?php
            foreach ($tabs as $slug => $tab) :
                ?>
            <li class="mb-1">
                <a class="<?= phpb_e($slug === $activeSlug ? 'bg-base-100' : '' ) ?>" href="?tab=<?= phpb_e($slug) ?>">
                    <?= $tab['icon'] ?: '<i class="ph ph-circles-four"></i>' ?> <?= phpb_e($tab['title']) ?>
                </a>
            </li>
            <?php
            endforeach;
            ?>
            <?php
            if (phpb_config('auth.use_login')):
                ?>
            <li class="lg:flex hidden">
                <a href="<?= phpb_url('auth', ['action' => 'logout']) ?>" class="">
                    <i class="ph ph-sign-out"></i> <?= phpb_trans('website-manager.logout') ?>
                </a>
            </li>
            <?php
            endif;
            ?>
        </ul>

    </div>
</div>

<script src="<?= phpb_asset('WebsiteManager.js') ?>"></script>
</body>
</html>

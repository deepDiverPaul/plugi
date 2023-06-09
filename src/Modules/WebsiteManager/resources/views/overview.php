<?php

use PHPageBuilder\Extensions;
$tabs = include 'tabs/config.php';
$tabs = array_merge($tabs, Extensions::getBackends());
$activeSlug = $_GET['tab'] ?: array_key_first($tabs);
?>
<div class="py-5 text-center">
    <h2><?= phpb_trans('website-manager.title') ?></h2>
</div>

<div class="row">
    <div class="col-12">
        <div class="flex justify-center mb-4">
            <div class="tabs tabs-boxed border">
                <?php
                foreach ($tabs as $slug => $tab) :
                    ?>
                    <a class="tab <?= phpb_e($slug === $activeSlug ? 'tab-active' : '' ) ?>" href="?tab=<?= phpb_e($slug) ?>"><?= phpb_e($tab['title']) ?></a>
                <?php
                endforeach;
                ?>
            </div>
        </div>

        <div class="max-w-4xl p-4 mx-auto">
            <div id="pages" class="tab-pane">
                <?php
                    include $tabs[$activeSlug]['include'];
                ?>
            </div>
        </div>
    </div>
</div>

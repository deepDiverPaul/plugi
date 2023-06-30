<div class="max-w-4xl p-8 mx-auto w-full">
    <div class="text-center text-3xl font-bold mb-8 mt-2">
        <?= phpb_e($tabs[$activeSlug]['title']) ?>
    </div>
    <?php
    if (phpb_flash('message')):
        ?>
        <div class="hidden alert-success alert-error"></div>
        <div class="alert alert-<?= phpb_flash('message-type') ?> mb-6">
            <?= phpb_flash('message-type') === 'success' ? '<i class="text-xl ph-duotone ph-info"></i>' : ''  ?>
            <?= phpb_flash('message-type') === 'error' ? '<i class="text-xl ph-duotone ph-warning-circle"></i>' : ''  ?>
            <span><?= phpb_flash('message') ?></span>
        </div>
    <?php
    endif;
    ?>
    <div class="">
        <?php
            include $tabs[$activeSlug]['include'];
        ?>
    </div>
</div>

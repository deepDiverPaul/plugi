<div class="max-w-4xl p-8 mx-auto w-full">
    <div class="text-center text-3xl font-bold mb-8 mt-2">
        <?= phpb_e($tabs[$activeSlug]['title']) ?>
    </div>
    <div class="">
        <?php
            include $tabs[$activeSlug]['include'];
        ?>
    </div>
</div>

<section class="">
    <div class="container container-md mx-auto p-4 flex flex-row gap-4 flex-col-reverse <?= phpb_e($block->setting('order')) ?>">
        <div class="md:w-6/12 grow">
            <?php if (strlen($block->setting('headline')) > 0) : ?>
            <div class=" text-2xl">
                <?= phpb_e($block->setting('headline')) ?>
            </div>
            <?php endif; ?>
            [block slug="paragraph"]
            <br>
            <br>
            [block slug="button"]
        </div>
        <div class="<?= phpb_e($block->setting('width')) ?>">
            [block slug="image"]
        </div>
    </div>
</section>

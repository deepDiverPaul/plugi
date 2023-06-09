<?php

use Plugi\Extensions;

$settingIns = phpb_instance('setting');
?>

<form method="post" action="<?= phpb_url('website_manager', ['route' => 'settings', 'action' => 'update', 'tab' => 'settings']) ?>">

    <div class="max-w-lg mx-auto text-center">
        <?php
        if (phpb_flash('message')):
        ?>
        <div class="alert alert-<?= phpb_flash('message-type') ?> mb-6">
            <i class="text-xl ph-duotone ph-info"></i>
            <span><?= phpb_flash('message') ?></span>
        </div>
        <?php
        endif;
        ?>

        <div class="form-control w-full mb-6">
            <label for="languages" class="label">
                <span class="label-text"><?= phpb_trans('website-manager.website-languages') ?></span>
            </label>
            <select class="select select-bordered w-full" id="languages" name="languages[]" title="<?= phpb_trans('website-manager.languages-selector-placeholder') ?>" required multiple>
                <?php
                foreach (phpb_trans('languages') as $locale => $localeText):
                ?>
                <option value="<?= phpb_e($locale) ?>" <?= phpb_e($settingIns::has('languages', $locale)) ? 'selected' : '' ?>><?= phpb_e($localeText) ?></option>
                <?php
                endforeach;
                ?>
            </select>
        </div>

        <div class="flex flex-col gap-6">
            <?php
            foreach (Extensions::getConfigs() as $extKey => $config):
                if(count(Extensions::getSettings($extKey)) === 0){
                    continue;
                }
                ?>
                <details class="collapse collapse-plus bg-base-200">
                    <summary class="collapse-title text-xl font-medium"><?= phpb_e($config['title']) ?></summary>
                    <div class="collapse-content">
                        <div class="">
                            <?php
                            foreach (Extensions::getSettings($extKey) as $setting):
                                ?>
                                <?php
                                if ($setting['type'] === 'text'):
                                    ?>
                                    <div class="form-control w-full">
                                        <label class="label">
                                            <span class="label-text"><?= phpb_e($setting['label'] ?: $setting['name']) ?></span>
                                        </label>
                                        <input type="text" name="<?= phpb_e($setting['key']) ?>" value="<?= phpb_e($setting['value']) ?>" class="input input-bordered w-full" />
                                    </div>
                                <?php
                                endif;
                                ?>
                                <?php
                                if ($setting['type'] === 'toggle'):
                                    ?>
                                    <div class="form-control" x-data="{state: <?= phpb_e($setting['value']) ?>}">
                                        <label class="label cursor-pointer">
                                            <span class="label-text"><?= phpb_e($setting['label'] ?: $setting['name']) ?></span>
                                            <input type='hidden' :value="state" name="<?= phpb_e($setting['key']) ?>">
                                            <input type="checkbox" class="toggle" x-model="state"   />
                                        </label>
                                    </div>
                                <?php
                                endif;
                                ?>
                            <?php
                            endforeach;
                            ?>
                        </div>
                    </div>
                </details>
            <?php
            endforeach;
            ?>
        </div>

        <button class="btn btn-primary btn-sm mt-8">
            <?= phpb_trans('website-manager.save-settings'); ?>
        </button>

<!--        <div class="mt-8">-->
<!--            --><?php //= phpb_trans('website-manager.pagebuilder-block-images') ?>
<!--        </div>-->
<!--        <a href="--><?php //= phpb_url('website_manager', ['route' => 'settings', 'action' => 'renderBlockThumbs']) ?><!--" class="btn btn-secondary btn-sm mr-1">-->
<!--            --><?php //= phpb_trans('website-manager.render-thumbs') ?>
<!--        </a>-->
    </div>

</form>

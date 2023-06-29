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

        <div class="w-full mb-6">
            <div class="label-text text-left"><?= phpb_trans('website-manager.website-languages') ?></div>
            <?php
                foreach (phpb_trans('languages') as $locale => $localeText):
            ?>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"><?= phpb_e($localeText) ?></span>
                        <input type="checkbox" name="languages[]" value="<?= phpb_e($locale) ?>" <?= phpb_e($settingIns::has('languages', $locale)) ? 'checked' : '' ?> class="checkbox checkbox-sm" />

                    </label>
                </div>
            <?php
                endforeach;
            ?>
        </div>

        <div class="form-control w-full mb-6">
            <label for="admin_language" class="label">
                <span class="label-text"><?= phpb_trans('website-manager.admin-language') ?></span>
            </label>
            <select class="select select-bordered w-full" id="admin_language" name="admin_language" title="<?= phpb_trans('website-manager.languages-selector-placeholder') ?>" required>
                <?php
                $beLanguages = ['de', 'en', 'es', 'nl'];
                foreach ($beLanguages as $locale):
                ?>
                <option value="<?= phpb_e($locale) ?>" <?= phpb_e($settingIns::has('admin_language', $locale)) ? 'selected' : '' ?>><?= phpb_e(phpb_trans('languages.'.$locale)) ?></option>
                <?php
                endforeach;
                ?>
            </select>
        </div>

        <div class="form-control w-full mb-6">
            <label for="selected_theme" class="label">
                <span class="label-text"><?= phpb_trans('website-manager.selected-theme') ?></span>
            </label>
            <select class="select select-bordered w-full" id="selected_theme" name="selected_theme" title="<?= phpb_trans('website-manager.languages-selector-placeholder') ?>" required>
                <?php
                $themes = ['theme-one'];
                foreach ($themes as $theme):
                ?>
                <option value="<?= phpb_e($theme) ?>" <?= phpb_e($settingIns::has('selected_theme', $theme)) ? 'selected' : '' ?>><?= phpb_e($theme) ?></option>
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

        <button class="btn btn-primary mt-8">
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

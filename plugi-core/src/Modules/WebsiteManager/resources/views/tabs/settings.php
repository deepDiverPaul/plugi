<?php

use Plugi\Extensions;

$settingIns = phpb_instance('setting');
?>

<form method="post" action="<?= phpb_url('website_manager', ['route' => 'settings', 'action' => 'update', 'tab' => 'settings']) ?>">
    <div class="" x-data="{activeTab: 0, tabs: ['Website','Language','Theme','Extensions']}">
        <div class="tabs mb-6">
            <div class="border-b border-base-300 grow"></div>
            <template x-for="(tab, index) in tabs">
                <a class="tab tab-lifted" x-text="tab" @click="activeTab = index" :class="activeTab === index ? 'tab-active' : ''"></a>
            </template>
            <div class="border-b border-base-300 grow"></div>
        </div>
        <div class="" x-show="activeTab === 0">
        </div>
        <div class="" x-show="activeTab === 1">
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
                    <span class="label-text"><?= phpb_trans('website-manager.admin-language') ?> <strong><?= phpb_current_language() ?></strong></span>
                </label>
                <select class="select select-bordered w-full" id="admin_language" name="admin_language" title="<?= phpb_trans('website-manager.languages-selector-placeholder') ?>" required>
                    <?php
                    $beLanguages = ['de', 'en', 'es', 'nl'];
                    foreach ($beLanguages as $locale):
                        ?>
                        <option value="<?= phpb_e($locale) ?>" <?= phpb_e(phpb_config('general.language') === $locale ? 'selected' : '') ?>><?= phpb_e(phpb_trans('languages.'.$locale)) ?></option>
                    <?php
                    endforeach;
                    ?>
                </select>
            </div>
        </div>
        <div class="" x-show="activeTab === 2">
            <div class="form-control w-full mb-6">
                <label for="selected_theme" class="label">
                    <span class="label-text"><?= phpb_trans('website-manager.selected-theme') ?></span>
                </label>
                <select class="select select-bordered w-full" id="selected_theme" name="selected_theme" title="<?= phpb_trans('website-manager.languages-selector-placeholder') ?>" required>
                    <?php
                    $themes = phpb_themes();
                    foreach ($themes as $theme => $themeConfig):
                        ?>
                        <option value="<?= phpb_e($theme) ?>" <?= phpb_e(phpb_config('theme.active_theme') === $theme ? 'selected' : '') ?>><?= phpb_e($themeConfig['title']) ?></option>
                    <?php
                    endforeach;
                    ?>
                </select>
            </div>
        </div>
        <div class="" x-show="activeTab === 3">
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
        </div>
        <div class="text-center mt-8">
            <button class="btn btn-primary ">
                <?= phpb_trans('website-manager.save-settings'); ?>
            </button>
        </div>
    </div>






<!--        <div class="mt-8">-->
<!--            --><?php //= phpb_trans('website-manager.pagebuilder-block-images') ?>
<!--        </div>-->
<!--        <a href="--><?php //= phpb_url('website_manager', ['route' => 'settings', 'action' => 'renderBlockThumbs']) ?><!--" class="btn btn-secondary btn-sm mr-1">-->
<!--            --><?php //= phpb_trans('website-manager.render-thumbs') ?>
<!--        </a>-->

</form>

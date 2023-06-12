<?php
$pageUrlParam = '';
if (isset($page)) {
    $pageUrlParam = '&page=' . phpb_e($page->getId());
}

$pageTranslations = $page ? $page->getTranslations() : [];
?>


        <div class="manager-panel p-8 w-full">
            <form method="post" action="<?= phpb_url('website_manager', ['route' => 'page_settings', 'action' => $action]) ?><?= $pageUrlParam ?>">
                <div class="text-center text-3xl font-bold mb-8 mt-2">
                    <?php
                    if ($action === 'create'):
                        echo phpb_trans('website-manager.add-new-page');
                    else:
                        echo phpb_trans('website-manager.edit-page');
                    endif;
                    ?>
                </div>

                <div class="max-w-lg p-4 mx-auto">
                    <div class="form-control w-full mb-4">
                        <label class="label">
                            <span class="label-text"> <?= phpb_trans('website-manager.name') ?></span>
                            <span class="label-text-alt"><?= phpb_trans('website-manager.required') ?></span>
                        </label>
                        <input type="text" id="name" name="name" value="<?= phpb_field_value('name', $page) ?>" required class="input input-bordered w-full" />
                        <label class="label">
                            <span class="label-text-alt"><?= phpb_trans('website-manager.visible-in-page-overview') ?></span>
                        </label>
                    </div>

                    <div class="form-control w-full mb-4">
                        <label class="label">
                            <span class="label-text"><?= phpb_trans('website-manager.layout') ?></span>
                            <span class="label-text-alt"><?= phpb_trans('website-manager.required') ?></span> <!-- TODO add to lang -->
                        </label>
                        <select class="select select-bordered" id="layout" name="layout" required>
                            <?php
                            $value = phpb_field_value('layout', $page);
                            foreach ($theme->getThemeLayouts() as $layout):
                                if ($layout->getSlug() === $value):
                                    echo '<option value="' . phpb_e($layout->getSlug()) . '" selected>' . phpb_e($layout->getTitle()) . '</option>';
                                else:
                                    echo '<option value="' . phpb_e($layout->getSlug()) . '">' . phpb_e($layout->getTitle()) . '</option>';
                                endif;
                            endforeach;
                            ?>
                        </select>
                    </div>

                    <?php
                    $firstLang = true;
                    foreach (phpb_active_languages() as $languageCode => $languageTranslation):
                    ?>
                        <details class="collapse collapse-plus bg-base-200 mt-6" <?= phpb_e($firstLang ? 'open' : '') ?>>
                            <summary class="collapse-title text-xl font-medium"><?= phpb_trans('languages.' . $languageCode) ?></summary>
                            <div class="collapse-content">
                                <div class="">
                                    <div class="form-control w-full mb-2">
                                        <label class="label" for="<?= phpb_e($languageCode) ?>-page-title">
                                            <span class="label-text"><?= phpb_trans('website-manager.page-title') ?></span>
                                            <span class="label-text-alt"><?= phpb_trans('website-manager.required') ?></span>
                                        </label>
                                        <input type="text" class="input input-bordered w-full" id="<?= phpb_e($languageCode) ?>-page-title" name="title[<?= phpb_e($languageCode) ?>]" value="<?= phpb_e($pageTranslations[$languageCode]['title'] ?? '') ?>" required />
                                    </div>

                                    <div class="form-control w-full mb-2">
                                        <label class="label" for="<?= phpb_e($languageCode) ?>-page-meta-title">
                                            <span class="label-text"><?= phpb_trans('website-manager.page-meta-title') ?></span>
                                        </label>
                                        <input type="text" class="input input-bordered w-full" id="<?= phpb_e($languageCode) ?>-page-meta-title" name="meta_title[<?= phpb_e($languageCode) ?>]" value="<?= phpb_e($pageTranslations[$languageCode]['meta_title'] ?? '') ?>" />
                                    </div>

                                    <div class="form-control w-full mb-2">
                                        <label class="label" for="<?= phpb_e($languageCode) ?>-page-meta-description">
                                            <span class="label-text"><?= phpb_trans('website-manager.page-meta-description') ?></span>
                                        </label>
                                        <input type="text" class="input input-bordered w-full" id="<?= phpb_e($languageCode) ?>-page-meta-description" name="meta_description[<?= phpb_e($languageCode) ?>]" value="<?= phpb_e($pageTranslations[$languageCode]['meta_description'] ?? '') ?>" />
                                    </div>

                                    <div class="form-control w-full mb-2">
                                        <label class="label" for="<?= phpb_e($languageCode) ?>-page-route">
                                            <span class="label-text"><?= phpb_trans('website-manager.route') ?></span>
                                            <span class="label-text-alt"><?= phpb_trans('website-manager.required') ?></span>
                                        </label>
                                        <input type="text" class="input input-bordered w-full" id="<?= phpb_e($languageCode) ?>-page-route" name="route[<?= phpb_e($languageCode) ?>]" value="<?= phpb_e($pageTranslations[$languageCode]['route'] ?? '') ?>" required />
                                    </div>

                                </div>
                            </div>
                        </details>
                    <?php
                    $firstLang = false;
                    endforeach;
                    ?>

                    <div class="text-center mt-8">
                        <a href="<?= phpb_url('website_manager') ?>" class="btn btn-light btn-sm mr-1">
                            <?= phpb_trans('website-manager.back') ?>
                        </a>
                        <button class="btn btn-primary btn-sm">
                            <?php
                            if ($action === 'create'):
                                echo phpb_trans('website-manager.add-new-page');
                            else:
                                echo phpb_trans('website-manager.save-changes');
                            endif;
                            ?>
                        </button>
                    </div>

                </div>

            </form>

        </div>


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

        <table class="table table-zebra w-full">
            <thead>
            <tr>
                <th class="w-5">ID</th>
                <th><?= phpb_trans('website-manager.name') ?></th>
                <th><?= phpb_trans('website-manager.route') ?></th>
                <th class="w-44"><?= phpb_trans('website-manager.actions') ?></th>
            </tr>
            </thead>
            <tbody>
            <?php
            foreach ($pages as $page):
                ?>
                <tr>
                    <td>
                        <?= phpb_e($page->getId()) ?>
                    </td>
                    <td>
                        <?= phpb_e($page->getName()) ?>
                    </td>
                    <td>
                        <div class="hidden pl-4 pl-8"></div>
                        <div class="pl-<?= phpb_e((count(explode('/', $page->getRoute()))-2)*4) ?>">
                            <?= phpb_e($page->getRoute()) ?>
                        </div>

                    </td>
                    <td class="actions">
                        <a href="<?= phpb_e(phpb_full_url($page->getRoute())) ?>" title="<?= phpb_trans('website-manager.view') ?>" target="_blank" class="btn btn-light btn-outline btn-sm btn-circle">
                            <i class="text-xl ph-duotone ph-eye"></i>
                        </a>
                        <a href="<?= phpb_url('pagebuilder', ['page' => $page->getId()]) ?>" class="btn btn-primary btn-sm btn-circle" title="<?= phpb_trans('website-manager.edit') ?>">
                            <i class="text-xl ph-duotone ph-pencil-line"></i>
                        </a>
                        <a href="<?= phpb_url('website_manager', ['route' => 'page_settings', 'action' => 'edit', 'page' => $page->getId()]) ?>" title="<?= phpb_trans('website-manager.settings') ?>" class="btn btn-secondary btn-sm btn-circle">
                            <i class="text-xl ph-duotone ph-gear"></i>
                        </a>
                        <a href="<?= phpb_url('website_manager', ['route' => 'page_settings', 'action' => 'destroy', 'page' => $page->getId()]) ?>" title="<?= phpb_trans('website-manager.remove') ?>" class="btn btn-error btn-sm btn-circle">
                            <i class="text-xl ph-duotone ph-trash"></i>
                        </a>
                    </td>
                </tr>
            <?php
            endforeach;
            ?>
            </tbody>
        </table>


<div class="text-center mt-8">
    <a href="<?= phpb_url('website_manager', ['route' => 'page_settings', 'action' => 'create']) ?>" class="btn btn-primary">
        <?= phpb_trans('website-manager.add-new-page') ?>
    </a>
</div>

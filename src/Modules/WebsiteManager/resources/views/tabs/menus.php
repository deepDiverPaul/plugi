<?php

use Plugi\Repositories\PageRepository;

$setting = phpb_instance('setting');
$pageRepository = new PageRepository;
$pages = $pageRepository->getAll();
?>

<form method="post" action="<?= phpb_url('website_manager', ['route' => 'menus', 'action' => 'update', 'tab' => 'menus']) ?>">

    <div class="main-spacing" >

        <?php
        if (phpb_flash('message')):
            ?>
            <div class="hidden alert-success"></div>
            <div class="alert alert-<?= phpb_flash('message-type') ?> mb-6">
                <i class="text-xl ph-duotone ph-info"></i>
                <span><?= phpb_flash('message') ?></span>
            </div>
        <?php
        endif;
        ?>

        <div x-data="{menus: <?= phpb_e($menusJson) ?>, pages: <?= phpb_e($menuPagesJson) ?>}" class="flex flex-col gap-8">
            <template x-for="menu in menus">
                <div class="">
                    <div class="px-6 mb-4 flex justify-between">
                        <div class="text-2xl font-bold" x-text="menu.name"></div>
                        <div class="dropdown dropdown-end dropdown-hover" x-show="(menu.pages.length < pages.length)">
                            <label tabindex="0" class="btn btn-circle btn-sm">
                                <i class="text-2xl ph-bold ph-plus"></i>
                            </label>
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <template x-for="page in pages.filter(p=> !menu.pages.map(m=>m.id).includes(p.id))">
                                    <li>
                                        <a href="javascript:void(0)" @click="menu.pages.push(page)">
                                            <span x-text="page.id" class="mr-3 font-bold"></span>
                                            <span x-text="page.title"></span>
                                        </a>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                    <div class="">
                        <input type="hidden" :name="menu.name" :value="menu.pages.map(p=>p.id).join(',')">
                        <template x-for="(page, index) in menu.pages">
                            <div class="flex flex-nowrap gap-4 px-6 py-4 border-l border-r last:border-b border-t first-of-type:rounded-t last:rounded-b">
                                <div class="flex-none w-6" x-text="page.id"></div>
                                <div class="grow" x-text="page.title"></div>
                                <div class="flex-none w-60" x-text="page.route"></div>
                                <div class="flex-none">
                                    <button type="button" @click.stop.prevent="arraymove(menu.pages,index,index-1)" class="btn btn-outline btn-circle btn-xs" :disabled="index === 0">
                                        <i class="ph-fill ph-arrow-fat-up"></i>
                                    </button>
                                    <button type="button" @click.stop.prevent="arraymove(menu.pages,index,index+1)" class="btn btn-outline btn-circle btn-xs" :disabled="index === menu.pages.length - 1">
                                        <i class="ph-fill ph-arrow-fat-down"></i>
                                    </button>
                                    <button @click.stop.prevent="arraymove(menu.pages,index)" class="btn btn-outline btn-circle btn-error btn-xs">
                                        <i class="ph-duotone ph-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>

        <div class="text-center mt-8">
            <button class="btn btn-primary btn-sm">
                <?= phpb_trans('website-manager.save-menus'); ?>
            </button>
        </div>

    </div>

</form>

<script>
  function arraymove(arr, fromIndex, toIndex = false) {
    console.log(arr)
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    if(toIndex !== false){
      arr.splice(toIndex, 0, element);
    }
  }
</script>

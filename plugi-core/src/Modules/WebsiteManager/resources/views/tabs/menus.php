<?php

use Plugi\Repositories\PageRepository;

$setting = phpb_instance('setting');
$pageRepository = new PageRepository;
$pages = $pageRepository->getAll();
?>

<form method="post" action="<?= phpb_url('website_manager', ['route' => 'menus', 'action' => 'update', 'tab' => 'menus']) ?>">

    <div class="main-spacing" x-data="{menus: <?= phpb_e($menusJson) ?>, pages: <?= phpb_e($menuPagesJson) ?>}">

        <div class="text-center mb-8">
            <button type="button" @click.stop.prevent="menus.push({name:'New Menu',pages:[]})" class="btn btn-primary">
                <?= phpb_trans('website-manager.create-menu'); ?>
            </button>
        </div>

        <div class="flex flex-col gap-12">
            <template x-for="(menu, menuIndex) in menus">
                <div class="">
                    <div class="px-6 mb-4 flex justify-between" x-data="{ edit: false }">
                        <input type="text" x-model="menu.name" class="input input-bordered w-full max-w-xs" x-show="edit" >
                        <div class="text-2xl font-bold" x-text="menu.name" x-show="!edit"></div>
                        <div>
                            <a href="javascript:void(0)" class="btn btn-square btn-sm" @click="edit = !edit">
                                <i class=" text-2xl ph ph-pencil-line"></i>
                            </a>
                            <a href="javascript:void(0)" class="btn btn-square btn-sm" @click="if (confirm(`<?= phpb_trans('website-manager.delete-menu') ?> ${menu.name}`) === true) arraymove(menus,menuIndex);">
                                <i class=" text-2xl ph ph-trash"></i>
                            </a>
                            <div class="dropdown dropdown-end dropdown-hover" x-show="(menu.pages.length < pages.length)">
                                <label tabindex="0" class="btn btn-square btn-sm">
                                    <i class=" text-2xl ph ph-list-plus"></i>
                                </label>
                                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
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
                    </div>
                    <input type="hidden" :name="menu.name" :value="menu.pages.map(p=>p.id).join(',')">
                    <table class="table table-zebra w-full" x-show="menu.pages.length > 0">
                        <thead>
                        <tr>
                            <th class="w-5">ID</th>
                            <th class="w-5/12"><?= phpb_trans('website-manager.name') ?></th>
                            <th><?= phpb_trans('website-manager.route') ?></th>
                            <th class="w-36"><?= phpb_trans('website-manager.actions') ?></th>
                        </tr>
                        </thead>
                        <tbody>
                        <template x-for="(page, index) in menu.pages">
                            <tr>
                                <th x-text="page.id"></th>
                                <td x-text="page.title"></td>
                                <td x-text="page.route"></td>
                                <td>
                                    <button type="button" @click.stop.prevent="arraymove(menu.pages,index,index-1)" class="btn btn-outline btn-circle btn-sm" :disabled="index === 0">
                                        <i class="ph-duotone ph-arrow-fat-up text-xl"></i>
                                    </button>
                                    <button type="button" @click.stop.prevent="arraymove(menu.pages,index,index+1)" class="btn btn-outline btn-circle btn-sm" :disabled="index === menu.pages.length - 1">
                                        <i class="ph-duotone ph-arrow-fat-down text-xl"></i>
                                    </button>
                                    <button @click.stop.prevent="arraymove(menu.pages,index)" class="btn btn-outline btn-circle btn-error btn-sm">
                                        <i class="ph-duotone ph-trash text-xl"></i>
                                    </button>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                </div>
            </template>
        </div>

        <div class="text-center mt-8">
            <button class="btn btn-primary">
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
  function addMenu(arr) {

  }
</script>

<?php

namespace PHPageBuilder\Repositories;

use PHPageBuilder\Contracts\MenuRepositoryContract;

class MenuRepository extends BaseRepository implements MenuRepositoryContract
{
    /**
     * The pages database table.
     *
     * @var string
     */
    protected $table = 'menus';

    /**
     * Replace all website menus by the given data.
     *
     * @param array $data
     * @return bool|object|null
     */
    public function updateMenus(array $data)
    {
        $this->destroyAll();

        foreach ($data as $key => $value) {
            $this->create([
                'name' => $key,
                'pages' => $value,
            ]);
        }

        return true;
    }

    /**
     * Get one hydrated menu with the given name.
     *
     * @param string $name
     * @return array|null
     */
    public function getHydratedMenu(string $name)
    {
        $pageRepository = new PageRepository;
        $pages = $pageRepository->getAll();
        $menu = $this->findWhere('name', $name)[0];
        $menuPages = explode(',',$menu['pages']);
        $hyMenuPages = [];
        foreach ($pages as $page) {
            $key = array_search($page->getId(), $menuPages);
            if($key === false) continue;
            $hyMenuPages[$key] = [
                'id' => $page->getId(),
                'title' => $page->getName(),
                'route' => $page->getRoute()
            ];
        }
        ksort($hyMenuPages);

        $hyMenu = [
            'name' => $menu['name'],
            'pageIds' => $menu['pages'],
            'pages' => $hyMenuPages,
        ];
        return $hyMenu;
    }

    /**
     * Get all hydrated menus with the given name.
     *
     * @return array
     */
    public function getHydratedMenus()
    {
        $menus = [];

        foreach ($this->getAll() as $entry){
            $menus[] = $this->getHydratedMenu($entry['name']);
        }

        return $menus;
    }
}

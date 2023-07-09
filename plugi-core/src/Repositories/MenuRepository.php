<?php

namespace Plugi\Repositories;

use Plugi\Contracts\MenuRepositoryContract;
use Plugi\Contracts\PageTranslationContract;

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
     * Get one language switcher menu
     *
     * @return array|null
     */
    public function getLanguageMenu($id)
    {
        $menu = [];
        $pageTranslationsRepo = new PageTranslationRepository();
        $pageTranslations = $pageTranslationsRepo->findWhere('page_id', $id);
        foreach ($pageTranslations as $pageTranslation) {
            $langMenuPage = [
                'id' => $id,
                'title' => phpb_trans('languages.'.$pageTranslation->locale),
                'lang' => $pageTranslation->locale,
                'route' => $pageTranslation->route
            ];
            $menu[] = $langMenuPage;
        }
        return $menu;
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
        $pageTranslationsRepo = new PageTranslationRepository();
        $pages = $pageRepository->getAll();
        $menu = $this->findWhere('name', $name)[0];
        $menuPages = explode(',',$menu['pages']);
        $hyMenuPages = [];
        foreach ($pages as $page) {
            $key = array_search($page->getId(), $menuPages);
            if($key === false) continue;
            $hyMenuPage = [
                'id' => $page->getId(),
                'title' => $page->getName(),
                'route' => $page->getRoute()
            ];
            $pageTranslations = $pageTranslationsRepo->findWhere('page_id', $page->getId());
            foreach ($pageTranslations as $pageTranslation) {
                if ($pageTranslation->locale !== phpb_current_language()) continue;
                $hyMenuPage['route'] = $pageTranslation->route;
                $hyMenuPage['title'] = $pageTranslation->title;
            }

            $hyMenuPages[$key] = $hyMenuPage;
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

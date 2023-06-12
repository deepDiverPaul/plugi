<?php

namespace Plugi\Contracts;

interface MenuRepositoryContract
{
    /**
     * Replace all menus by the given data.
     *
     * @param array $data
     * @return bool|object|null
     */
    public function updateMenus(array $data);

    /**
     * Get one hydrated menu with the given name.
     *
     * @param string $name
     * @return object|null
     */
    public function getHydratedMenu(string $name);

    /**
     * Get all hydrated menus with the given name.
     *
     * @return array
     */
    public function getHydratedMenus();
}

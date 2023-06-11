<?php

namespace Plugi;

use Plugi\Contracts\PageContract;
use Plugi\Contracts\PageTranslationContract;
use Plugi\Repositories\PageRepository;

#[\AllowDynamicProperties]
class PageTranslation implements PageTranslationContract
{
    /**
     * Return the page this translation belongs to.
     *
     * @return PageContract
     */
    public function getPage()
    {
        $foreignKey = phpb_config('page.translation.foreign_key');
        return (new PageRepository)->findWithId($this->{$foreignKey});
    }
}

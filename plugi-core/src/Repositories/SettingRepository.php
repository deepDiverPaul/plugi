<?php

namespace Plugi\Repositories;

use Plugi\Contracts\SettingRepositoryContract;

class SettingRepository extends BaseRepository implements SettingRepositoryContract
{
    /**
     * The pages database table.
     *
     * @var string
     */
    protected $table = 'settings';

    /**
     * Replace all website settings by the given data.
     *
     * @param array $data
     * @return bool|object|null
     */
    public function updateSettings(array $data)
    {

        foreach ($data as $key => $value) {
            $isArray = is_array($value) ? 1 : 0;
            if ($isArray) {
                $value = implode(',', $value);
            }
            $ins = $this->findWhere('setting', $key);
            if (empty($ins)) {
                $this->create([
                    'setting' => $key,
                    'value' => $value,
                    'is_array' => $isArray,
                ]);
            } else {
                $this->update($ins[0], [
                    'setting' => $key,
                    'value' => $value,
                    'is_array' => $isArray,
                ]);
            }

        }

        return true;
    }
}

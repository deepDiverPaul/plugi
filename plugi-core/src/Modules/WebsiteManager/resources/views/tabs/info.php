<?php

use Plugi\Setting;

?>
<div class="overflow-x-auto">
    <table class="table table-zebra">
        <tbody>
        <tr>
            <th class="w-36 md:w-60">PHP Version</th>
            <td><?= phpversion() ?></td>
        </tr>
        <tr>
            <th>Database</th>
            <td>
                <form method="post" action="<?= phpb_url('website_manager', ['route' => 'database', 'action' => 'update']) ?>">
                <?php
                global $phpb_db;
                $diff = $phpb_db->diffDB();
                $actionNeeded = false;
                if (Setting::get('db-definition') !== $phpb_db->getDBDefinitionHash()) $actionNeeded = true;
                foreach ($diff as $table => $tableDiff) :
                    if(!is_array($tableDiff)) $actionNeeded = true;
                    if(is_array($tableDiff) && empty($tableDiff['columns']) && empty($tableDiff['uniqueKeys'])) continue;
                ?>
                <div>
                    table <strong><?= phpb_e($table) ?></strong> (<?= phpb_e(is_array($tableDiff) ? (empty($tableDiff['columns']) && empty($tableDiff['uniqueKeys']) ? 'is fine' : 'has diff') : 'is not existent') ?>)
                </div>
                        <?php
                        if (is_array($tableDiff)) :
                        foreach ($tableDiff['columns'] as $column => $def) :
                            $actionNeeded = true;
                        ?>
                        <div class="ml-4">
                            <i class="ph ph-arrow-elbow-down-right"></i> column <strong><?= phpb_e($column) ?></strong> (not existent)
                        </div>
                        <?php
                        endforeach;
                        endif;
                        ?>
                        <?php
                        if (is_array($tableDiff)) :
                        foreach ($tableDiff['uniqueKeys'] as $key => $def) :
                            $actionNeeded = true;
                        ?>
                        <div class="ml-4">
                            <i class="ph ph-arrow-elbow-down-right"></i> unique key <strong><?= phpb_e($key) ?></strong> (not existent)
                        </div>
                        <?php
                        endforeach;
                        endif;
                        ?>
                    <?php
                    endforeach;
                    if ($actionNeeded) :
                    ?>
                    <button class="btn" type="submit">Update</button>
                    <?php
                    else :
                    ?>
                    <div>Database is up-to-date. <span class="hidden md:inline text-gray-400">(<?= $phpb_db->getDBDefinitionHash() ?>)</span></div>
                    <?php
                    endif;
                    ?>

                </form>
            </td>
        </tr>
        <tr>
            <th class="align-top">Installed extensions</th>
            <td x-data="{show: false}">
                <ul>
                    <?php
                    foreach (\Plugi\Extensions::getConfigs() as $ext) :
                        ?>
                        <li>
                            <?= phpb_e($ext['title']) ?> (<?= phpb_e($ext['version']) ?>)
                        </li>
                    <?php
                    endforeach;
                    ?>
                </ul>
                <div>
                    <button @click="show = !show" class="btn btn-xs btn-outline" x-text="show ? 'hide' : 'show config'"></button>
                </div>
                <pre class="mt-4" x-show="show"><?php
print_r(\Plugi\Extensions::getConfigs());
?></pre>
            </td>
        </tr>
        <tr>
            <th class="align-top">Config</th>
            <td x-data="{show: false}">
                <div>
                    <button @click="show = !show" class="btn btn-xs btn-outline" x-text="show ? 'hide' : 'show'"></button>
                </div>
                <pre class="mt-4" x-show="show"><?php
print_r(phpb_config());
                    ?></pre>
            </td>
        </tr>
        <tr>
            <th class="align-top">Environment</th>
            <td x-data="{show: false}">
                <div class="">
                    <button @click="show = !show" class="btn btn-xs btn-outline" x-text="show ? 'hide' : 'show'"></button>
                </div>
                <pre class="mt-4" x-show="show"><?php
print_r([
        'STAGE'=>$_ENV['STAGE'],
        'BASE_URL'=>$_ENV['BASE_URL']
]);
                    ?></pre>
            </td>
        </tr>
        </tbody>
    </table>
</div>

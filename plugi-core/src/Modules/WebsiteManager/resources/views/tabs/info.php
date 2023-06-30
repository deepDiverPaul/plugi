<div class="overflow-x-auto">
    <table class="table table-zebra">
        <tbody>
        <tr>
            <th class="w-60">PHP Version</th>
            <td><?= phpversion() ?></td>
        </tr>
        <tr>
            <th class="w-60">Database</th>
            <td>
                <form method="post" action="<?= phpb_url('website_manager', ['route' => 'database', 'action' => 'update', 'tab' => 'info']) ?>">
                <?php
                global $phpb_db;
                $diff = $phpb_db->diffDB();
                $actionNeeded = false;
                foreach ($diff as $table => $tableDiff) :
                    if(!is_array($tableDiff)) $actionNeeded = true;
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
                    endif;
                    ?>

                </form>
            </td>
        </tr>
        <tr>
            <th class="align-top">Installed extensions</th>
            <td>
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
            </td>
        </tr>
        </tbody>
    </table>
</div>

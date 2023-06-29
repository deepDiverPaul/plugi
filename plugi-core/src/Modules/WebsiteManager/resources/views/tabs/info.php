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
                <?php
                global $phpb_db;
                $tables = include __DIR__.'/../../../../../../config/tables.php';
                foreach ($tables as $table => $structure) :
                ?>
                <li>
                    <?= phpb_e($table) ?> (<?= phpb_e($phpb_db->tableExists($table) ? 'yes' : 'no') ?>)
                    <ul>
                        <li></li>
                    </ul>
                </li>
                <?php
                endforeach;
                ?>
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

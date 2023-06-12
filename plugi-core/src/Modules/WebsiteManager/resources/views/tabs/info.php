<div class="overflow-x-auto">
    <table class="table table-zebra">
        <tbody>
        <!-- row 1 -->
        <tr>
            <th class="w-60">PHP Version</th>
            <td><?= phpversion() ?>n</td>
        </tr>
        <!-- row 2 -->
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

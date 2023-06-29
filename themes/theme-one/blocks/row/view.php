<div class="row p-3 flex flex-nowrap gap-3">
    <?php
    $columnCount = intval($block->setting('column_count'));
    for ($i = 0; $i < $columnCount; $i++):
        ?>
            [block slug="col" id="col<?= $i ?>"]
    <?php
    endfor;
    ?>
</div>

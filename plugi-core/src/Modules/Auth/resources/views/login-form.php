<div class="py-5 text-center">
    <h2><?= phpb_trans('auth.title') ?></h2>
</div>

<form class="login-form mt-3 flex flex-col gap-3 items-center" method="post" action="<?= phpb_url('auth', ['action' => 'login']) ?>">
    <?php
    if (phpb_flash('message')):
    ?>
    <div class="alert alert-<?= phpb_flash('message-type') ?>">
        <?= phpb_flash('message') ?>
    </div>
    <?php
    endif;
    ?>

    <input type="text" name="username" class="input input-bordered w-full max-w-xs" placeholder="<?= phpb_trans('auth.username') ?>" required autofocus>
    <input type="password" name="password" class="input input-bordered w-full max-w-xs" placeholder="<?= phpb_trans('auth.password') ?>" required>

    <button class="btn btn-outline btn-primary w-full max-w-xs" type="submit"><?= phpb_trans('auth.login-button') ?></button>
</form>

<div class="mb-8 flex justify-center">
    <input type="file" id="fileupload" class="file-input file-input-bordered file-input-primary w-full max-w-md" name="fileupload" onchange="uploadFile()" onselect="uploadFile()" />
</div>

<div class="flex flex-wrap justify-center gap-4">
<?php
foreach ($files as $file) :
?>
    <div class="relative">
        <img src="<?= phpb_e($file->getUrl()) ?>" alt="<?= phpb_e($file->public_id) ?>" class="h-40 rounded">
        <div class="absolute top-1 right-1">
            <button onclick="deleteFile('<?= phpb_e($file->public_id) ?>')" class="btn btn-error btn-circle btn-sm mb-2">
                <i class="ph-duotone ph-trash"></i>
            </button>
        </div>
    </div>
<?php
endforeach;
?>
<?php
if (count($files) === 0) :
?>
    <div class="relative">
        No files...
    </div>
<?php
endif;
?>
</div>

<script>
  async function uploadFile() {
    let formData = new FormData();
    const fileupload = document.getElementById('fileupload');
    formData.append("files", fileupload.files[0]);
    await fetch('<?= phpb_url('pagebuilder', ['action' => 'upload', 'page' => '1']) ?>', {
      method: "POST",
      body: formData
    }).then(() => {
      location.reload();
    }).catch(() => {alert('An Error occured.')});
  }
  async function deleteFile(id) {
    let formData = new FormData();
    formData.append("id", id);
    await fetch('<?= phpb_url('pagebuilder', ['action' => 'upload_delete', 'page' => '1']) ?>', {
      method: "POST",
      body: formData
    }).then(() => {
      location.reload();
    }).catch(() => {alert('An Error occured.')});
  }
</script>

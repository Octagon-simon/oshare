<?php
require('core/functions.php');
cors();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        if (isset($_FILES['multi_files']) && !empty($_FILES['multi_files']) && isset($_POST['timezone']) && !empty($_POST['timezone'])) {
            $zip = new ZipArchive();
            $target_dir = UPLOAD_DIR;
            $in_dir_name = $file_name = "myFiles-" . uniqid() . '-' . rand(0000, 9999) . '.zip';
            //var_dump($_FILES);
            //check if file can be created
            if ($zip->open($target_dir . $file_name, ZipArchive::CREATE) === TRUE) {
                //loop through uploaded files
                foreach ($_FILES['multi_files']['tmp_name'] as $ind => $tmpName) {
                    //add the file, the rename it
                    $zip->addFile($tmpName, $_FILES['multi_files']['name'][$ind]);
                }
                // All files are added, so close the zip file.
                $zip->close();
            } else {
                doReturn(500, false, array(
                    "message" => "A server error has occured"
                )
                );
            }
            $file_id = 'mul-' . generateRandomString();
            //upload the file
            if (true) {
                $fileUploadStamp = time();
                //save to database
                $db->Insert("INSERT INTO files (file_id, file_name, in_dir_name, file_upload_date, exp_time, timezone) VALUES (:id, :name, :in_dir_name, :date, :expTime, :timezone)", [
                    "id" => $file_id,
                    "name" => $file_name,
                    "in_dir_name" => $in_dir_name,
                    "date" => $fileUploadStamp,
                    "expTime" => strtotime("+24 hours", $fileUploadStamp),
                    "timezone" => $_POST['timezone']
                ]);
                //do link shorten
                $shortLink = doCuttly(DOWNLOAD_URL . $file_id);
                doReturn(200, true, array(
                    "link" => $shortLink,
                    "file_id" => $file_id,
                    "message" => "File uploaded successfully"
                )
                );
            }
        } else {
            doReturn(400, false, array(
                "message" => "Some required parameters are missing"
            )
            );
        }
    } catch (Exception $e) {
        error_log($e);
        doReturn(500, false, array(
            "message" => "A server error has occured"
        ));
    }
} else {
    doReturn(400, false, array(
        "message" => "invalid request method"
    ));
}
?>
<?php
require('core/functions.php');
cors();

if($_SERVER['REQUEST_METHOD'] == "POST"){
    try{
        if(isset($_FILES['single_file']) && !empty($_FILES['single_file']) && isset($_POST['timezone']) && !empty($_POST['timezone'])){
            $target_dir = UPLOAD_DIR;
            $file_name = $_FILES["single_file"]["name"];
            $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
            $file_id = generateRandomString();
            $toUpload = $target_dir . basename(md5($_FILES["single_file"]["name"]).'.'.$file_ext);
            //upload the file
            if(move_uploaded_file($_FILES["single_file"]["tmp_name"], $toUpload)){
                $fileUploadStamp = time();
                //save to database
                $db->Insert("INSERT INTO FILES (file_id, file_name, in_dir_name, file_upload_date, exp_time, timezone) VALUES (:id, :name, :in_dir_name, :date, :expTime, :timezone)", [
                    "id" => $file_id,
                    "name" => $file_name,
                    "in_dir_name" => md5($file_name).'.'.$file_ext,
                    "date" => $fileUploadStamp,
                    "expTime" => strtotime("+24 hours",$fileUploadStamp),
                    "timezone" => $_POST['timezone']
                ]);
                //do link shorten
                $shortLink = doCuttly(DOWNLOAD_URL.$file_id);
                doReturn(200, true, array(
                    "link" => $shortLink,
                    "file_id" => $file_id,
                    "message" => "File uploaded successfully"
                ));
            }else{
                doReturn(400, false, array(
                    "link" => "",
                    "message" => "Couldn't upload file, please try again"
                ));
            }
        }else{
            doReturn(400, false, array(
                "message" => "Some required parameters are missing"
            ));
        }
    }catch(Exception $e){
        error_log($e);
        doReturn(500, false, array(
            "message" => "A server error has occured"
        ));
    }
}else{
    doReturn(400, false, array(
        "message" => "invalid request method"
    ));
}
?>
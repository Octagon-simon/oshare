<?php
require('core/functions.php');
cors();

if($_SERVER['REQUEST_METHOD'] == "GET"){
    try{
        if(isset($_GET['fileId']) && !empty($_GET['fileId'])){
            //get file data
            //id	user_id	file_id	file_name	file_views	file_downloads	file_last_download_date	file_upload_date	exp_time	timezone
            $data = $db->SelectOne("SELECT * FROM files WHERE file_id = :fileId", 
            ['fileId' => $_GET['fileId']]);
            if($data){
                //check if it has expired
                $currentDate = formatDate(time(), $data['timezone']);
                $toExpire = formatDate($data['exp_time'], $data['timezone']);
                if(strtotime($currentDate) >= strtotime($toExpire)){ 
                    //unlink file
                    unlink(UPLOAD_DIR.$data['in_dir_name']);
                    //delete file data
                    $db->Remove("DELETE FROM files WHERE id = :id", ['id' => $data['id']]);
                    //return message
                    doReturn(400, false, array(
                        "message" => "This File has expired"
                    ));
                }else{
                    $downloads = (!empty($data['file_downloads'])) ? intval($data['file_downloads']) : 0;
                    //update views
                    $db->Update("UPDATE files SET file_downloads = :d, file_last_download_date = :date WHERE id = :id", ['date' => time(), 'd' => $downloads + 1, 'id' => $data['id']]);
                    //reset the expiry time
                    //return file meta
                    doReturn(200, true, array(
                        //change this to download dir
                        "download_link" => DOWNLOAD_DIR.$data['in_dir_name']
                    ));
                }
            }else{
                doReturn(400, false, array(
                    "message" => "File does not exist"
                ));
            }
        }else{
            doReturn(400, false, array(
                "message" => "File link is required!"
            ));
        }
    }catch(Exception $e){
        var_dump($e);
        doReturn(500, false, array(
            "message" => "A server error has occured"
        ));
    }
}else{
    doReturn(400, false, array(
        "message" => "Invalid request method"
    ));
}
?>
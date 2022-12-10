<?php
require('core/functions.php');
cors();
clearstatcache();

if($_SERVER['REQUEST_METHOD'] == "GET"){
    try{
        if(isset($_GET['fileId']) && !empty($_GET['fileId'])){
            //get file data
            //id	user_id	file_id	file_name	file_views	file_downloads	file_last_download_date	file_upload_date	exp_time	timezone
            $data = $db->SelectOne("SELECT *, files.file_id AS fileId FROM files LEFT JOIN views ON files.file_id = views.file_id WHERE files.file_id = :fileId", 
            ['fileId' => $_GET['fileId']]);
            //check if data & file both exists
            if($data && file_exists(UPLOAD_DIR.$data['in_dir_name'])){
                //remove user_id
                unset($data['user_id']);
                //check if it has expired
                $currentDate = formatDate(time(), $data['timezone']);
                $toExpire = formatDate($data['exp_time'], $data['timezone']);
                if(strtotime($currentDate) >= strtotime($toExpire)){ 
                    //unlink file
                    unlink(UPLOAD_DIR.$data['in_dir_name']);
                    //delete file data
                    $db->Remove("DELETE FROM files WHERE file_id = :id", ['id' => $data['fileId']]);
                    //return message
                    doReturn(400, false, array(
                        "message" => "This File has expired"
                    ));
                }else{
                    $fileViews = $db->SelectOne("SELECT * FROM views WHERE file_id = :id", ['id' => $data['fileId']]);
                    $views = (!empty($fileViews['file_views'])) ? intval($fileViews['file_views']) : 0;
                    //file views
                    if($fileViews){
                        $ip = (!empty($fileViews['ip_address'])) ? json_decode($fileViews['ip_address']) : [];
                        //check if ip address has been saved before
                        if(!in_array($_SERVER['REMOTE_ADDR'], $ip)){
                            //save ip address
                            $ip[] = $_SERVER['REMOTE_ADDR'];
                            //update views
                            $db->Update("UPDATE views SET file_views = :views, ip_address = :ip WHERE id = :id", ['views' => $views + 1, 'ip' => json_encode($ip), 'id' => $fileViews['id']]);
                        }
                    }else{
                        $ip[] = $_SERVER['REMOTE_ADDR'];
                        //new view
                        $db->Insert("INSERT INTO views (file_id, ip_address, file_views) VALUES (:id, :ip, :views)", ['id' => $data['fileId'], 'ip' => json_encode($ip), 'views' => $views + 1]);
                    }
                    
                    //reset the expiry time
                    $data['exp_time'] = $toExpire;
                    $data['file_last_download_date'] = $data['file_last_download_date'] ?  formatDate(intval($data['file_last_download_date']), $data['timezone']) : null;
                    $data['file_size'] = filesize(UPLOAD_DIR.$data['in_dir_name']);  
                    //remove private vars
                    unset($data['ip_address']);
                    unset($data['id']);
                    unset($data['in_dir_name']); 
                    //return file meta
                    doReturn(200, true, $data);
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
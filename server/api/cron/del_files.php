<?php
//import fxns file
require('../core/functions.php');

//get all files
$files = $db->SelectAll("SELECT * FROM files", []);

//loop through array
foreach($files as $key => $file){
    //check if time has passed and if the file exists
    if( (time() > intval($file['exp_time'])) && file_exists('../'.UPLOAD_DIR.$file['in_dir_name']) ){
        //remove the file
        unlink('../'.UPLOAD_DIR.$file['in_dir_name']);
        //delete record from db
        $db->Remove("DELETE FROM files WHERE file_id = :id", ['id' => $file['file_id']]);
    }
}

?>
<?php
//load constants
require_once('env.php');
require('db.php');
// Set Timezone
date_default_timezone_set( TIMEZONE );
$db = new DatabaseClass();

function doReturn(int $status = 400, bool $success = false, $data)
{
    //Easily print out errors to the user
    $retval = array(
        "success" => $success,
        "data" => $data
    );
    http_response_code($status);
    return (print_r(json_encode($retval)) . exit());
}
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.rand(0000,9999);
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function doCuttly(string $url){
    $url = urlencode($url);
    $api_key = CUTTLY_API;
    $json = file_get_contents("https://cutt.ly/api/api.php?key=$api_key&short=$url");
    $data = json_decode ($json, true);
    if(!empty($data['url'])){
        return $data['url']['shortLink'];
    }
    return false;
}
function formatDate($stamp, $timeZonePassed = "UTC") {
    if(!$timeZonePassed) $timeZonePassed = "UTC";
    $stamp *= 1;
    $UTC = new DateTimeZone("UTC");
    $date= date('Y-m-d H:i:s', $stamp); 
    $dateConv = new DateTime( $date, $UTC  );
    $dateFormat ='m/d/Y h:i A';
    
    $dateConv->setTimezone(new DateTimeZone($timeZonePassed));
    return $dateConv->format($dateFormat);
}
/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - https://fetch.spec.whatwg.org/#http-cors-protocol
 *
 */
function cors() {
    
    // Allow from any origin
    if (true) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: ORIGIN");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
}
?>
<?php
header("Access-Control-Allow-Origin: *");
// DB CONSTANTS
define('DB_DRIVER', 'mysqli');
define('DB_HOSTNAME', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_DATABASE', 'opencart-2');
define('DB_PREFIX', 'oc_');

switch($_GET['action'])  {

    case 'signup_user' :
        signupUser($_REQUEST); 
        break;

    case 'reset_password' :
        resetPassword($_REQUEST); 
        break;

    case 'login_user' :
        loginUser($_REQUEST); 
        break;
}

function openDbConn() {

	// Check connection
	$con=mysqli_connect(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	return $con;
	//mysqli_close($con);
}

function closeConn($con) {
	mysqli_close($con);
}

function userExists($email) {
	
	$con = openDbConn();
	$sql=  "SELECT `email` FROM `".DB_PREFIX."customer` WHERE `email` ='" . $email . "'";
	$res = mysqli_query($con,$sql);
	return mysqli_num_rows($res);
	
}


function loginUser($p_data) {

	$con = openDbConn();
	$data = json_decode($p_data['data']);
    $email      = $data->email;
    $password      = $data->password;

	$sql=  "SELECT * FROM `".DB_PREFIX."customer` WHERE `email` ='" . $email . "' AND `password` ='" . $password . "'";
	$res = mysqli_query($con,$sql);
    if (!mysqli_num_rows($res)) {
		$arr = array('msg' => "error", 'error' => 'User does not exists');
    } else {
		$row = mysqli_fetch_array($res);
		$arr = array('msg' => "success", 'success' => 'User Logged Successfully', 'user_data' =>$row);
    }

	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;

}

function signupUser($p_data) {
	
	$con = openDbConn();
	$data = json_decode($p_data['data']);
    //$data = json_decode(file_get_contents("php://input")); 
    
    $firstname     = $data->firstname;
    $lastname      = $data->lastname;   
    $phone      = $data->phone;
    $email      = $data->email;
    $password      = $data->password;    

    if (!userExists($email)) {

		$sql=  "INSERT INTO `".DB_PREFIX."customer`(`firstname`,`lastname`,`email`,`password`) VALUES('".$firstname."','".$lastname."','".$email."','".$password."') ";
		$res = mysqli_query($con,$sql);
		$insert_id = mysqli_insert_id($con);
		closeConn($con);
		if ($insert_id > 0) {
			$arr = array('msg' => "success", 'success' => 'User Registered Successfully', 'insert_id' =>$insert_id);
		} else {
			$arr = array('msg' => "error", 'error' => 'User Not Registered Successfully', 'insert_id' =>0);
		}
    } else {
		$arr = array('msg' => "error", 'error' => 'User already exists', 'insert_id' =>0);
    }

	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;
}


function resetPassword($p_data) {
	
	$con = openDbConn();
	$data = json_decode($p_data['data']);
    //$data = json_decode(file_get_contents("php://input")); 
    $email      = $data->email;

    if (!userExists($email)) {
		$arr = array(
			'msg' => "error",
			'error' => 'Email does not exists'
		);
    } else {
		$arr = array(
			'msg' => "success",
			'success' => 'Password reset email had been send to registered email, please click the link in email to reset the password!'
		);
    }

	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;
}




?>
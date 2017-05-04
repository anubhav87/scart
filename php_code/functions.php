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

    case 'get_categories' :
        getCategories($_REQUEST); 
        break;

    case 'get_products_by_category' :
        getProductsByCategory($_REQUEST); 
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

function getCategories() {
	
	$con = openDbConn();

	$sql=  "SELECT cp.category_id AS category_id, GROUP_CONCAT(cd1.name ORDER BY cp.level SEPARATOR '  >  ') AS name, c1.parent_id, c1.sort_order FROM oc_category_path cp LEFT JOIN oc_category c1 ON (cp.category_id = c1.category_id) LEFT JOIN oc_category c2 ON (cp.path_id = c2.category_id) LEFT JOIN oc_category_description cd1 ON (cp.path_id = cd1.category_id) LEFT JOIN oc_category_description cd2 ON (cp.category_id = cd2.category_id) WHERE cd1.language_id = '1' AND cd2.language_id = '1' GROUP BY cp.category_id ORDER BY name ASC LIMIT 0,100";
	$res = mysqli_query($con,$sql);
    if (!mysqli_num_rows($res)) {
		$arr = array (
			'msg' => "error",
			'success' => 'No categories found!'
		);    	
    } else {
    	$data = array();
    	while ($row = mysqli_fetch_array($res)) {

			$row_data = array();
			$row_data['category_id'] = $row['category_id'];
			$row_data['name'] = $row['name'];
			$row_data['parent_id'] = $row['parent_id'];
			$row_data['sort_order'] = $row['sort_order'];
    		array_push($data, $row_data);
    	}
		$arr = array (
			'msg' => "success",
			'categories' => $data,
			'success' => 'Categoreis found and returned!'
		);    	
    }


	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;
}

function getProductsByCategory($req_data) {
	
	//$con = openDbConn();
	//print_r($req_data['category_id']);
	$token = checkApiSession();

	// Working code to get the products by category id
	$url = 'http://localhost/opencart-2/index.php?route=api/custom/productsbycategory&token='.$token;
	$fields = array (
		'category_id' => $req_data['category_id'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);

	$arr = array (
		'msg' => "success",
		'products' => $data->products,
		'success' => 'Products found and returned!'
	);
	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;

	// $url = 'http://localhost/opencart-2/index.php?route=api/custom/getcategory&token='.$ret_data->cookie;
	// $fields = array(
	//   'category_id' => 60,
	// );
	// $json = do_curl_request($url,$fields);
	// $data = json_decode($json);
	 
	// print_r("</br></br>"); 
	// var_dump($data);	
}

function do_curl_request($url, $params=array()) {
  $ch = curl_init();
  curl_setopt($ch,CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_COOKIEJAR, '/tmp/apicookie.txt');
  curl_setopt($ch, CURLOPT_COOKIEFILE, '/tmp/apicookie.txt');
 
  $params_string = '';
  if (is_array($params) && count($params)) {
    foreach($params as $key=>$value) {
      $params_string .= $key.'='.$value.'&';
    }
    rtrim($params_string, '&');
 
    curl_setopt($ch,CURLOPT_POST, count($params));
    curl_setopt($ch,CURLOPT_POSTFIELDS, $params_string);
  }
 
  //execute post
  $result = curl_exec($ch);
 
  //close connection
  curl_close($ch);
 
  return $result;
}

function checkApiSession() {

	$url = 'http://localhost/opencart-2/index.php?route=api/login';
	 
	$fields = array(
	  'username' => 'admin',
	  'password' => 'blV2oxA7WGykj3JurYx5nSZiocLLnNLFn6vBai57sgVpLzQsLJRhWFBwGZOGygZEtN5rOTS3FFV8de21XBrNiUhcb8GvbUHVOttKMdHpfQqHA3GT86umeOtoEOjMGakjEC2HVFPJBS5CqjdKFm3Hxa40nsPyVO4VFxLvtLoR60zUMZll63CUu8CcABeY0YyqRy3TywCHXVJ2oh4zV8xcf4xSZtXudmcJjroKGmrk425gBpfaxEFIBHQbiaEa6Ykz',
	);
	 
	$json = do_curl_request($url, $fields);
	$ret_data = json_decode($json);
	return $ret_data->cookie;	
}


?>
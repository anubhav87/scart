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
        //getProductsByCategory($_REQUEST); 
        getProductsByCategory($_REQUEST);
        break;

    case 'get_product_details_by_product_id' :
        //getProductsByCategory($_REQUEST); 
        getProductDetailsByProductId($_REQUEST);
        break;

    case 'add_to_cart' :
        //getProductsByCategory($_REQUEST); 
        addTocart($_REQUEST);
        break;

    case 'remove_from_cart' :
        removeFromcart($_REQUEST);
        break;

    case 'get_cart_products' :
        getCartProducts();
        break;

    case 'add_order' :
        addOrder();
        break;

    case 'apply_coupon' :
        applyCoupon($_REQUEST);
        break;

    case 'update_product_quantity' :
        updateProductQuantity($_REQUEST);
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


function getCategoriesOld() {
	
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

function getProductDetailsByProductId($req_data) {

	$token = checkApiSession();
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/custom/getproductdetails&token='.$token;
	$fields = array (
		'product_id' => $req_data['product_id'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);
	$arr = array (
		'msg' => "success",
		'product_details' => $data->product_details,
		'success' => 'Product details found and returned!'
	);
	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;



//	$data = getProduct($req_data['product_id']);
	// if(!empty($data)) {
	// 	$arr = array (
	// 		'msg' => "success",
	// 		'product_details' => $data,
	// 		'success' => 'Product details found and returned!'
	// 	);    	
	// } else {
	// 	$arr = array (
	// 		'msg' => "error",
	// 		'success' => 'Product details not found!'
	// 	);    	
	// }

	// sleep(1);
 //    $jsn = json_encode($arr);
 //    echo $jsn;

}

function getProductDetailsByProductIdOld($req_data) {

	$data = getProduct($req_data['product_id']);
	if(!empty($data)) {
		$arr = array (
			'msg' => "success",
			'product_details' => $data,
			'success' => 'Product details found and returned!'
		);    	
	} else {
		$arr = array (
			'msg' => "error",
			'success' => 'Product details not found!'
		);    	
	}

	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;

}

function getProductsByCategoryOld($req_data) {

	$con = openDbConn();
	$sql = "SELECT p.product_id, (SELECT AVG(rating) AS total FROM oc_review r1 WHERE r1.product_id = p.product_id AND r1.status = '1' GROUP BY r1.product_id) AS rating, (SELECT price FROM oc_product_discount pd2 WHERE pd2.product_id = p.product_id AND pd2.customer_group_id = '1' AND pd2.quantity = '1' AND ((pd2.date_start = '0000-00-00' OR pd2.date_start < NOW()) AND (pd2.date_end = '0000-00-00' OR pd2.date_end > NOW())) ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS discount, (SELECT price FROM oc_product_special ps WHERE ps.product_id = p.product_id AND ps.customer_group_id = '1' AND ((ps.date_start = '0000-00-00' OR ps.date_start < NOW()) AND (ps.date_end = '0000-00-00' OR ps.date_end > NOW())) ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS special FROM oc_product_to_category p2c LEFT JOIN oc_product p ON (p2c.product_id = p.product_id) LEFT JOIN oc_product_description pd ON (p.product_id = pd.product_id) LEFT JOIN oc_product_to_store p2s ON (p.product_id = p2s.product_id) WHERE pd.language_id = '1' AND p.status = '1' AND p.date_available <= NOW() AND p2s.store_id = '0' AND p2c.category_id = '".$req_data['category_id']."' GROUP BY p.product_id ORDER BY p.sort_order ASC, LCASE(pd.name) ASC";

	$res = mysqli_query($con,$sql);
    if (!mysqli_num_rows($res)) {
		$arr = array (
			'msg' => "error",
			'success' => 'No Products found!'
		);    	
    } else {
    	$data = array();
    	while ($row = mysqli_fetch_array($res)) {
			$row_data = array();
			$row_data['product_id'] = $row['product_id'];
			$row_data['product_data'] = getProduct($row['product_id']);
    		array_push($data, $row_data);
    	}
		$arr = array (
			'msg' => "success",
			'products' => $data,
			'success' => 'Products found and returned!'
		);    	
    }

	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;
}

function getProduct($product_id) {

	$con = openDbConn();
	$sql = "SELECT DISTINCT *, pd.name AS name, p.image, m.name AS manufacturer, (SELECT price FROM oc_product_discount pd2 WHERE pd2.product_id = p.product_id AND pd2.customer_group_id = '1' AND pd2.quantity = '1' AND ((pd2.date_start = '0000-00-00' OR pd2.date_start < NOW()) AND (pd2.date_end = '0000-00-00' OR pd2.date_end > NOW())) ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS discount, (SELECT price FROM oc_product_special ps WHERE ps.product_id = p.product_id AND ps.customer_group_id = '1' AND ((ps.date_start = '0000-00-00' OR ps.date_start < NOW()) AND (ps.date_end = '0000-00-00' OR ps.date_end > NOW())) ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS special, (SELECT points FROM oc_product_reward pr WHERE pr.product_id = p.product_id AND customer_group_id = '1') AS reward, (SELECT ss.name FROM oc_stock_status ss WHERE ss.stock_status_id = p.stock_status_id AND ss.language_id = '1') AS stock_status, (SELECT wcd.unit FROM oc_weight_class_description wcd WHERE p.weight_class_id = wcd.weight_class_id AND wcd.language_id = '1') AS weight_class, (SELECT lcd.unit FROM oc_length_class_description lcd WHERE p.length_class_id = lcd.length_class_id AND lcd.language_id = '1') AS length_class, (SELECT AVG(rating) AS total FROM oc_review r1 WHERE r1.product_id = p.product_id AND r1.status = '1' GROUP BY r1.product_id) AS rating, (SELECT COUNT(*) AS total FROM oc_review r2 WHERE r2.product_id = p.product_id AND r2.status = '1' GROUP BY r2.product_id) AS reviews, p.sort_order FROM oc_product p LEFT JOIN oc_product_description pd ON (p.product_id = pd.product_id) LEFT JOIN oc_product_to_store p2s ON (p.product_id = p2s.product_id) LEFT JOIN oc_manufacturer m ON (p.manufacturer_id = m.manufacturer_id) WHERE p.product_id = '".$product_id."' AND pd.language_id = '1' AND p.status = '1' AND p.date_available <= NOW() AND p2s.store_id = '0'";
	$res = mysqli_query($con,$sql);
	$row = mysqli_fetch_assoc($res);
	return $row;
}

function getCategories($req_data) {

	$token = checkApiSession();
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/custom/getallcategory&token='.$token;
	$fields = array (
		'action' => $req_data['action'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);
	$arr = array (
		'msg' => "success",
		'categories' => $data->categories,
		'success' => 'Categories found and returned!'
	);
	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;
}

function getProductsByCategory($req_data) {
	
	$token = checkApiSession();

	// Working code to get the products by category id
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/custom/productsbycategory&token='.$token;
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

	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/login';
	$fields = array(
	  'username' => 'admin',
	  'password' => 'blV2oxA7WGykj3JurYx5nSZiocLLnNLFn6vBai57sgVpLzQsLJRhWFBwGZOGygZEtN5rOTS3FFV8de21XBrNiUhcb8GvbUHVOttKMdHpfQqHA3GT86umeOtoEOjMGakjEC2HVFPJBS5CqjdKFm3Hxa40nsPyVO4VFxLvtLoR60zUMZll63CUu8CcABeY0YyqRy3TywCHXVJ2oh4zV8xcf4xSZtXudmcJjroKGmrk425gBpfaxEFIBHQbiaEa6Ykz',
	);

	$json = do_curl_request($url, $fields);
	$ret_data = json_decode($json);
	//echo $ret_data->cookie;	
	return $ret_data->cookie;
}

function removeFromcart($req_data) {
	$token = checkApiSession();

	// Working code to get the products by category id
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/cart/remove&token='.$token;
	$fields = array (
		'product_id' => $req_data['product_id'],
		'key' => $req_data['key'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);


	if(isset($data->error)) {
		$arr = array (
			'msg' => 'error!',
			'data' => $data,
			'error' => 'Problem in adding the product!'
		);
	} else if(isset($data->success)) {
		$arr = array (
			'msg' => 'success',
			'data' => $data,
			'success' => 'Product removed successfully!'
		);
	} else {
		$arr = array (
			'msg' => 'waiting',
			'data' => $data,
			'waiting' => 'Waiting for the response from cart!'
		);
	}

	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;
}

function addTocart($req_data) {
	$token = checkApiSession();

	// Working code to get the products by category id
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/cart/add&token='.$token;
	$fields = array (
		'product_id' => $req_data['product_id'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);


	if(isset($data->error)) {
		$arr = array (
			'msg' => 'error!',
			'data' => $data,
			'error' => 'Problem in adding the product!'
		);
	} else if(isset($data->success)) {
		$arr = array (
			'msg' => 'success',
			'data' => $data,
			'success' => 'Product added successfully!'
		);
	} else {
		$arr = array (
			'msg' => 'waiting',
			'data' => $data,
			'waiting' => 'Waiting for the response from cart!'
		);
	}

	sleep(1);
    $jsn = json_encode($arr);
    echo $jsn;
}


function getCartProducts() {
	$token = checkApiSession();

	// Working code to get the products by category id
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/cart/products&token='.$token;
	$fields = array (
		// 'product_id' => $req_data['product_id'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);

	if(isset($data->error)) {
		$arr = array (
			'msg' => 'error',
			'data' => $data,
			'error' => 'Problem in getting products of cart!'
		);
	} else {
		$arr = array (
			'msg' => 'success',
			'data' => $data,
			'success' => 'Cart products fetched successfully!'
		);
	}	

	sleep(1);
	$jsn = json_encode($arr);
	echo $jsn;
}

function addOrder() {
	$token = checkApiSession();

	// Working code to get the products by category id
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/order/add&token='.$token;
	$fields = array (
		// 'product_id' => $req_data['product_id'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);

	// if(isset($data->error)) {
	// 	$arr = array (
	// 		'msg' => 'error',
	// 		'data' => $data,
	// 		'error' => 'Problem in getting products of cart!'
	// 	);
	// } else {
	// 	$arr = array (
	// 		'msg' => 'success',
	// 		'data' => $data,
	// 		'success' => 'Cart products fetched successfully!'
	// 	);
	// }	
	$arr = array (
		'msg' => 'response',
		'data' => $data,
		'success' => 'Add orrder response!'
	);
	sleep(1);
	$jsn = json_encode($arr);
	echo $jsn;
}

function applyCoupon($req_data) {
	$token = checkApiSession();

	// Working code to get the products by category id
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/coupon&token='.$token;
	$fields = array (
		'coupon' => $req_data['coupon'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);

	if(isset($data->error)) {
		$arr = array (
			'msg' => 'error',
			'data' => $data,
			'error' => $data->error
		);
	} else {
		$arr = array (
			'msg' => 'success',
			'data' => $data,
			'success' => 'Coupon applied successfully!'
		);
	}

	sleep(1);
	$jsn = json_encode($arr);
	echo $jsn;
}

function updateProductQuantity($req_data) {

	$token = checkApiSession();
	$url = 'http://127.0.0.1/opencart-2/index.php?route=api/cart/edit&token='.$token;

	$fields = array (
		'key' => $req_data['key'],
		'quantity' => $req_data['quantity'],
	);
	$json = do_curl_request($url,$fields);
	$data = json_decode($json);

	if(isset($data->error)) {
		$arr = array (
			'msg' => 'error',
			'data' => $data,
			'error' => $data->error
		);
	} else {
		$arr = array (
			'msg' => 'success',
			'data' => $data,
			'success' => 'Quantity updated successfully!'
		);
	}

	sleep(1);
	$jsn = json_encode($arr);
	echo $jsn;
}

?>
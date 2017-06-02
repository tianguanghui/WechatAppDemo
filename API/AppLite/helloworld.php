<?php
/**
 * Created by PhpStorm.
 * User: tianguanghui
 * Date: 2017/5/24
 * Time: 10:54
 */
$data['tip'] = '一条来自远方的提示';
$data['host']='https://'.$_SERVER['SERVER_NAME'];
$data['url']=$_SERVER["REQUEST_URI"];
echo json_encode($data);
?>
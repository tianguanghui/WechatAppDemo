<?php
/**
 * Created by PhpStorm.
 * User: tianguanghui
 * Date: 2017/6/2
 * Time: 09:20
 */
$song1['poster'] = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';
$song1['name'] = '第1首歌曲';
$song1['author'] = '歌手1';
$song1['src'] = 'https://' . $_SERVER['SERVER_NAME'] . '/audio/001.mp3';

$song2['poster'] = 'http://www.yatibang.com/images/ytbimg/ioserweima.png';
$song2['name'] = '第2首歌曲';
$song2['author'] = '歌手2';
$song2['src'] = 'https://' . $_SERVER['SERVER_NAME'] . '/audio/004.mp3';

$songs = [$song1, $song2];
$index = isset($_GET['index']) ? 1 : 0;
$data['song'] = $songs[$index];
$response['status'] = '200';
$response['message'] = '成功';
$response['data'] = $data;
echo json_encode($response);
?>
<?php

// Файлы phpmailer
require 'libs/PHPMailer/src/PHPMailer.php';
require 'libs/PHPMailer/src/SMTP.php';
require 'libs/PHPMailer/src/Exception.php';

$client = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$communication = $_POST['communication'];

$email_template = 'template-mail.html';

$body = file_get_contents($email_template);

$body = str_replace('%name%', $client, $body);
$body = str_replace('%email%', $email, $body);
$body = str_replace('%phone%', $phone, $body);
$body = str_replace('%communication%', $communication, $body);
$body = str_replace('%message%', $message, $body);

$theme = 'Заявка с формы';

$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->isSMTP();
$mail->CharSet = "UTF-8";
$mail->SMTPAuth   = true;
//$mail->SMTPDebug = 2;
$mail->Debugoutput = function ($str, $level) {
	$GLOBALS['status'][] = $str;
};

// Настройки вашей почты
$mail->Host = 'smtp.mail.ru'; // SMTP сервера вашей почты
$mail->Username = 'sasha.dadaev.97@mail.ru'; // Логин на почте
$mail->Password = 'wrxvDZkkjdZ5fQ9NYqqQ'; // Пароль на почте
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('sasha.dadaev.97@mail.ru', 'Sanchezz'); // Адрес самой почты и имя отправителя

// Получатель письма
$mail->addAddress('sasha.dadaev.98@mail.ru');


// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $theme;
$mail->msgHTML($body);

// Проверяем отравленность сообщения
if (!$mail->send()) {
	$Message = 'Сообщение не отправлено!';
} else {
	$Message = 'Данные отправлены.';
}

$response = ['message' => $Message];
header('Content-type: application/json');

echo json_encode($response);

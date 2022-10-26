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

$body = $client . ' ' . $email . ' ' . $phone . ' ' . $message . ' ' . $communication;
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
$mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {
	$result = "success";
} else {
	$result = "error";
}

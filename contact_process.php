<?php
if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
	$secret = '6Lc1I80UAAAAAI5eznsQcoDSblME4NVmEaXHnmVO';
	$verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
	$responseData = json_decode($verifyResponse);
	if ($responseData->success) {
		$to = "info@hausarzt-praxis-köln.de";
		$from = $_REQUEST['email'];
		$name = $_REQUEST['name'];
		$csubject = $_REQUEST['subject'];
		$number = $_REQUEST['number'];
		$cmessage = $_REQUEST['message'];

		$headers = "From: " . $from . "\r\n";
		$headers .= "Reply-To: " . $from . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		$subject = "Sie haben eine Nachricht von Ihrer Webseite.";

		$logo = 'img/logo.png';
		$link = '#';

		$body = "<!DOCTYPE html><html lang='de'><head><meta charset='UTF-8'><title>Express Mail</title></head><body>";
		$body .= "<table style='width: 100%;'>";
		$body .= "<thead style='text-align: center;'><tr><td style='border:none;' colspan='2'>";
		$body .= "<a href='{$link}'><img src='{$logo}' alt=''></a><br><br>";
		$body .= "</td></tr></thead><tbody><tr>";
		$body .= "<td style='border:none;'><strong>Name:</strong> {$name}</td>";
		$body .= "<td style='border:none;'><strong>Email:</strong> {$from}</td>";
		$body .= "</tr>";
		$body .= "<tr><td style='border:none;'><strong>Subject:</strong> {$csubject}</td></tr>";
		$body .= "<tr><td></td></tr>";
		$body .= "<tr><td colspan='2' style='border:none;'>{$cmessage}</td></tr>";
		$body .= "</tbody></table>";
		$body .= "</body></html>";
		$send = mail($to, $subject, $body, $headers);

		echo 1;
		exit(0);
	} else {
		echo 0;
		exit(0);
	}
}

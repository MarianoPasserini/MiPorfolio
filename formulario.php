<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to = "tu_correo_electronico@example.com"; // reemplaza esto con tu correo electrónico
  $subject = "Mensaje de " . $_POST["name"];
  $message = $_POST["message"];
  $headers = "From: " . $_POST["email"] . "\r\n" .
             "Reply-To: " . $_POST["email"] . "\r\n" .
             "X-Mailer: PHP/" . phpversion();

  mail($to, $subject, $message, $headers);
}
?>


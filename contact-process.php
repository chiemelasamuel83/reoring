<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // CONFIGURATION
    $to = "schiemela79@gmail.com"; // Your email address
    $headers = "From: no-reply@ironknot.com\r\n";
    $headers = "Reply-to: no-reply@ironknot.com\r\n";
    $headers = "content-type: text/plain; charset=URF-8\r\n";
    $subject = "New Website Notification";
    $body = "";

    // 1. Handle Contact Form
    if (isset($_POST['message'])) {
        $name = htmlspecialchars($_POST['name'] ?? 'Unknown');
        $email = htmlspecialchars($_POST['email'] ?? 'No Email');
        $msg = htmlspecialchars($_POST['message']);
        
        $subject = "New Contact Message from $name";
        $body = "Name: $name\nEmail: $email\n\nMessage:\n$msg";
    }
    // 2. Handle Login/Signup (Notification Only)
    elseif (isset($_POST['username'])) {
        $user = htmlspecialchars($_POST['username']);
        $type = htmlspecialchars($_POST['form_type'] ?? 'Login/Signup');
        
        $subject = "New $type Attempt";
        $body = "User: $user\nAction: $type attempt on website.";
    }

    // 3. Send Email (Requires working mail server)
    if (!empty($body)) {
       if(mail($to, $subject, $body, $headers)){
    echo"Mail sent successfully";
    }else{
        echo "Mail Failed";
    }
} 
}
?>
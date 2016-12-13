<?php
class sendMail {
    const MAIL_ADMIN = 'support@medigram.com';
    private $name;
    private $email;
    private $phone;
    private $check;

    private $error = array();

    // constructor with validation
    function __construct($name, $email, $phone, $check) {
        if (!empty($name)) {
            $this->name = stripslashes(strip_tags(trim(htmlspecialchars($name))));
        } else {
            $this->error = array('name' => 'not_valid');
            $this->generate_error();
        }

        // email validation
        if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->email = stripslashes(strip_tags(trim(htmlspecialchars($email))));
        } else {
            $this->error = array('email' => 'not_valid');
            $this->generate_error();
        }

        if (!empty($phone)) {
            $this->phone = stripslashes(strip_tags(trim(htmlspecialchars($phone))));
        } else {
            $this->error = array('phone' => 'not_valid');
            $this->generate_error();
        }

        if (!empty($check)) {
            $this->check = stripslashes(strip_tags(trim(htmlspecialchars($check))));
        } else {
            $this->error = array('check' => 'not_valid');
            $this->generate_error();
        }

        $this->send_email();
    }

    private function send_email() {
        $subject = 'Medigram form from '.$this->name;
        $message = 'Phone: '.$this->phone.'. ';
        $message .= 'Name: '.$this->name.'. ';
        $message .= 'Do you work for a health system? - '.$this->check.'. ';
        $message .= 'My email is - '.$this->email.'. ';


        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/plain; charset=utf-8\r\n";
        $headers .= "To: ".$this::MAIL_ADMIN."\r\n";

        //$headers .= "From: ".$this->email."\r\n";

        if(mail($this::MAIL_ADMIN, $subject, $message, $headers)) {
            $this->generate_success();
        }
    }

    // if data has empty parameters - we create error response
    private function generate_error() {
        $this->error += array('error' => 'not_found_data');
        echo json_encode($this->error);
        die();
    }

    private function generate_success() {
        echo json_encode(array('success' => 'true'));
        die();
    }
}

//$sendMail = new sendMail($_GET['name'], $_GET['email'], $_GET['phone'], $_GET['quastion']); // for test - GET request
$sendMail = new sendMail($_POST['name'], $_POST['email'], $_POST['phone'], $_POST['quastion']); // for work - POST request



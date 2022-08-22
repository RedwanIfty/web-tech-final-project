<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassMail extends Mailable
{
    use Queueable, SerializesModels;
    public $sub;
    public $password;
    public $email;
   

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($sub,$email,$password)
    {
        $this->sub = $sub;
        $this->email=$email;
        $this->password=$password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.resetpass')
        //->with('u_id',$this->u_id)
        ->with('email',$this->email) 
        ->with('password',$this->password)
        ->subject($this->sub);
    }
}

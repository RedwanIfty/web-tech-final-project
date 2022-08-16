<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendInvitation extends Mailable
{
    use Queueable, SerializesModels;
    public $sub;
   // public $u_id;

    public $u_name;
    public $u_type;
    public $password;
    public $email;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($sub,$u_name,$email,$u_type,$password)
    {
        $this->sub = $sub;
        ///$this->u_id = $u_id;   
        $this->u_name = $u_name;
        $this->email=$email;
        $this->u_type=$u_type;
        $this->password=$password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.invitation')
        //->with('u_id',$this->u_id)
        ->with('u_name',$this->u_name)
        ->with('email',$this->email)
        ->with('u_type',$this->u_type)
        ->with('password',$this->password)
        ->subject($this->sub);
    }
}

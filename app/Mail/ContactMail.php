<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    private ?string $nom = null;
    private ?string $email = null;
    private ?string $file = null;
    private ?string $message = null;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(?string $nom, ?string $email, ?string $file, ?string $message)
    {
        $this->nom = $nom;
        $this->email = $email;
        $this->file = $file;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.contact', array('nom' => $this->nom, 'email' => $this->email, 'file' => $this->file, 'messages' => $this->message));
    }
}

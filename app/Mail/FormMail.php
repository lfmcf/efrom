<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FormMail extends Mailable
{
    use Queueable, SerializesModels;

    
    private ?string $message = null;
    private ?string $file = null;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(?string $message, ?string $file)
    {
        $this->message = $message;
        $this->file = $file;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.formmail')->attach(public_path($this->file));
    }
}

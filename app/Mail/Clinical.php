<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Clinical extends Mailable
{
    use Queueable, SerializesModels;

    private ?string $name = null;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(?string $name)
    {
        $this->name = $name;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.clinical')->attach(public_path($this->name));
    }
}

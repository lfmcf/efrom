<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RcSubmit extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    private ?string $name = null;
    private ?string $prductName = null;
    public ?string $sujet = null;

    public function __construct(?string $name, ?string $prductName, ?string $sujet)
    {
        $this->name = $name;
        $this->prductName = $prductName;
        $this->sujet = $sujet;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.rc')
        ->subject($this->sujet)
        ->attach(public_path($this->name))
        ->with(['prductName' => $this->prductName]);
    }
}

<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Rt extends Mailable
{
    use Queueable, SerializesModels;

    private ?string $name = null;
    private ?string $prductName = null;
    public ?string $sujet = null;

    /**
     * Create a new message instance.
     *
     * @return void
     */
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
        return $this->view('emails.rt')
        ->subject($this->sujet)
        ->attach(public_path($this->name))
        ->with(['prductName' => $this->prductName]);
    }
}

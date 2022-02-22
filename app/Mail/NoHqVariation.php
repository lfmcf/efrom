<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NoHqVariation extends Mailable
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
    public function __construct(?string $name, $prductName, ?string $sujet)
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
        return $this->view('emails.nohqproject')
        ->subject($this->sujet)
        ->attach(public_path($this->name))
        ->with(['prductName' => $this->prductName]);
    }
}

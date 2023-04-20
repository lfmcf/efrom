<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use Slides\Saml2\Events\SignedIn;
use App\Models\User;
use Auth;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Event::listen(\Slides\Saml2\Events\SignedIn::class, function(\Slides\Saml2\Events\SignedIn $event){
            $messageId = $event->getAuth()->getLastMessageId();

            // your own code preventing reuse of a $messageId to stop replay attacks
            $samlUser = $event->getSaml2User();
            $userData = [
                'id' => $samlUser->getUserId(),
                'attributes' => $samlUser->getAttributes(),
                'assertion' => $samlUser->getRawSamlAssertion()
            ];

            $user = User::where('email', $userData['id'])->first();

            if (Auth::loginUsingId($user->id)) {
                // dd(Auth::check());
            }else {
                throw new AuthenticationException();
            }
        });
    }
}

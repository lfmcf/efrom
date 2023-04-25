<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

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
            $samlUser = $event->getSaml2User();
            $attributes = $samlUser->getAttributes();
            $userEmail = $attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'][0];
            // $userData = [
            //     'id' => $samlUser->getUserId(),
            //     'attributes' => $samlUser->getAttributes(),
            //     'assertion' => $samlUser->getRawSamlAssertion()
            // ];

            $user = User::where('email', $userEmail)->first();

            if (Auth::login($user)) {
                return redirect('/');
            }else {
                $error = new AuthenticationException();
                //return response($error, 200);
                return redirect()->back()->withErrors([
                    'create' => $error
                ]);
            }
        });
    }
}

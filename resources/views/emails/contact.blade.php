<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<body class="font-sans antialiased">
    <p>Bonjour,</p>
    <p>Un nouveau message de {{ $nom }} avec le mail {{ $email }} :</p>
    <p>message : {{ $messages }}</p>
    @if($file)
    <p>file : {{ $file }}</p>
    @endif
    <p>Cordialement.</p>
</body>

</html>
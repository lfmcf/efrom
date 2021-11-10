import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default function TwoFactor() {

    const { data, setData, post, processing, errors, reset } = useForm({
        two_factor_code: ""
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('verify.store'));
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Two Factor Verification</h1>
                <p className="text-muted">
                    You have received an email which contains two factor login code.
                    If you haven't received it, press <a href="{{ route('verify.resend') }}">here</a>.
                </p>
                <div>
                    <input name="two_factor_code" type="text" required autoFocus placeholder="Two Factor Code" onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">
                            Verify
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
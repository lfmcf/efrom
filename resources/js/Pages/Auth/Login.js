import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
       
        <Guest>
            <Head title="Login" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />
            <form className="main_form" onSubmit={submit}>
                <div className="main_form_group">
                    <label className="main_label">Email</label>
                    <div className="main_form_field">
                        <div className="main_form_icon">
                            <svg className="mdi-icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z"></path></svg>
                        </div>
                        <input type="text" name="email" placeholder="Email" className="main_form_input" value={data.email} onChange={onHandleChange} />
                    </div>
                </div>
                <div className="main_form_group">
                    <label className="main_label">Password</label>
                    <div className="main_form_field">
                        <div className="main_form_icon">
                        <svg className="mdi-icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z"></path></svg>
                        </div>
                        <input type="password" name="password" placeholder="Password" className="main_form_input" value={data.password} onChange={onHandleChange} />
                        <div className="main_forget_password">
                            <Link href={route('password.request')}>Forgot your password ?</Link>
                        </div>
                    </div>
                </div>
                <div className="main_form_group">
                    <div className="main_form_field">
                        <label className="remember_btn">
                            <input type="checkbox" name="remember" checked={data.remember} className="main_form_checkbox" onChange={onHandleChange} />
                            <span className="main_form_custom">
                                {data.remember ?
                                <svg className="mdi-icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>
                                : ''}
                            </span>
                            <span className="main_form_text">Remember me</span>
                        </label>
                    </div>
                </div>
                <div className="btn_form_group">
                    <div className="form-button">
                        <button type="submit" className="btn_signin">Log In</button>
                    </div>
                    <div className="form-button">
                        <button type='button' onClick={() => window.location.replace('https://dataeform.com/saml2/72840654-f704-423e-aa3c-502bc1c68c2a/login')} className="btn_signin">Log In with Azure</button>
                    </div>
                </div>
                
            </form>
            
        </Guest>
    );
}

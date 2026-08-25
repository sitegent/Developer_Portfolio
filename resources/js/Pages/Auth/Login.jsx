import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="font-sans text-2xl font-bold tracking-tight text-white">
                    Welcome back
                </h1>
                <p className="mt-2 text-sm text-isak-textMuted">
                    Sign in to your account to continue
                </p>
            </div>

            {status && (
                <div className="mb-6 rounded-xl border border-isak-primary/20 bg-isak-primary/10 px-4 py-3 text-center text-sm font-medium text-isak-primary">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="!text-xs !font-semibold !uppercase !tracking-widest !text-isak-textMuted"
                    />

                    <div className="group relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg
                                className="h-4 w-4 text-isak-textMuted transition-colors group-focus-within:text-isak-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                />
                            </svg>
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="!w-full !rounded-xl !border-isak-border !bg-isak-bg/80 !py-3 !pl-11 !pr-4 !text-sm !text-white !shadow-none !ring-0 placeholder:!text-isak-textMuted/50 focus:!border-isak-primary/50 focus:!ring-1 focus:!ring-isak-primary/30"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="you@example.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="!text-xs !font-semibold !uppercase !tracking-widest !text-isak-textMuted"
                    />

                    <div className="group relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg
                                className="h-4 w-4 text-isak-textMuted transition-colors group-focus-within:text-isak-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                />
                            </svg>
                        </div>
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="!w-full !rounded-xl !border-isak-border !bg-isak-bg/80 !py-3 !pl-11 !pr-12 !text-sm !text-white !shadow-none !ring-0 placeholder:!text-isak-textMuted/50 focus:!border-isak-primary/50 focus:!ring-1 focus:!ring-isak-primary/30"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-isak-textMuted transition-colors hover:text-white"
                        >
                            {showPassword ? (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="!rounded-md !border-isak-border !bg-isak-bg/80 !text-isak-primary focus:!ring-isak-primary/30"
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="select-none text-sm text-isak-textMuted transition-colors hover:text-white">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-isak-textMuted transition-colors hover:text-isak-primary"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className={`group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-isak-primary px-6 py-3.5 font-sans text-sm font-bold tracking-wide text-isak-bg transition-all duration-300 hover:shadow-lg hover:shadow-isak-primary/25 active:scale-[0.98] ${
                        processing ? 'cursor-not-allowed opacity-60' : ''
                    }`}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {processing ? (
                        <svg
                            className="h-5 w-5 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                    ) : (
                        <>
                            <span>Sign In</span>
                            <svg
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </GuestLayout>
    );
}

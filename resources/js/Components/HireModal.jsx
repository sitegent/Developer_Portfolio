import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function HireModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { props } = usePage();

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        whatsapp: '',
        work_info: '',
        attached_file: null,
    });

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-hire-modal', handleOpen);
        return () => window.removeEventListener('open-hire-modal', handleOpen);
    }, []);

    const closeModal = () => {
        setIsOpen(false);
        reset();
        clearErrors();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('hire.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-modal="true">
            {/* Backdrop overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"
                onClick={closeModal}
            ></div>

            {/* Modern Modal Content */}
            <div className={`relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 transform ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-isak-primary hover:bg-white/10 transition-colors z-10 group"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">

                    {/* Left Sidebar Info */}
                    <div className="hidden md:flex flex-col justify-between w-1/3 bg-black/40 p-12 border-r border-white/5">
                        <div>
                            <h3 className="text-3xl font-medium text-white tracking-tight mb-2">Let's talk</h3>
                            <p className="text-isak-textMuted font-body text-lg">Tell me about your project.</p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <span className="text-isak-textMuted font-body text-sm uppercase tracking-widest block mb-2">Drop a line</span>
                                <a href="mailto:hello@example.com" className="text-xl font-medium text-white hover:text-isak-primary transition-colors">sitegent@outlook.com</a>
                            </div>
                            <div>
                                <span className="text-isak-textMuted font-body text-sm uppercase tracking-widest block mb-2">Call me</span>
                                <a href="tel:+880123456789" className="text-xl font-medium text-white hover:text-isak-primary transition-colors">+8801701867713</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Area */}
                    <div className="w-full md:w-2/3 p-8 sm:p-12 overflow-y-auto custom-scrollbar">

                        <h2 className="text-4xl md:hidden font-medium text-white tracking-tight mb-8">Let's talk</h2>

                        {props.flash?.success && (
                            <div className="bg-isak-primary/10 border border-isak-primary text-white font-body px-6 py-4 rounded-2xl mb-8 flex items-center gap-4">
                                <span className="text-isak-primary">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                Your message has been sent successfully.
                            </div>
                        )}

                        <form onSubmit={submit} className="flex flex-col gap-10">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {/* Name Input */}
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="modal-name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg focus:ring-0 focus:border-isak-primary peer transition-colors font-body"
                                        placeholder=" "
                                    />
                                    <label htmlFor="modal-name" className="absolute left-0 top-3 text-isak-textMuted text-lg transition-all duration-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                        What's your name? *
                                    </label>
                                    {errors.name && <div className="text-red-500 mt-2 text-sm font-body">{errors.name}</div>}
                                </div>

                                {/* Email Input */}
                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="modal-email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg focus:ring-0 focus:border-isak-primary peer transition-colors font-body"
                                        placeholder=" "
                                    />
                                    <label htmlFor="modal-email" className="absolute left-0 top-3 text-isak-textMuted text-lg transition-all duration-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                        Your email address *
                                    </label>
                                    {errors.email && <div className="text-red-500 mt-2 text-sm font-body">{errors.email}</div>}
                                </div>
                            </div>

                            {/* WhatsApp Input */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="modal-whatsapp"
                                    value={data.whatsapp}
                                    onChange={e => setData('whatsapp', e.target.value)}
                                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg focus:ring-0 focus:border-isak-primary peer transition-colors font-body"
                                    placeholder=" "
                                />
                                <label htmlFor="modal-whatsapp" className="absolute left-0 top-3 text-isak-textMuted text-lg transition-all duration-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                    WhatsApp / Phone (Optional)
                                </label>
                            </div>

                            {/* Message Textarea */}
                            <div className="relative group">
                                <textarea
                                    id="modal-message"
                                    value={data.work_info}
                                    onChange={e => setData('work_info', e.target.value)}
                                    rows="3"
                                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg focus:ring-0 focus:border-isak-primary peer transition-colors resize-none font-body"
                                    placeholder=" "
                                ></textarea>
                                <label htmlFor="modal-message" className="absolute left-0 top-3 text-isak-textMuted text-lg transition-all duration-300 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-isak-primary peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-sm font-body cursor-text">
                                    Tell me about your project... *
                                </label>
                                {errors.work_info && <div className="text-red-500 mt-2 text-sm font-body">{errors.work_info}</div>}
                            </div>

                            {/* Attachment */}
                            <div className="relative group">
                                <label className="text-isak-textMuted font-body text-sm block mb-3">Attachment (Optional)</label>
                                <div className="relative flex items-center w-full bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group-hover:border-white/20">
                                    <input
                                        type="file"
                                        onChange={e => setData('attached_file', e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="flex items-center px-6 py-4 gap-4 w-full">
                                        <div className="w-10 h-10 rounded-full bg-isak-primary/20 text-isak-primary flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                            </svg>
                                        </div>
                                        <div className="text-white truncate font-body text-lg">
                                            {data.attached_file ? data.attached_file.name : 'Upload File'}
                                        </div>
                                    </div>
                                </div>
                                {errors.attached_file && <div className="text-red-500 mt-2 text-sm font-body">{errors.attached_file}</div>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full group relative inline-flex items-center justify-center bg-isak-primary text-black font-semibold text-xl px-12 py-5 rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.02] disabled:opacity-75 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        {processing ? 'Sending...' : 'Send Message'}
                                        {!processing && (
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        )}
                                    </span>
                                    {/* Hover flare effect */}
                                    <div className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0"></div>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

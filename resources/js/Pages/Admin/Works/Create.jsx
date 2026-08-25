import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import Select from 'react-select';
import { TECH_STACK_ICONS } from '@/Constants/TechIcons';

// Dark theme styles for react-select
const selectStyles = {
    control: (base, state) => ({
        ...base,
        background: 'rgba(255,255,255,0.05)',
        borderColor: state.isFocused ? '#00DE51' : 'rgba(255,255,255,0.1)',
        borderRadius: '1rem',
        padding: '6px 8px',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(0,222,81,0.2)' : 'none',
        '&:hover': { borderColor: 'rgba(255,255,255,0.3)' },
    }),
    menu: (base) => ({ ...base, background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', overflow: 'hidden' }),
    option: (base, state) => ({
        ...base,
        background: state.isFocused ? 'rgba(0,222,81,0.1)' : 'transparent',
        color: state.isFocused ? '#00DE51' : '#d1d5db',
        cursor: 'pointer',
    }),
    multiValue: (base) => ({ ...base, background: 'rgba(0,222,81,0.15)', borderRadius: '0.5rem' }),
    multiValueLabel: (base) => ({ ...base, color: '#00DE51', fontWeight: '600', fontSize: '12px' }),
    multiValueRemove: (base) => ({ ...base, color: '#00DE51', '&:hover': { background: 'rgba(255,0,0,0.2)', color: '#ff5555' } }),
    singleValue: (base) => ({ ...base, color: '#fff', fontWeight: '500' }),
    input: (base) => ({ ...base, color: '#fff' }),
    placeholder: (base) => ({ ...base, color: '#6b7280' }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({ ...base, color: '#6b7280' }),
    clearIndicator: (base) => ({ ...base, color: '#6b7280' }),
};

const CATEGORIES = ['Web Design', 'Web Development', 'App Development', 'UI/UX', 'Branding', 'E-commerce', 'SEO & Marketing'];
const categoryOptions = CATEGORIES.map(c => ({ value: c, label: c }));
const techOptions = Object.values(TECH_STACK_ICONS).map(t => ({ value: t.name, label: t.name }));

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null,
        link: '',
        tech_stack: '',
        category: 'Web Design',
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.works.store'));
    };

    // Sync tech_stack string ↔ react-select multi value
    const selectedTechs = data.tech_stack
        ? data.tech_stack.split(',').map(t => t.trim()).filter(Boolean).map(t => ({ value: t, label: t }))
        : [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.works.index')} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <span>Add New Project</span>
                </div>
            }
        >
            <Head title="Add New Project" />

            <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Project Title *</label>
                                <input type="text" value={data.title} onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-medium"
                                    placeholder="Enter project name" />
                                {errors.title && <div className="text-red-500 text-sm mt-2">{errors.title}</div>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Description *</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-medium min-h-[160px]"
                                    placeholder="Describe the project goals and your role" />
                                {errors.description && <div className="text-red-500 text-sm mt-2">{errors.description}</div>}
                            </div>

                            {/* Category — React Select Single */}
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                                <Select
                                    options={categoryOptions}
                                    value={categoryOptions.find(o => o.value === data.category) || null}
                                    onChange={opt => setData('category', opt?.value || '')}
                                    styles={selectStyles}
                                    placeholder="Select category..."
                                    isSearchable={false}
                                />
                                {errors.category && <div className="text-red-500 text-sm mt-2">{errors.category}</div>}
                            </div>

                            {/* Tech Stack — React Select Multi */}
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Tech Stack</label>
                                <Select
                                    isMulti
                                    options={techOptions}
                                    value={selectedTechs}
                                    onChange={opts => setData('tech_stack', opts.map(o => o.value).join(', '))}
                                    styles={selectStyles}
                                    placeholder="Search and select technologies..."
                                    closeMenuOnSelect={false}
                                    classNamePrefix="rs"
                                />
                                <p className="text-gray-600 text-xs mt-2 italic">You can also type custom tech names to create new options.</p>
                                {errors.tech_stack && <div className="text-red-500 text-sm mt-2">{errors.tech_stack}</div>}
                            </div>

                            {/* Project Link */}
                            <div>
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Project Link (Optional)</label>
                                <input type="text" value={data.link} onChange={e => setData('link', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-isak-primary focus:ring-isak-primary/20 transition-all font-medium"
                                    placeholder="https://example.com" />
                                {errors.link && <div className="text-red-500 text-sm mt-2">{errors.link}</div>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link href={route('admin.works.index')} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-base">
                                Cancel
                            </Link>
                            <button type="submit" disabled={processing}
                                className="px-12 py-4 rounded-2xl bg-isak-primary text-black font-bold hover:scale-105 transition-all text-base shadow-lg shadow-isak-primary/20 disabled:opacity-50 disabled:hover:scale-100">
                                {processing ? 'Creating...' : 'Create Project'}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="space-y-6">
                        <div className="bg-[#161616] p-8 rounded-3xl border border-white/5">
                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Project Image *</label>
                            <div className="relative group overflow-hidden rounded-2xl bg-white/2 border-2 border-dashed border-white/10 hover:border-isak-primary/50 transition-all aspect-video flex flex-col items-center justify-center text-center p-4">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover z-0" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                            <p className="text-white font-bold">Change Image</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 rounded-full bg-isak-primary/10 flex items-center justify-center text-isak-primary mx-auto">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="text-isak-primary font-bold">Upload a file</span> or drag and drop
                                            <p className="mt-1">PNG, JPG, GIF up to 2MB</p>
                                        </div>
                                    </div>
                                )}
                                <input type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" accept="image/*" />
                            </div>
                            {errors.image && <div className="text-red-500 text-sm mt-3">{errors.image}</div>}
                        </div>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}

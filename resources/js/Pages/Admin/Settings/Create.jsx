import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        key: '',
        value: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Setting
                </h2>
            }
        >
            <Head title="Create Setting" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Key (e.g. facebook_url, linkedin_url)</label>
                                    <input
                                        type="text"
                                        value={data.key}
                                        onChange={e => setData('key', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.key && <div className="text-red-600 text-sm mt-1">{errors.key}</div>}
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value</label>
                                    <input
                                        type="text"
                                        value={data.value}
                                        onChange={e => setData('value', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    {errors.value && <div className="text-red-600 text-sm mt-1">{errors.value}</div>}
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HireModal from '@/Components/HireModal';
import { Head, usePage } from '@inertiajs/react';

export default function CodeLayout({ children, title, className = '' }) {
    const { settings } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col bg-editor-bg text-editor-text font-mono selection:bg-editor-active">
            <Head title={title ? `${title} - Portfolio` : 'Portfolio'} />

            <Navbar />

            <main className={`flex-grow flex flex-col md:flex-row overflow-hidden ${className}`}>
                {/* Simulated Explorer Sidebar */}
                <aside className="w-16 md:w-64 bg-editor-sidebar border-r border-editor-border hidden sm:block overflow-y-auto">
                    <div className="p-4 text-xs tracking-wider text-editor-line uppercase">Explorer</div>
                    <div className="px-2 text-sm">
                        <div className="flex items-center space-x-2 py-1 px-2 cursor-pointer hover:bg-editor-active rounded">
                            <span className="text-editor-blue">▼</span>
                            <span>PORTFOLIO</span>
                        </div>
                        <div className="pl-6 space-y-1 mt-1 border-l border-editor-border ml-3">
                            <div className="py-1 px-2 cursor-pointer hover:bg-editor-active rounded text-editor-blue">📄 index.jsx</div>
                            <div className="py-1 px-2 cursor-pointer hover:bg-editor-active rounded text-editor-yellow">📄 about.jsx</div>
                            <div className="py-1 px-2 cursor-pointer hover:bg-editor-active rounded text-editor-green">📄 services.jsx</div>
                            <div className="py-1 px-2 cursor-pointer hover:bg-editor-active rounded text-editor-orange">📄 works.jsx</div>
                            <div className="py-1 px-2 cursor-pointer hover:bg-editor-active rounded text-editor-purple">📄 contact.jsx</div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-[calc(100vh-65px-33px)] overflow-hidden">
                    {/* Editor Tabs */}
                    <div className="flex bg-editor-sidebar border-b border-editor-border text-sm overflow-x-auto">
                        <div className="px-4 py-2 border-r border-editor-border bg-editor-bg text-editor-blue border-t-2 border-t-editor-blue cursor-pointer whitespace-nowrap">
                            {title || 'untitled'}.jsx
                        </div>
                    </div>

                    {/* Editor Content Area */}
                    <div className="flex-1 overflow-auto p-4 md:p-8 relative">
                        {/* Line Numbers Simulation (Background pattern) */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-editor-bg border-r border-editor-border text-right pr-2 pt-8 text-editor-line hidden lg:block select-none text-sm font-mono opacity-50">
                            {Array.from({ length: 100 }).map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        <div className="lg:pl-16 relative z-10">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <Footer settings={settings} />
            <HireModal />
        </div>
    );
}

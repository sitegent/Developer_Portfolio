import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-editor-sidebar border-b border-editor-border select-none">
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="hidden md:flex space-x-6 text-editor-text text-sm">
                <Link href="/" className="hover:text-editor-blue transition-colors">&lt;Home /&gt;</Link>
                <Link href="/about" className="hover:text-editor-blue transition-colors">&lt;About /&gt;</Link>
                <Link href="/services" className="hover:text-editor-blue transition-colors">&lt;Services /&gt;</Link>
                <Link href="/works" className="hover:text-editor-blue transition-colors">&lt;Works /&gt;</Link>
                <Link href="/contact" className="hover:text-editor-blue transition-colors">&lt;Contact /&gt;</Link>
            </div>

            <div>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-hire-modal'))}
                    className="bg-editor-blue text-editor-bg px-4 py-1.5 rounded font-semibold text-sm hover:bg-opacity-80 transition-opacity"
                >
                    Hire Me
                </button>
            </div>
        </nav>
    );
}

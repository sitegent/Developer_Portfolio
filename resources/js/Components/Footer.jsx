export default function Footer({ settings }) {
    // Helper to find setting by key
    const getSetting = (key) => {
        const setting = settings?.find(s => s.key === key);
        return setting ? setting.value : '#';
    };

    return (
        <footer className="bg-editor-header border-t border-editor-border text-editor-text text-xs py-2 px-4 flex justify-between items-center select-none">
            <div>
                <span><span className="text-editor-blue">const</span> <span className="text-editor-yellow">copyright</span> = <span className="text-editor-orange">"{new Date().getFullYear()} Partho"</span>;</span>
            </div>
            <div className="flex space-x-4">
                <a href={getSetting('github_url')} target="_blank" rel="noreferrer" className="hover:text-editor-blue transition-colors">GitHub</a>
                <a href={getSetting('linkedin_url')} target="_blank" rel="noreferrer" className="hover:text-editor-blue transition-colors">LinkedIn</a>
                <a href={getSetting('twitter_url')} target="_blank" rel="noreferrer" className="hover:text-editor-blue transition-colors">Twitter</a>
            </div>
        </footer>
    );
}

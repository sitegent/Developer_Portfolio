export default function ApplicationLogo({ className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Left bracket */}
            <path d="M8 6L3 12L8 18" />

            {/* Right bracket */}
            <path d="M16 6L21 12L16 18" />

            {/* Slash */}
            <path d="M14 4L10 20" />
        </svg>
    );
}
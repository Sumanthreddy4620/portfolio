const Footer = () => {
    return (
        <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-2">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>

            <div className="flex gap-3">
                <a href="https://github.com/Sumanthreddy4620" target="_blank" rel="noreferrer" className="social-icon">
                    <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
                </a>
                <a href="https://www.linkedin.com/in/sumanthreddy-kasireddy-72b6662a9/" target="_blank" rel="noreferrer" className="social-icon">
                    <img src="/assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="social-icon" title="View Resume">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2 text-white-500 invert brightness-0">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </a>
            </div>

            <p className="text-white-500">Made by Sumanth Reddy Kasireddy.</p>
        </footer>
    );
};

export default Footer;
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

const Contact = () => {
    const formRef = useRef();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ── Save to Supabase DB (backup) + send via EmailJS — in parallel ──
        const [emailResult, dbResult] = await Promise.allSettled([
            // 1. EmailJS — sends email to Gmail
            emailjs.send(
                'service_6kbmtuf',
                'template_uy33wqf',
                {
                    from_name: form.name,
                    to_name: 'Sumanth Reddy Kasireddy',
                    from_email: form.email,
                    to_email: 'k.sumanthreddy4620@gmail.com',
                    message: form.message,
                },
                'YmCAndAbpTcEnvIyv'
            ),
            // 2. Supabase — saves backup copy to database
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                }),
            }).then(r => r.ok ? r.json() : Promise.reject(new Error(`DB error: ${r.status}`))),
        ]);

        setLoading(false);

        // Log results for debugging
        if (emailResult.status === 'rejected') {
            console.warn('EmailJS failed:', emailResult.reason);
        }
        if (dbResult.status === 'rejected') {
            console.warn('Supabase backup failed:', dbResult.reason);
        }

        // Show success if at least ONE channel worked
        if (emailResult.status === 'fulfilled' || dbResult.status === 'fulfilled') {
            alert('Your message has been sent!');
            setForm({ name: '', email: '', message: '' }); // reset form
        } else {
            alert('Something went wrong. Please try again or email directly.');
        }
    };

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.contact-title', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        gsap.from('.contact-sub', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.contact-sub',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });

        document.querySelectorAll('.contact-field').forEach((field) => {
            gsap.from(field, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: field,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                },
            });
        });

        gsap.from('.contact-btn', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.contact-btn',
                start: 'top 95%',
                toggleActions: 'play none none none',
            },
        });
    });

    return (
        <section className="c-space my-20" id="contact">

            <div className="relative min-h-screen flex items-center justify-center flex-col">
                {/*<img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />*/}

                <div className="contact-container">
                    <h3 className="contact-title head-text">Let's Connect</h3>
                    <p className="contact-sub text-lg text-white-600 mt-3">
                        Passionate about technology and continuous learning, I'm always looking for opportunities to collaborate, contribute, and grow. If you'd like to work together or simply connect, feel free to reach out.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="contact-field space-y-3">
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="ex., Alex"
                            />
                        </label>

                        <label className="contact-field space-y-3">
                            <span className="field-label">Email address</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="ex., alex@gmail.com"
                            />
                        </label>

                        <label className="contact-field space-y-3">
                            <span className="field-label">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Write your message here..."
                            />
                        </label>

                        <button className="contact-btn field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}

                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
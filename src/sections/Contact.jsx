import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

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
        try {
            await emailjs
                .send(
                    'service_6kbmtuf',
                    'template_uy33wqf',
                    {
                        from_name: form.name,
                        to_name: 'Sumanth Reddy Kasireddy',
                        from_email: form.email,
                        to_email: 'k.sumanthreddy4620@gmail.com',
                        message: form.message,
                    },
                    'YmCAndAbpTcEnvIyv')

            setLoading(false);
            alert('Your message has been sent!');
        } catch(error) {
            setLoading(false);
            console.log(error);
            alert('Something went wrong!');
        }
    };

    return (
        <section className="c-space my-20" id="contact">

            <div className="relative min-h-screen flex items-center justify-center flex-col">
                {/*<img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />*/}

                <div className="contact-container">
                    <h3 className="head-text">Let's Connect</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Passionate about technology and continuous learning, I'm always looking for opportunities to collaborate, contribute, and grow. If you'd like to work together or simply connect, feel free to reach out.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
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

                        <label className="space-y-3">
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

                        <label className="space-y-3">
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

                        <button className="field-btn" type="submit" disabled={loading}>
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
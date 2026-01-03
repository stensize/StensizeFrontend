import React, {useState} from 'react'
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const submit = (e) => {
        e.preventDefault();
        setSent(true);
        e.target.reset();
        setTimeout(() => setSent(false), 2200);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccess(null);
      try {
        const res = await fetch('https://stensizebackend.onrender.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess('Message sent successfully!');
          setForm({ name: '', email: '', message: '' });
        } else {
          setSuccess('Failed to send message.');
        }
      } catch (err) {
        setSuccess('Error sending message.');
      }
      setLoading(false);
      setTimeout(() => setSuccess(null), 2200);
    };

  return (
    <section id="contact" className="py-10 border-t border-white/10 scroll-my-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Let’s build something great</h2>
              <p className="mt-3 text-sm text-white/70">Tell us about your product or challenge and we’ll get back within one business day.</p>
              <div className="mt-8 grid sm:grid-cols-1 gap-4 text-sm text-white/70">
                <div>✉️ stensize.technologies@gmail.com</div>
              </div>
              <div className="mt-8 grid sm:grid-cols-1 gap-4 text-sm text-white/70">
                <div>☎️ +91 91062 73753</div>
              </div>
              <div className="mt-8 grid sm:grid-cols-1 gap-4 text-sm text-white/70">
                <div>📍 India • Remote‑first</div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="rounded-2xl border p-6 space-y-4 bg-[#161618] border-white/10">
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.input required whileFocus={{ scale: 1.01, border: "1px solid #93c5fd" }} placeholder="Your name" name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl bg-transparent border px-4 py-3 outline-none border-white/15 focus:border-white/30" />
                <motion.input required whileFocus={{ scale: 1.01, border: "1px solid #93c5fd" }} placeholder="Email" type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-xl bg-transparent border px-4 py-3 outline-none border-white/15 focus:border-white/30" />
              </div>
              <motion.textarea required whileFocus={{ scale: 1.01, border: "1px solid #93c5fd" }} placeholder="Tell us about your project" name="message" value={form.message} onChange={handleChange} className="w-full rounded-xl bg-transparent border px-4 py-3 outline-none h-32 border-white/15 focus:border-white/30" />
              <motion.button whileTap={{ scale: 0.98, border: "1px solid #93c5fd" }} className="w-full py-3 rounded-2xl bg-white text-black cursor-pointer font-semibold" disabled={loading}>
                {loading ? 'Sending...' : 'Send message'}
              </motion.button>
              <AnimatePresence>
                {sent && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-center text-sm text-green-400">✅ Message Sent</motion.div>
                )}
              </AnimatePresence>
              {success && <div className="mt-2 text-sm text-green-500">{success}</div>}
            </form>
          </div>
        </div>
    </section>
  )
}

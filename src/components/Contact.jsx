import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs
            .send(
                "service_r0jcplm",
                "template_lt76uxq",
                {
                    from_name: form.name,
                    to_name: "Bruce",
                    from_email: form.email,
                    to_email: "nbruce420@gmail.com",
                    message: form.message,
                },
                "Jqq9AVwIuSjMiASc"
            )
            .then(
                () => {
                    setLoading(true);
                    alert(
                        "Thank you. I will get back to you as soon as possible"
                    );
                    setForm({
                        name: "",
                        email: "",
                        message: "",
                    });
                },
                (error) => {
                    setLoading(false);
                    console.log(error);
                    alert("Something went wrong");
                }
            );
    };

    return (
        <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-4 overflow-hidden">
            <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
            >
                <p className={styles.sectionSubText}>Get in touch</p>
                <h3 className={styles.sectionHeadText}>Contact</h3>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="mt-12 flex flex-col gap-8"
                >
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-4">
                            Your Name:
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            placeholder="What's your name?"
                            onChange={handleChange}
                            className="bt-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-4">
                            Your Email:
                        </span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            placeholder="What's your email?"
                            onChange={handleChange}
                            className="bt-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-4">
                            Your Message:
                        </span>
                        <textarea
                            rows="7"
                            name="message"
                            value={form.message}
                            placeholder="What's do you want to say ?"
                            onChange={handleChange}
                            className="bt-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        ></textarea>
                    </label>
                    <button
                        type="submit"
                        className="outline-none bg-tertiary py-3 px-8 w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </motion.div>
            <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className="xl:flex-1 xl:h-auto md:h-[550px] w-[350px]"
            >
                <EarthCanvas />
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");

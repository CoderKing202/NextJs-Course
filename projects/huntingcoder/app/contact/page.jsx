"use client";
import React, { useState } from "react";
import styles from "@/styles/contact.module.css";

function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, email, phone, desc };
    fetch("http://localhost:3000/api/postcontact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Thanks for contacting us");
        setName("");
        setEmail("");
        setDescription("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChange = (e) => {
    if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "desc") {
      setDescription(e.target.value);
    } else if (e.target.name == "name") {
      setName(e.target.value);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>
            Enter your name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>
            Email address
          </label>
          <input
            type="email"
            className={styles.input}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleChange}
          />
          <div id="emailHelp" className={styles.formText}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>
            Phone
          </label>
          <input
            type="phone"
            name="phone"
            value={phone}
            className={styles.input}
            id="phone"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.mb3}>
          <label className={styles.formlabel} htmlFor="floatingTextarea">
            Elaborate your concern
          </label>
          <textarea
            className={styles.input}
            id="desc"
            name="desc"
            value={desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default page;

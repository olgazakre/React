import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./DiscontForm.module.css"
import API_URL from "../../utils/api"

export default function DiscontForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [buttonText, setButtonText] = useState("Get a Discount");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false)

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/sale/send`, data);
      console.log("Server response:", response.data);
      setButtonText("Request Submitted");
      setSuccess(true);
      reset(); 
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send your request. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
   
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input className={styles.input}
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+[0-9]{12}$/,
                message: "Invalid phone number",
              },
            })}
            className={styles.input}
            placeholder="Phone number"
          />
          {errors.phone && <p style={styles.error}>{errors.phone.message}</p>}

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={styles.input}
            placeholder="E-mail"
          />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}

        <button 
        type="submit" 
        disabled={isSubmitting} 
        className={`${styles.button} ${success ? styles.success : ""}`}
>
          {buttonText}
        </button>
      </form>
   
  );
}
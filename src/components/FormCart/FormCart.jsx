import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { openModal } from "../../redux/modalSlice";
import styles from "./FormCart.module.css";
import API_URL from "../../utils/api";

export default function FormCart({ orderData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [buttonText, setButtonText] = useState("Order");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_URL}/order/send`,
        {
          ...data,
          products: orderData.products,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setButtonText("The Order is Placed");
      dispatch(openModal({ title: "Congratulations! ",
        message: "Your order has been successfully placed on the website. A manager will contact you shortly to confirm your order."}));
      reset();
      setTimeout(() => {
        dispatch(clearCart());
      }, 3000); 
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        type="text"
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
      />
      {errors.name && <h5 className={styles.error}>{errors.name.message}</h5>}

      <input
        type="tel"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^\+[0-9]{12}$/,
            message: "Invalid phone number format (+123456789012)",
          },
        })}
        className={styles.input}
        placeholder="Phone number"
      />
      {errors.phone && <h5 className={styles.error}>{errors.phone.message}</h5>}

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
      {errors.email && <h5 className={styles.error}>{errors.email.message}</h5>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${styles.button} ${isSubmitting ? styles.submitting : ""}`}
      >
        {buttonText}
      </button>
    </form>
  );
}

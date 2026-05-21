import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  mutedText,
  divider,
} from "../styles/common";

const BASE_URL = "https://blog-app-backend-tgj0.onrender.com";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onUserRegister = async (newUser) => {
    try {
      setLoading(true);

      const { role, ...userObj } = newUser;

      const res = await axios.post(
        `${BASE_URL}/user-api/users`,
        {
          ...userObj,
          role,
        }
      );

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <form onSubmit={handleSubmit(onUserRegister)} className={formCard}>

        <h2 className={formTitle}>Create an Account</h2>

        <p className={`${mutedText} text-center mt-2 mb-4`}>
          Already have an account?
        </p>

        {/* ROLE */}
        <div className="mb-5">
          <p className={labelClass}>Register as</p>

          <div className="flex gap-6 mt-1 justify-center">
            <label>
              <input
                type="radio"
                value="USER"
                {...register("role", { required: true })}
              />
              User
            </label>

            <label>
              <input
                type="radio"
                value="AUTHOR"
                {...register("role", { required: true })}
              />
              Author
            </label>
          </div>
        </div>

        <div className={divider} />

        {/* FIRST NAME */}
        <div className="mb-4">
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
            })}
            className={inputClass}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* LAST NAME */}
        <div className="mb-4">
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last name is required",
            })}
            className={inputClass}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            className={inputClass}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className={labelClass}>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className={inputClass}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-2">{error}</p>
        )}

        {/* SUBMIT */}
        <button type="submit" className={submitBtn}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default Register;

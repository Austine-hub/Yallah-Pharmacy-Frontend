import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import styles from "./Login.module.css";
// import logo from "../assets/logo.png"; // Uncomment and adjust path for your logo

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: { id: number; email: string; name?: string };
  error?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data } = await axiosClient.post<LoginResponse>("/auth/login", formData);

      if (!data.success) {
        setMessage(data.error || data.message || "Invalid credentials");
      } else {
        setMessage("Login successful!");
        console.log("User:", data.user);

        if (data.token) localStorage.setItem("token", data.token);

        setTimeout(() => navigate("/"), 1200);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.error || "Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password feature coming soon!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logoSection}>
          <div className={styles.logoPlaceholder}>
            {/* <img src={logo} alt="Logo" className={styles.logoImage} /> */}
            <div className={styles.logoCircle}></div>
          </div>
        </div>

        <h1 className={styles.title}>Hi, welcome back</h1>
        <p className={styles.subtitle}>Please fill in your details to log in</p>

        {message && (
          <div className={`${styles.serverMessage} ${message.includes("successful") ? styles.successMsg : styles.errorMsg}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Username
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="Student No/ Employee No"
              autoComplete="username"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                placeholder="Enter your Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <div className={styles.rememberRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Remember me</span>
            </label>
            <button type="button" onClick={handleForgotPassword} className={styles.forgotLink}>
              Forgot Password?
            </button>
          </div>

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.signupSection}>
          <p className={styles.signupText}>
            Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign Up</Link>
          </p>
        </div>

        <div className={styles.footer}>
          <p className={styles.copyright}>Copyright © 2024 - ABNO Softwares International</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
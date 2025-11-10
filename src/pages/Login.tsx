import React, { useState, useCallback, type FormEvent,type  ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import styles from "./Login.module.css";
import logo from "/logo.png";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: { id: number; email: string; name?: string };
  error?: string;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof FormErrors];
        return updated;
      });
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email or phone number is required";
    } else if (!EMAIL_REGEX.test(formData.email) && !/^\d{10,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email or phone number";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const { data } = await axiosClient.post<LoginResponse>("/auth/login", formData);

      if (!data.success) {
        setMessage(data.error || data.message || "Invalid credentials");
        return;
      }

      setMessage("Login successful!");
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        
        if (rememberMe && data.user) {
          localStorage.setItem("rememberedEmail", data.user.email);
        }
      }

      setTimeout(() => navigate("/"), 1200);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      console.error("Login error:", error);
      setMessage(err.response?.data?.error || "Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = useCallback(() => {
    navigate("/forgot-password");
  }, [navigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }, []);

  const isSuccess = message.toLowerCase().includes("successful");

  return (
    <div className={styles.container}>
      <main className={styles.loginCard}>
        <header className={styles.logoSection}>
          <div className={styles.logoPlaceholder}>
            <img src={logo} alt="Company Logo" className={styles.logoImage} />
            <div className={styles.logoCircle} aria-hidden="true"></div>
          </div>
        </header>

        <h1 className={styles.title}>Hi, welcome back</h1>
        <p className={styles.subtitle}>Please fill in your details to log in</p>

        {message && (
          <div
            className={`${styles.serverMessage} ${isSuccess ? styles.successMsg : styles.errorMsg}`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Phone Number / Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="Enter email or phone number"
              autoComplete="username"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={loading}
            />
            {errors.email && (
              <span id="email-error" className={styles.errorText} role="alert">
                {errors.email}
              </span>
            )}
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
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.togglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                <span aria-hidden="true">{showPassword ? "👁️" : "👁️‍🗨️"}</span>
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className={styles.errorText} role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <div className={styles.rememberRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className={styles.forgotLink}
              disabled={loading}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.signupSection}>
          <p className={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.signupLink}>
              Sign Up
            </Link>
          </p>
        </div>

        <footer className={styles.footer}>
          <p className={styles.copyright}>
            Copyright © {new Date().getFullYear()} - Ajanja softwares
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Login;
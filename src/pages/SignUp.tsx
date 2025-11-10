import React, { useState, useCallback, type FormEvent, type ChangeEvent } from "react";
import styles from "./SignUp.module.css";
import logo from "/logo.png";

interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

type MessageType = "success" | "error" | "";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (prev[name]) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s+()-]{10,}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Registration failed. Please try again.");
        setMessageType("error");
      } else {
        setMessage("Account created successfully! Redirecting to login...");
        setMessageType("success");
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <div className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="Yallah Pharmacy" className={styles.logoImage} />
            <h1 className={styles.logoText}>Yallah Pharmacy</h1>
            <p className={styles.logoTagline}>Caring Beyond Drugs</p>
          </div>
        </div>

        <header className={styles.header}>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join Yallah Clients Portal</p>
        </header>

        {message && (
          <div
            className={`${styles.message} ${
              messageType === "success" ? styles.messageSuccess : styles.messageError
            }`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
              placeholder="Choose a username"
              autoComplete="username"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              disabled={loading}
              required
            />
            {errors.username && (
              <span id="username-error" className={styles.errorText} role="alert">
                {errors.username}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="your.email@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={loading}
              required
            />
            {errors.email && (
              <span id="email-error" className={styles.errorText} role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              placeholder="+254 700 000 000"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              disabled={loading}
              required
            />
            {errors.phone && (
              <span id="phone-error" className={styles.errorText} role="alert">
                {errors.phone}
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
                placeholder="Create a strong password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.toggleButton}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
                tabIndex={0}
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

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className={styles.toggleButton}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                disabled={loading}
                tabIndex={0}
              >
                <span aria-hidden="true">{showConfirmPassword ? "👁️" : "👁️‍🗨️"}</span>
              </button>
            </div>
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className={styles.errorText} role="alert">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{" "}
            <a href="/login" className={styles.link}>
              Sign in
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default SignUp;
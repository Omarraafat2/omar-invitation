
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  LockKeyhole,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import "@/app/globals.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      if (data.user?.email !== "omar.raafat@gg.com") {
        await supabase.auth.signOut();
        throw new Error("Unauthorized account");
      }

      router.replace("/admin/guestbook");
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <div className="admin-login__background">
        <span className="admin-login__star admin-login__star--one">✦</span>
        <span className="admin-login__star admin-login__star--two">✧</span>
        <span className="admin-login__star admin-login__star--three">✦</span>
        <span className="admin-login__circle admin-login__circle--one" />
        <span className="admin-login__circle admin-login__circle--two" />
      </div>

      <motion.div
        className="admin-login__card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="admin-login__top-ornament">✦ ❦ ✦</div>

        <div className="admin-login__brand">
          <span className="admin-login__brand-names">
            Omar <span>&</span> Aya
          </span>
          <span className="admin-login__brand-date">
            26 NOVEMBER 2026
          </span>
        </div>

        <div className="admin-login__divider">
          <span />
          <Heart size={15} />
          <span />
        </div>

        <div className="admin-login__heading">
          <span className="admin-login__eyebrow">
            PRIVATE ACCESS
          </span>

          <h1>Welcome Back</h1>

          <p>
            Sign in to see the lovely wishes
            <br />
            shared by your guests.
          </p>
        </div>

        <form
          className="admin-login__form"
          onSubmit={handleLogin}
        >
          <label className="admin-login__field">
            <span>Email Address</span>

            <div className="admin-login__input-wrapper">
              <Mail size={17} />

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="username"
                required
                disabled={loading}
              />
            </div>
          </label>

          <label className="admin-login__field">
            <span>Password</span>

            <div className="admin-login__input-wrapper">
              <LockKeyhole size={17} />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={loading}
              />

              <button
                type="button"
                className="admin-login__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </label>

          {error && (
            <motion.p
              className="admin-login__error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="admin-login__submit"
            disabled={loading}
            whileHover={!loading ? { y: -2 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
          >
            <span>
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </span>

            {!loading && <ArrowRight size={17} />}
          </motion.button>
        </form>

        <div className="admin-login__footer">
          <Heart size={12} />
          <span>WITH LOVE, OMAR & AYA</span>
          <Heart size={12} />
        </div>
      </motion.div>

      <span className="admin-login__copyright">
        PRIVATE GUESTBOOK ACCESS
      </span>
    </main>
  );
}

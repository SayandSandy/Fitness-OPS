"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { Button } from "@/components/ui/button";

import { COUNTRIES } from "@/lib/utils/countries";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.iso === "US") || COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize reCAPTCHA verifier for phone auth
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }

    // Handle click outside for dropdown
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message || "Google Sign-In failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPhoneCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const appVerifier = (window as any).recaptchaVerifier;
      const fullPhoneNumber = `${selectedCountry.code}${phoneNumber.replace(/\s+/g, '')}`;
      const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
      (window as any).confirmationResult = confirmationResult;
      setVerificationId(confirmationResult.verificationId);
      setShowCodeInput(true);
    } catch (err: any) {
      setError(err.message || "Failed to send code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhoneCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await (window as any).confirmationResult.confirm(verificationCode);
    } catch (err: any) {
      setError(err.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[var(--background)]">
      <div className="w-full max-w-md space-y-8 rounded-lg card-dark border-[var(--theme-border)] p-8">
        <div className="text-center">
          <h2 className="font-display text-4xl tracking-wider text-[var(--theme-orange)]">
            {isLogin ? "INITIALIZE PROTOCOL" : "NEW OPERATIVE"}
          </h2>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            {isLogin
              ? "Access the mainframe to continue your transformation."
              : "Register your biometrics to begin the 10-week protocol."}
          </p>
        </div>

        {loginMethod === "email" ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--theme-muted)]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded border border-[var(--theme-border)] card-dark px-3 py-2 text-white placeholder-white/30 focus:border-[var(--theme-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-orange)]"
                  placeholder="operative@mainframe.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[var(--theme-muted)]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded border border-[var(--theme-border)] card-dark px-3 py-2 text-white placeholder-white/30 focus:border-[var(--theme-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-orange)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[var(--theme-orange)] to-[var(--theme-accent-dark)] hover:brightness-110 text-black font-bold" disabled={isLoading}>
              {isLoading ? "AUTHENTICATING..." : isLogin ? "ACCESS VIA EMAIL" : "REGISTER VIA EMAIL"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                className="text-xs text-[var(--theme-orange)] hover:underline uppercase tracking-widest"
              >
                {isLogin
                  ? "Request new clearance? Register here."
                  : "Already have clearance? Login here."}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={showCodeInput ? handleVerifyPhoneCode : handleSendPhoneCode} className="space-y-6">
            {!showCodeInput ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[var(--theme-muted)]">
                    Phone Number
                  </label>
                  <div className="mt-1 flex gap-2">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex h-[42px] w-[140px] items-center justify-between rounded border border-[var(--theme-border)] card-dark px-3 text-white focus:border-[var(--theme-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-orange)]"
                      >
                        <span className="truncate flex items-center gap-2">
                          <Image 
                            src={`https://flagcdn.com/w40/${selectedCountry.iso.toLowerCase()}.png`}
                            alt={selectedCountry.iso} 
                            width={20}
                            height={15}
                            className="w-5 h-auto"
                          />
                          {selectedCountry.iso} ({selectedCountry.code})
                        </span>
                        <span className="ml-2 text-xs">▼</span>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-[300px] overflow-auto rounded border border-[var(--theme-border)] card-dark shadow-lg">
                          <div className="sticky top-0 card-dark p-2 border-b border-[var(--theme-border)]">
                            <input
                              type="text"
                              className="w-full rounded border border-[var(--theme-border)] card-dark px-2 py-1 text-sm text-white focus:border-[var(--theme-orange)] focus:outline-none"
                              placeholder="Search country or code..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              autoFocus
                            />
                          </div>
                          {COUNTRIES.filter(c => 
                            c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.iso.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.code.includes(searchQuery)
                          ).map((country) => (
                            <div
                              key={`${country.iso}-${country.code}`}
                              className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2"
                              onClick={() => {
                                setSelectedCountry(country);
                                setIsDropdownOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              <Image 
                                src={`https://flagcdn.com/w40/${country.iso.toLowerCase()}.png`}
                                alt={country.iso} 
                                width={20}
                                height={15}
                                className="w-5 h-auto"
                              />
                              <span className="font-bold">{country.iso}</span>
                              <span className="text-[var(--theme-muted)]">({country.code})</span>
                              <span className="ml-auto truncate text-xs text-white/50">{country.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full flex-1 rounded border border-[var(--theme-border)] card-dark px-3 py-2 text-white placeholder-white/30 focus:border-[var(--theme-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-orange)]"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[var(--theme-orange)] to-[var(--theme-accent-dark)] hover:brightness-110 text-black font-bold" disabled={isLoading}>
                  {isLoading ? "SENDING..." : "SEND VERIFICATION CODE"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[var(--theme-muted)]">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="mt-1 block w-full rounded border border-[var(--theme-border)] card-dark px-3 py-2 text-white placeholder-white/30 focus:border-[var(--theme-orange)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-orange)]"
                    placeholder="123456"
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[var(--theme-orange)] to-[var(--theme-accent-dark)] hover:brightness-110 text-black font-bold" disabled={isLoading}>
                  {isLoading ? "VERIFYING..." : "VERIFY CODE"}
                </Button>
              </div>
            )}
          </form>
        )}

        <div className="mt-8 space-y-4 pt-8 border-t border-[var(--theme-border)]">
          <div id="recaptcha-container"></div>
          
          <Button 
            variant="outline" 
            className="w-full h-12 border-[var(--theme-border)] bg-transparent hover:bg-white/5" 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            ACCESS VIA GOOGLE
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-12 border-[var(--theme-border)] bg-transparent hover:bg-white/5" 
            onClick={() => {
              setLoginMethod(loginMethod === "email" ? "phone" : "email");
              setError(null);
            }}
            disabled={isLoading}
          >
            {loginMethod === "email" ? "USE PHONE NUMBER" : "USE EMAIL"}
          </Button>
        </div>
      </div>
    </div>
  );
}

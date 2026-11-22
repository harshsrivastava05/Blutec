"use client";
import { useState, type FormEvent } from "react";
import { available } from "@/lib/puppies";
import { pawPath } from "@/lib/paw";
export function EnquiryForm({
  puppy,
  letter = false,
}: {
  puppy?: { slug: string; name: string; breed: string };
  letter?: boolean;
}) {
  const [status, setStatus] = useState<
      "idle" | "sending" | "posting" | "sent" | "error"
    >("idle"),
    [error, setError] = useState(""),
    [fieldErrors, setFieldErrors] = useState<{
      name?: string;
      phone?: string;
      email?: string;
    }>({});
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "posting") return;
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setError("");
    if (letter) {
      const errors: { name?: string; phone?: string; email?: string } = {};
      const name = String(values.name || "").trim(),
        phone = String(values.phone || "").trim(),
        email = String(values.email || "").trim();
      if (name.length < 2) errors.name = "Please tell us your name.";
      if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7)
        errors.phone =
          "Add a phone or WhatsApp number we can reach, with country code.";
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.email = "Please enter a valid email address.";
      setFieldErrors(errors);
      if (Object.keys(errors).length) return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error || "We could not send your enquiry. Please try again.",
        );
      if (letter) {
        setStatus("posting");
        window.setTimeout(
          () => setStatus("sent"),
          matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 850,
        );
      } else setStatus("sent");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not send your enquiry. Please try again.",
      );
      setStatus("error");
    }
  }
  const hp = (
    <label className="honey-field" aria-hidden="true">
      Website
      <input name="website" tabIndex={-1} autoComplete="off" />
    </label>
  );
  if (status === "sent")
    return (
      <div className={letter ? "letter-sent" : "enquiry-sent"} role="status">
        <span aria-hidden="true">✉</span>
        <h3>
          {letter
            ? "Your letter is on its way!"
            : "Your enquiry is on its way!"}
        </h3>
        <p>Thank you for getting in touch. We&apos;ll be in touch soon.</p>
        <button className="button outline" onClick={() => setStatus("idle")}>
          Send another
        </button>
      </div>
    );
  if (letter)
    return (
      <form
        noValidate
        className={"letter-form " + (status === "posting" ? "posting" : "")}
        onSubmit={submit}
        aria-busy={status === "sending" || status === "posting"}
      >
        <div className="stamp" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <path d={pawPath} fill="currentColor" />
          </svg>
        </div>
        <p className="letter-dear">Dear TeddyPups,</p>
        {Object.keys(fieldErrors).length > 0 && (
          <div role="alert" className="letter-validation">
            <strong>Please check the highlighted fields.</strong>
            <ul>
              {Object.entries(fieldErrors).map(([field, message]) => (
                <li id={"letter-" + field + "-error"} key={field}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p>
          my name is{" "}
          <label>
            <span className="sr-only">Your name (required)</span>
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={
                fieldErrors.name ? "letter-name-error" : undefined
              }
            />
          </label>
          , and you can reach me on{" "}
          <label>
            <span className="sr-only">Phone or WhatsApp number (required)</span>
            <input
              name="phone"
              required
              type="tel"
              maxLength={30}
              autoComplete="tel"
              aria-invalid={!!fieldErrors.phone}
              aria-describedby={
                fieldErrors.phone ? "letter-phone-error" : undefined
              }
              placeholder="+971 50 123 4567"
            />
          </label>{" "}
          or by email at{" "}
          <label>
            <span className="sr-only">Email (optional)</span>
            <input
              name="email"
              type="email"
              maxLength={254}
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={
                fieldErrors.email ? "letter-email-error" : undefined
              }
              placeholder="optional"
            />
          </label>
          .
        </p>
        <p>
          I live in{" "}
          <label>
            <span className="sr-only">Your area (optional)</span>
            <input
              name="area"
              maxLength={150}
              placeholder="e.g. Dubai Marina"
            />
          </label>
          , and I&apos;m curious about{" "}
          <label>
            <span className="sr-only">Puppy you&apos;re interested in</span>
            <select name="puppyId" defaultValue="">
              <option value="">any puppy (not sure yet)</option>
              {available.map((p) => (
                <option value={p.slug} key={p.slug}>
                  {p.name}
                  {p.name !== p.breed
                    ? " (" + p.breed + ", " + p.sex + ")"
                    : " (" + p.sex + ")"}
                </option>
              ))}
            </select>
          </label>
          .
        </p>
        <label className="letter-message">
          <span className="sr-only">Your message (optional)</span>
          <textarea
            name="message"
            maxLength={2000}
            placeholder="Anything else you’d like to tell us…"
          />
        </label>
        {hp}
        <p className="hand letter-sign">with love, a future puppy parent ♡</p>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button
          className="button primary"
          disabled={status === "sending" || status === "posting"}
        >
          {status === "sending" || status === "posting"
            ? "Posting…"
            : "Post my letter ↗"}
        </button>
      </form>
    );
  return (
    <form className="profile-enquiry-form" onSubmit={submit}>
      <input type="hidden" name="puppyId" value={puppy?.slug || ""} />
      <label>
        Your name *
        <input
          required
          name="name"
          minLength={2}
          maxLength={100}
          autoComplete="name"
        />
      </label>
      <label>
        Phone or WhatsApp *
        <input
          required
          type="tel"
          name="phone"
          maxLength={30}
          autoComplete="tel"
        />
        <small>With country code, e.g. +971 50 123 4567</small>
      </label>
      <label>
        Email (optional)
        <input type="email" name="email" maxLength={254} autoComplete="email" />
      </label>
      <label>
        Your area (optional)
        <input name="area" maxLength={150} placeholder="e.g. Dubai Marina" />
      </label>
      <label className="wide">
        Message (optional)
        <textarea
          name="message"
          maxLength={2000}
          defaultValue={
            puppy
              ? `Hi! I'd love to know more about ${puppy.name}${puppy.name === puppy.breed ? "" : ` (${puppy.breed})`}.`
              : ""
          }
        />
      </label>
      {hp}
      {error && (
        <p className="form-error wide" role="alert">
          {error}
        </p>
      )}
      <button className="button primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

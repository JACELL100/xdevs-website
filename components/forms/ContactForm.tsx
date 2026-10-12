"use client";

import { useActionState, useId } from "react";
import { submitContact } from "@/app/actions/contact";
import { initialContactState } from "@/lib/contact-state";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { MagneticButton } from "@/components/motion/MagneticButton";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-grey-400">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-silver-100">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ withService = false }: { withService?: boolean }) {
  const [state, action, pending] = useActionState(submitContact, initialContactState);
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[360px] flex-col items-center justify-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-white/[0.04]">
          <Icon name="check" size={24} />
        </span>
        <p className="mt-6 text-2xl font-semibold tracking-tight text-white">Message received.</p>
        <p className="mt-2 max-w-sm text-[15px] text-grey-400">{state.message}</p>
      </div>
    );
  }

  return (
    // Reset the form when this page is hidden in <Activity> and shown again.
    <form action={action} noValidate className="space-y-5" ref={(f) => () => f?.reset()}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={err.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? `${id("name")}-error` : undefined}
            className="input"
            placeholder="Your name"
          />
        </Field>
        <Field id={id("email")} label="Email" error={err.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? `${id("email")}-error` : undefined}
            className="input"
            placeholder="you@company.com"
          />
        </Field>
      </div>

      {withService && (
        <Field id={id("service")} label="Service (optional)">
          <select id={id("service")} name="service" defaultValue={v.service ?? ""} className="input appearance-none">
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field id={id("details")} label="Project details" error={err.details}>
        <textarea
          id={id("details")}
          name="details"
          rows={5}
          required
          defaultValue={v.details}
          aria-invalid={!!err.details}
          aria-describedby={err.details ? `${id("details")}-error` : undefined}
          className="input resize-none"
          placeholder="What are you building, who is it for and when do you need it?"
        />
      </Field>

      {/* Spam protection: honeypot + time trap */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input
        type="hidden"
        name="t"
        defaultValue="0"
        ref={(el) => {
          if (el && el.value === "0") el.value = String(Date.now());
        }}
      />

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-2xl border border-line-strong bg-white/[0.04] px-4 py-3 text-sm text-silver-100">
          {state.message}
        </p>
      )}

      <div className="relative pt-2">
        <div aria-hidden className="absolute inset-x-6 -bottom-4 h-14 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.22),transparent)]" />
        <MagneticButton type="submit" size="lg" icon="send" disabled={pending} className="w-full" strength={6}>
          {pending ? "Sending…" : "Send message"}
        </MagneticButton>
      </div>
    </form>
  );
}

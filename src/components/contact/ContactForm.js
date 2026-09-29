'use client';

import Link from 'next/link';
import { useActionState, useEffect, useRef } from 'react';
import { sendInquiry } from '@/app/contact/actions';
import Icon from '@/components/ui/Icon';

const MESSAGES = {
  sent: {
    tone: 'ok',
    title: 'Thank you. Your inquiry has been sent.',
    text: 'The team will be in touch.',
  },
  unconfigured: {
    tone: 'warn',
    title: 'The contact form isn’t connected yet.',
    text: 'Your message was not sent. Official contact details will be published here soon.',
  },
  error: {
    tone: 'warn',
    title: 'Something went wrong and your message was not sent.',
    text: 'Please try again in a moment.',
  },
};

const inputBase =
  'bg-ink border-line text-paper placeholder:text-muted/70 w-full border px-4 py-3.5 text-base transition-colors duration-200 hover:border-paper/30 focus:border-olive-hi focus:outline-none aria-[invalid=true]:border-[#c98a6b]';

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-paper/80 mb-2 flex justify-between text-xs tracking-[0.16em] uppercase"
      >
        {label}
        {optional && <span className="text-muted tracking-normal normal-case">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#e0a58a]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Contact form. Works without JavaScript (plain form post to the server action). */
export default function ContactForm({ pillars }) {
  const [state, action, pending] = useActionState(sendInquiry, { status: 'idle', values: {} });
  const status = useRef(null);
  const errors = state.errors ?? {};
  const v = state.values ?? {};
  const msg = MESSAGES[state.status];

  // Move focus to the result (or the first invalid field) after a submission.
  useEffect(() => {
    if (state.status === 'invalid') {
      document.querySelector('#contact-form [aria-invalid="true"]')?.focus();
    } else if (msg) {
      status.current?.focus();
    }
  }, [state, msg]);

  const aria = (k) => ({
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });

  return (
    <form id="contact-form" action={action} noValidate className="space-y-7">
      {msg && (
        <div
          ref={status}
          tabIndex={-1}
          role="status"
          className={`border-l-2 p-5 outline-none ${
            msg.tone === 'ok' ? 'border-olive-hi bg-olive/15' : 'border-[#c98a6b] bg-[#c98a6b]/10'
          }`}
        >
          <p className="text-white">{msg.title}</p>
          <p className="text-paper/75 mt-1 text-sm">{msg.text}</p>
        </div>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={v.name}
            className={inputBase}
            {...aria('name')}
          />
        </Field>
        <Field id="company" label="Company" optional error={errors.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            defaultValue={v.company}
            className={inputBase}
            {...aria('company')}
          />
        </Field>
      </div>

      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          defaultValue={v.email}
          className={inputBase}
          {...aria('email')}
        />
      </Field>

      <fieldset>
        <legend className="text-paper/80 mb-3 flex w-full justify-between text-xs tracking-[0.16em] uppercase">
          Area of interest
          <span className="text-muted tracking-normal normal-case">Optional</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ...pillars.map((p) => ({ value: p.slug, label: p.name, number: p.number })),
            { value: 'unsure', label: 'Not sure yet' },
          ].map((o) => (
            <label
              key={o.value}
              className="group border-line bg-ink has-[:checked]:border-olive-hi has-[:checked]:bg-olive/15 hover:border-paper/30 flex cursor-pointer items-center gap-3 border px-4 py-3.5 transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-olive-hi)]"
            >
              <input
                type="radio"
                name="pillar"
                value={o.value}
                defaultChecked={v.pillar === o.value}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className="border-muted group-has-[:checked]:border-olive-hi group-has-[:checked]:bg-olive-hi size-3 shrink-0 rounded-full border"
              />
              <span className="text-paper text-sm">
                {o.number && <span className="text-olive-hi mr-2 text-xs">{o.number}</span>}
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="message" label="Project / message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={v.message}
          placeholder="What do you need, and roughly when?"
          className={`${inputBase} resize-y`}
          {...aria('message')}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            className="accent-olive mt-1 size-4 shrink-0"
            {...aria('consent')}
          />
          <span className="text-paper/75 text-sm leading-relaxed">
            I agree to MAEVEN Productions contacting me about this inquiry and processing my details
            as described in the{' '}
            <Link
              href="/privacy"
              className="text-paper underline underline-offset-4 hover:text-white"
            >
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-sm text-[#e0a58a]">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group bg-olive hover:bg-olive-hi hover:text-ink inline-flex w-full items-center justify-center gap-3 px-8 py-4 text-base font-medium text-white transition-colors duration-200 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'Sending…' : 'Send inquiry'}
        {!pending && (
          <Icon
            name="arrow"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        )}
      </button>
    </form>
  );
}

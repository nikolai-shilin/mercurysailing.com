'use client';

import { useState, useEffect } from 'react';
import s from './s.module.css';
import { Button } from 'components/common/Button/Button';
import { Section } from 'components/Section/Section/Section';
import { SectionContainer } from 'components/Section/SectionContainer/SectionContainer';
import { SectionContainerTwo } from 'components/Section/SectionContainerTwo/SectionContainerTwo';

const STORAGE_KEY = 'cookieConsent';

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored === null) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className={ s.overlay } role="dialog" aria-label="Cookie consent">
      <div className={ s.modal }>
        <SectionContainerTwo>
          <div className={ s.content }>
            <p>
              <strong style={ { color: 'var(--color-black)' } }>This website uses cookies.</strong></p>
            <p className={ s.text }>
              This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.
            </p>
          </div>
          <div className={ s.actions }>
            <Button
              label="Accept"
              onClick={ () => save('accepted') }
              color="blue"
              size="lg"
              withBorder={ true }
            />
            <Button label="Decline"
              onClick={ () => save('declined') }
              color="gray"
              size="lg"
              withBorder={ true }
            />
          </div>
        </SectionContainerTwo>
      </div>
    </div>
  );
}

'use client';

import { useActionState } from 'react';
import { Section } from '../Section/Section';
import { SectionContainerTwo } from '../SectionContainerTwo/SectionContainerTwo';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { Button } from 'components/common/Button/Button';
import type { Theme } from 'types/theme';
import hi from '../SectionWithHalfImage/s.module.css';
import bk from 'components/SectionBooking/s.module.css';
import s from './s.module.css';
import type { Locale } from 'lib/i18n';
import getDict from './dict';
import { Group } from 'components/common/Group/Group';
import { Stack } from 'components/common/Stack/Stack';
import { ShowToSm } from 'components/common/ShowToSm/ShowToSm';
import { ShowFromSm } from 'components/common/ShowFromSm/ShowFromSm';


type ActionState = { ok: boolean } | null;

const FORM_ID = 'quote-request-form';

export type SectionWithQuoteFormProps = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  theme?: Theme;
  locale?: Locale;
}


export function SectionWithQuoteForm({ action, theme = 'white', locale = 'en' }: SectionWithQuoteFormProps) {
  const d = getDict(locale);
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <Section theme={theme}>
      <SectionContainerTwo>

        <div className={hi.left}>
          <div className={hi.header}>
            <SectionTitle section={d.section} title={d.title} theme={theme} />
            <SectionPreface text={d.description} theme={theme} style={{ maxWidth: '100%' }} />
          </div>
          <ShowFromSm>
            {state?.ok ? (
              <div className={s.success}>
                <p className={s.successTitle}>{d.successTitle}</p>
                <p className={s.successText}>{d.successText}</p>
              </div>
            ) : (
              <Button
                label={isPending ? d.sending : d.submit}
                color="blue"
                withBorder
                withArrow
                htmlType="submit"
                form={FORM_ID}
              />
            )}
          </ShowFromSm>
        </div>

        <div className={s.formSlot}>
          {!state?.ok && (
            <form id={FORM_ID} action={formAction} className={bk.form}>
              <input type="hidden" name="lang" value={locale} />
              <Stack gap="sm" style={{ width: '100%' }}>
                <Group gap="xs" style={{ width: '100%' }}>
                  <label className={bk.inputLabel} style={{width:'100%'}}>
                    <div>{d.name} *</div>
                    <input
                      type="text"
                      name="name"
                      placeholder={d.namePlaceholder}
                      required
                      className={bk.inputText}
                      style={{width:'100%'}}

                    />
                  </label>

                  <label className={bk.inputLabel}  style={{width:'100%'}}>
                    <div>{d.email} *</div>
                    <input
                      type="email"
                      name="email"
                      placeholder={d.emailPlaceholder}
                      required
                      className={bk.inputText}
                      style={{width:'100%'}}

                    />
                  </label>
                </Group>
                <Group gap="xs" style={{ width: '100%' }}>
                  <label className={bk.inputLabel} style={{width:'100%'}}>
                    <div>{d.company}</div>
                    <input
                      type="text"
                      name="company"
                      placeholder={d.companyPlaceholder}
                      className={bk.inputText}
                    />
                  </label>

                  <label className={bk.inputLabel}  style={{width:'50%'}}>
                    <div>{d.teamSize} *</div>
                    <input
                      type="number"
                      name="teamSize"
                      placeholder={d.teamSizePlaceholder}
                      required
                      className={bk.inputText}
                      style={{width:'100%'}}
                    />
                  </label>
                </Group>
                <Group gap="xs">
                <label className={bk.inputLabel} style={{width:'100%'}}>
                  <div>{d.destination}</div>
                  <select name="destination" className={bk.inputText}>
                    <option value="">{d.destinationAny}</option>
                    {d.destinations.map((dest) => (
                      <option key={dest.value} value={dest.value}>{dest.label}</option>
                    ))}
                  </select>
                </label>

                <label className={bk.inputLabel} style={{width:'100%'}}>
                  <div>{d.timeframe}</div>
                  <input
                    type="text"
                    name="timeframe"
                    placeholder={d.timeframePlaceholder}
                    className={bk.inputText}
                  />
                </label>
                </Group>
                <label className={bk.inputLabel}>
                  <div>{d.message}</div>
                  <textarea
                    name="message"
                    placeholder={d.messagePlaceholder}
                    className={bk.inputText}
                  />
                </label>
                <ShowToSm>
                  {state?.ok ? (
                    <div className={s.success}>
                      <p className={s.successTitle}>{d.successTitle}</p>
                      <p className={s.successText}>{d.successText}</p>
                    </div>
                  ) : (
                    <Button
                      label={isPending ? d.sending : d.submit}
                      color="blue"
                      withBorder
                      withArrow
                      htmlType="submit"
                      form={FORM_ID}
                      stretch
                    />
                  )}
                </ShowToSm>
              </Stack>
            </form>
          )}
        </div>

      </SectionContainerTwo>
    </Section>
  );
}

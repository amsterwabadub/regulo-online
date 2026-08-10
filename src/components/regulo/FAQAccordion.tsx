import React from 'react';
import { IconPlus } from './Icons';

export interface FAQEntry {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQEntry[];
}

/**
 * Native <details>/<summary> accordion.
 *
 * Chosen over a JS disclosure deliberately: the answer text is present in the
 * server-rendered HTML (so it stays crawlable and eligible for FAQ rich
 * results), keyboard and screen-reader behaviour comes from the platform, and
 * the section needs no client JavaScript at all.
 */
export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="rg-faq">
      {items.map((item) => (
        <details className="rg-faq__item" key={item.question}>
          <summary>
            <span>{item.question}</span>
            <span className="rg-faq__sign" aria-hidden="true">
              <IconPlus size={14} />
            </span>
          </summary>
          <p className="rg-faq__answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

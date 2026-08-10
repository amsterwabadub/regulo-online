import React from 'react';

export interface Step {
  title: string;
  text: string;
}

interface HowItWorksProps {
  steps: Step[];
}

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <ol className="rg-steps">
      {steps.map((step, index) => (
        <li className="rg-step" key={step.title}>
          <span className="rg-step__num" aria-hidden="true">
            {index + 1}
          </span>
          <h3 className="rg-step__title">{step.title}</h3>
          <p className="rg-step__text">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

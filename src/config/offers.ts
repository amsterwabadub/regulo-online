/**
 * Commercial offers per market.
 *
 * There is currently NO signed affiliate or partner for any Regulo market, so
 * every entry is `enabled: false` with a null destination. The CTA renders in a
 * WAITING_FOR_OFFER state: it is visible for measurement (commercial_cta_view)
 * but is not a link, makes no promise about who answers, and cannot send a user
 * anywhere.
 *
 * To activate a market: set `enabled: true` and provide a real `url`. Nothing
 * else needs to change — tracking, copy and layout are already in place.
 * Do NOT put a placeholder or guessed URL here.
 */
export interface MarketOffer {
  enabled: boolean;
  /** Real destination. Null until a genuine partner/affiliate exists. */
  url: string | null;
  /** Localized CTA label. */
  label: string;
  /** Localized one-line description of what the calculator can help with next. */
  blurb: string;
  /** Shown instead of the button while no offer exists. */
  pendingNote: string;
}

export const MARKET_OFFERS: Record<'ke' | 'mx' | 'co' | 'ma', MarketOffer> = {
  mx: {
    enabled: false,
    url: null,
    label: 'Habla con un contador',
    blurb: '¿Dudas con tu aguinaldo o tu declaración? Un contador puede revisar tu caso.',
    pendingNote: 'Estamos seleccionando contadores verificados. Aún no hay recomendaciones disponibles.',
  },
  co: {
    enabled: false,
    url: null,
    label: 'Habla con un contador',
    blurb: '¿Dudas con tu retención en la fuente? Un contador puede revisar tu caso.',
    pendingNote: 'Estamos seleccionando contadores verificados. Aún no hay recomendaciones disponibles.',
  },
  ke: {
    enabled: false,
    url: null,
    label: 'Talk to a tax specialist',
    blurb: 'Questions about your PAYE, SHIF or housing levy? A specialist can review your case.',
    pendingNote: 'We are still vetting tax specialists. No recommendation is available yet.',
  },
  ma: {
    enabled: false,
    url: null,
    label: 'Parler à un comptable',
    blurb: "Des questions sur votre IR ou vos cotisations CNSS ? Un comptable peut vérifier votre situation.",
    pendingNote: "Nous sélectionnons encore des comptables vérifiés. Aucune recommandation n'est disponible pour le moment.",
  },
};

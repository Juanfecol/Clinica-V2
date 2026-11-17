import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatWhatsAppMessage,
  clampValue,
  getNextReviewIndex,
  getPrevReviewIndex,
} from './booking';
import { resolveLocaleFromLanguages, type SupportedLocale } from '../i18n/types';
import { SITE_TRANSLATIONS } from '../i18n/siteTranslations';
import { getLocalizedPricing, getChatbotTranslations, PRICE_MODAL_UI } from '../i18n/modalTranslations';

test('formatWhatsAppMessage builds correct portuguese text', () => {
  const result = formatWhatsAppMessage({
    nome: 'Maria Silva',
    telefone: '912345678',
    tratamento: 'Implantologia',
    dia: 'Segunda a Sexta',
    hora: 'Manhã',
  });

  assert.ok(result.includes('*Nome:* Maria Silva'));
  assert.ok(result.includes('*Telefone:* 912345678'));
  assert.ok(result.includes('*Tratamento:* Implantologia'));
  assert.ok(result.includes('*Preferência de dia:* Segunda a Sexta'));
  assert.ok(result.includes('*Preferência de hora:* Manhã'));
});

test('clampValue restricts range accurately and handles NaN/Infinity', () => {
  assert.equal(clampValue(0.5, 0, 1), 0.5);
  assert.equal(clampValue(-0.2, 0, 1), 0);
  assert.equal(clampValue(1.5, 0, 1), 1);
  assert.equal(clampValue(NaN, 0, 1), 0);
  assert.equal(clampValue(Infinity, 0, 1), 0);
  assert.equal(clampValue(-Infinity, 0, 1), 0);
});

test('review navigation loops correctly', () => {
  assert.equal(getNextReviewIndex(0, 4), 1);
  assert.equal(getNextReviewIndex(3, 4), 0);
  assert.equal(getPrevReviewIndex(0, 4), 3);
  assert.equal(getPrevReviewIndex(2, 4), 1);
});

test('resolveLocaleFromLanguages maps device languages accurately', () => {
  assert.equal(resolveLocaleFromLanguages(['pt-PT', 'en-US']), 'pt');
  assert.equal(resolveLocaleFromLanguages(['pt-BR']), 'pt');
  assert.equal(resolveLocaleFromLanguages(['es-ES', 'en']), 'es');
  assert.equal(resolveLocaleFromLanguages(['es-MX']), 'es');
  assert.equal(resolveLocaleFromLanguages(['ca-ES', 'es-ES']), 'es');
  assert.equal(resolveLocaleFromLanguages(['gl-ES']), 'es');
  assert.equal(resolveLocaleFromLanguages(['en-GB']), 'en');
  assert.equal(resolveLocaleFromLanguages(['fr-FR']), 'fr');
  assert.equal(resolveLocaleFromLanguages(['de-DE']), 'de');
  assert.equal(resolveLocaleFromLanguages(['it-IT']), 'it');
  assert.equal(resolveLocaleFromLanguages(['nl-NL']), 'en');
  assert.equal(resolveLocaleFromLanguages([]), 'pt');
});

test('all 6 locales have complete, placeholder-free clinical translations and modals', () => {
  const locales: SupportedLocale[] = ['pt', 'es', 'en', 'fr', 'de', 'it'];
  const treatmentIds = [
    'Implantologia',
    'Ortodontia invisível',
    'Estética dentária',
    'Branqueamento',
    'Endodontia',
    'Próteses',
    'Cirurgia Oral',
    'Medicina dentária geral',
    'Odontopediatria',
  ];

  for (const loc of locales) {
    const bundle = SITE_TRANSLATIONS[loc];
    assert.ok(bundle.meta.title.length > 10, `Missing meta title for ${loc}`);
    assert.ok(bundle.manifesto.text.split(/\s+/).length >= 15, `Manifesto too short for ${loc}`);
    assert.equal(bundle.clinica.spaces.length, 9, `Expected 9 clinic spaces for ${loc}`);
    assert.equal(bundle.faq.items.length, 6, `Expected 6 FAQs for ${loc}`);

    for (const faq of bundle.faq.items) {
      assert.ok(!faq.answer.includes('['), `Unresolved placeholder bracket in FAQ (${loc}): ${faq.answer}`);
    }

    for (const id of treatmentIds) {
      assert.ok(bundle.tratamentosSection.items[id]?.title, `Missing treatment ${id} for ${loc}`);
      const pricing = getLocalizedPricing(id, loc);
      assert.ok(pricing && pricing.items.length > 0, `Missing pricing table for ${id} (${loc})`);
    }

    assert.ok(PRICE_MODAL_UI[loc].eyebrow.length > 0);
    const chat = getChatbotTranslations(loc);
    assert.ok(chat.nodes.MENU_PRINCIPAL.text.length > 0);

    const waMsg = bundle.marcacao.whatsappMessage({
      nome: 'Carlos',
      telefone: '910000000',
      tratamento: bundle.tratamentosSection.items['Implantologia'].title,
      dia: bundle.marcacao.dayWeekdays,
      hora: bundle.marcacao.timeMorning,
    });
    assert.ok(waMsg.includes('Carlos'));
  }
});

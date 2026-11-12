import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatWhatsAppMessage,
  clampValue,
  getNextReviewIndex,
  getPrevReviewIndex,
} from './booking.ts';

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

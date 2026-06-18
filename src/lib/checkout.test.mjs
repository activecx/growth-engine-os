import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildInitialElementsOptions,
  buildInitialPaymentIntentParams,
  normalizeInitialOrder,
} from './checkout.ts';
import { submitInitialPayment } from './checkout-client.ts';

test('initial order input is normalized without requiring a PaymentMethod id', () => {
  const order = normalizeInitialOrder({
    name: '  Zaid  ',
    email: '  ZAID@Example.COM ',
    brand: '  TopK AI  ',
    whatsapp: '  +962  ',
    bump: true,
  });

  assert.deepEqual(order, {
    name: 'Zaid',
    email: 'zaid@example.com',
    brand: 'TopK AI',
    whatsapp: '+962',
    bump: true,
  });
});

test('initial PaymentIntent is created for client confirmation from the Payment Element', () => {
  const params = buildInitialPaymentIntentParams({
    amountCents: 7600,
    customerId: 'cus_123',
    email: 'zaid@example.com',
    brand: 'TopK AI',
    bump: true,
  });

  assert.equal(params.amount, 7600);
  assert.equal(params.currency, 'usd');
  assert.equal(params.customer, 'cus_123');
  assert.deepEqual(params.automatic_payment_methods, { enabled: true });
  assert.equal(params.setup_future_usage, 'off_session');
  assert.equal(Object.hasOwn(params, 'payment_method'), false);
  assert.equal(Object.hasOwn(params, 'confirm'), false);
});

test('Elements options match the off-session save intent used by the server', () => {
  const options = buildInitialElementsOptions(7600);

  assert.equal(options.mode, 'payment');
  assert.equal(options.amount, 7600);
  assert.equal(options.currency, 'usd');
  assert.equal(options.setupFutureUsage, 'off_session');
});

test('client checkout confirms with Elements and never creates or posts a PaymentMethod id', async () => {
  let postedBody;
  let confirmOptions;
  const elements = { submit: async () => ({}) };
  const stripe = {
    createPaymentMethod: async () => {
      throw new Error('createPaymentMethod should not be called');
    },
    confirmPayment: async (options) => {
      confirmOptions = options;
      return { paymentIntent: { status: 'succeeded' } };
    },
  };

  const result = await submitInitialPayment({
    stripe,
    elements,
    order: {
      name: 'Zaid',
      email: 'zaid@example.com',
      brand: 'TopK AI',
      whatsapp: '+962',
      bump: false,
      paymentMethodId: 'pm_should_not_be_forwarded',
    },
    createOrder: async (body) => {
      postedBody = body;
      return { orderId: 'order_123', clientSecret: 'pi_secret_123' };
    },
    returnUrl: 'https://lp.topk.agency/lp/a/oto1',
    submitTimeoutMs: 1000,
  });

  assert.equal(result.ok, true);
  assert.equal(postedBody.paymentMethodId, undefined);
  assert.equal(confirmOptions.elements, elements);
  assert.equal(confirmOptions.clientSecret, 'pi_secret_123');
  assert.equal(confirmOptions.redirect, 'if_required');
  assert.equal(Object.hasOwn(confirmOptions, 'payment_method'), false);
});

test('client checkout exits Processing state when Stripe submit never returns', async () => {
  const result = await submitInitialPayment({
    stripe: { confirmPayment: async () => ({ paymentIntent: { status: 'succeeded' } }) },
    elements: { submit: async () => new Promise(() => {}) },
    order: {
      name: 'Zaid',
      email: 'zaid@example.com',
      brand: 'TopK AI',
      whatsapp: '',
      bump: false,
    },
    createOrder: async () => {
      throw new Error('createOrder should not be called after submit timeout');
    },
    returnUrl: 'https://lp.topk.agency/lp/a/oto1',
    submitTimeoutMs: 10,
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /taking too long/i);
});

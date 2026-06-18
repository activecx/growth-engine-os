type StripeError = { message?: string };
type StripePaymentIntent = { status?: string };

type StripeLike = {
  confirmPayment(options: never): Promise<{ error?: StripeError; paymentIntent?: StripePaymentIntent }>;
};

type ElementsLike = {
  submit(): Promise<{ error?: StripeError }>;
};

export type InitialPaymentOrder = {
  name: string;
  email: string;
  brand: string;
  whatsapp: string;
  bump: boolean;
};

type InitialPaymentOrderInput = InitialPaymentOrder & Record<string, unknown>;

type CreateOrderResponse = {
  orderId?: string;
  clientSecret?: string;
  status?: string;
  error?: string;
};

type SubmitInitialPaymentArgs = {
  stripe: StripeLike;
  elements: ElementsLike;
  order: InitialPaymentOrderInput;
  createOrder(body: InitialPaymentOrder): Promise<CreateOrderResponse>;
  returnUrl: string;
  submitTimeoutMs?: number;
};

type SubmitInitialPaymentResult =
  | { ok: true; orderId: string; clientSecret: string; status?: string }
  | { ok: false; error: string };

const SUCCESS_STATUSES = new Set(['succeeded', 'processing', 'requires_capture']);

function orderRequestBody(order: InitialPaymentOrderInput): InitialPaymentOrder {
  return {
    name: order.name,
    email: order.email,
    brand: order.brand,
    whatsapp: order.whatsapp,
    bump: order.bump === true,
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  let timeout: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new Error(message)), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeout));
}

export async function submitInitialPayment({
  stripe,
  elements,
  order,
  createOrder,
  returnUrl,
  submitTimeoutMs = 60000,
}: SubmitInitialPaymentArgs): Promise<SubmitInitialPaymentResult> {
  try {
    const submit = await withTimeout(
      elements.submit(),
      submitTimeoutMs,
      'Stripe is taking too long to respond. Please try again, or use the Card tab instead of a saved Link card.'
    );

    if (submit.error) {
      return { ok: false, error: submit.error.message ?? 'Card error' };
    }

    const created = await createOrder(orderRequestBody(order));
    if (created.error || !created.orderId || !created.clientSecret) {
      return { ok: false, error: created.error ?? 'Payment failed. Please try again.' };
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: created.clientSecret,
      confirmParams: {
        return_url: `${returnUrl}?orderId=${created.orderId}`,
      },
      redirect: 'if_required',
    } as never);

    if (confirmError) {
      return { ok: false, error: confirmError.message ?? 'Payment failed' };
    }

    if (paymentIntent?.status && !SUCCESS_STATUSES.has(paymentIntent.status)) {
      return {
        ok: false,
        error: `Payment was not completed. Current status: ${paymentIntent.status}.`,
      };
    }

    return {
      ok: true,
      orderId: created.orderId,
      clientSecret: created.clientSecret,
      status: paymentIntent?.status ?? created.status,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Payment failed. Please try again.',
    };
  }
}

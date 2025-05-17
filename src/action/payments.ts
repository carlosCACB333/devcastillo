"use server";

import { env } from "@/utils";

const preferenceUrl = "https://api.mercadopago.com/checkout/preferences";

interface CoffePreferenceState {
  ok?: boolean;
  error?: string;
  url?: string;
}

export const createCoffePreference = async (
  _prev: CoffePreferenceState,
  form: FormData
): Promise<CoffePreferenceState> => {
  try {
    const amount = Number(form.get("amount"));
    if (isNaN(amount) || amount < 5) {
      return {
        ok: false,
        error: "El monto mínimo es S/5.00",
      };
    }

    const body = {
      items: [
        {
          title: "Coffe",
          description: "Invite me a coffe",
          quantity: 1,
          // currency_id: "PEN",
          unit_price: amount,
        },
      ],
      back_urls: {
        success: `${env.site.url}/donate/completed/`,
        failure: `${env.site.url}/donate/completed/`,
        pending: `${env.site.url}/donate/completed/`,
      },
      auto_return: "approved",
    };

    const response = await fetch(preferenceUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.mercadopago.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: "Error creating preference",
      };
    }

    const data = await response.json();
    const url = data.init_point;
    return {
      ok: true,
      url,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Error creating preference",
    };
  }
};

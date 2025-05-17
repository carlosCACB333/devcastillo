"use client";

import { createCoffePreference } from "@/action/payments";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useActionState, useState } from "react";

export default function DonationPage() {
  const [amount, setAmount] = useState("5");
  const [state, dispatch, loading] = useActionState(createCoffePreference, {
    ok: true,
  });

  if (state.ok && state.url) {
    window.location.href = state.url;
  }

  return (
    <>
      <br />
      <br />
      <div className="max-w-sm mx-auto">
        <div>
          <h2 className="text-2xl font-bold">¡Gracias por tu apoyo!</h2>
          <p>
            Si te gusta lo que hago y quieres apoyarme, puedes invitarme un
            café.
          </p>
        </div>
        <br />

        <form action={dispatch} className="flex flex-col gap-2">
          <Input
            name="amount"
            validationBehavior="aria"
            type="number"
            placeholder="Cantidad"
            step="1"
            min="1"
            startContent="S/"
            size="lg"
            value={amount}
            isInvalid={!state.ok}
            errorMessage={state.error}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            fullWidth
            color="primary"
            type="submit"
            isLoading={loading}
            isDisabled={loading}
          >
            Continuar
          </Button>
        </form>
      </div>
    </>
  );
}

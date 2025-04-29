"use client";

import { env } from "@/utils";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";

export default function DonationPage() {
  const [amount, setAmount] = useState("1");
  const tx_amount = Math.round(parseFloat(amount) * 100) / 100;
  const [showInput, setShowInput] = useState(true);

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const tx_id = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: tx_amount.toFixed(2),
            currency_code: "USD",
          },
        },
      ],
    });
    return tx_id;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const order = await actions.order?.capture();
    if (order?.status === "COMPLETED") {
      setAmount("1");
      setShowInput(true);
      toast.success("¡Gracias por tu apoyo!");
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: env.paypal.clientId,
        intent: "capture",
        currency: "USD",
      }}
    >
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
        <div className="flex flex-col gap-2">
          {showInput ? (
            <>
              <Input
                type="number"
                placeholder="Cantidad"
                step="1"
                min="1"
                endContent="$"
                size="lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button color="primary" onClick={() => setShowInput(false)}>
                Continuar
              </Button>
            </>
          ) : (
            <>
              <Button isIconOnly onClick={() => setShowInput(true)}>
                <FaArrowLeft />
              </Button>
              <div className="flex justify-between">
                <span className="text-lg">Total:</span>
                <span className="text-lg font-bold">
                  ${tx_amount.toFixed(2)}
                </span>
              </div>
              <PayPalButtons
                disabled={isNaN(tx_amount) || tx_amount <= 0}
                style={{
                  color: "blue",
                  label: "donate",
                }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

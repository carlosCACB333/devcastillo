import { PageProps } from "@/interfaces";

const messages = {
  approved: {
    title: "¡Gracias por tu donación!",
    message: "Tu apoyo es muy valioso para nosotros.",
  },
  pending: {
    title: "¡Gracias por tu donación!",
    message: "Tu pago está pendiente de confirmación.",
  },
  in_process: {
    title: "¡Gracias por tu donación!",
    message: "Tu pago está pendiente de confirmación.",
  },
  failure: {
    title: "¡Ups!",
    message: "Tu pago ha fallado.",
  },
  rejected: {
    title: "¡Ups!",
    message: "Tu pago ha fallado.",
  },
  null: {
    title: "¡Ups!",
    message: "No hemos podido procesar tu pago.",
  },
};

export default async function Page({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const message = messages[status as "null"] || messages.null;
  console.log("status", status);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-16">
      <h1 className="text-2xl font-bold">{message.title}</h1>
      <p className="mt-4 text-lg">{message.message}</p>
    </div>
  );
}

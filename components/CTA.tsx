import Image from "next/image";
import config from "@/config";
import ButtonLead from "./ButtonLead";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1582730147924-d92f4da00252?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Shhhhh.. super secret record collector tool under development 🤫
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
            Sign up to our mailing list here to be the first to know when our record collector batman belt is ready to go. Find record prices quickly, great for sellers and buyers
          </p>

          <ButtonLead />
        </div>
      </div>
    </section>
  );
};

export default CTA;

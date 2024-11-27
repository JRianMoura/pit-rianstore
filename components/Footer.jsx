import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="pt-12 xl:pt-24 bg-primary text-white text-center">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="capitalize leading-tight mb-2">
              Se inscreva na nossa Newsletter
            </h2>
            <p className="text-white/60">
              Para ser o primeiro a receber as mais recentes novidades sobre a
              moda, promoções e muito mais!
            </p>
          </div>
          <form className="flex flex-col xl:flex-row w-full max-w-[720px] mx-auto gap-5">
            <Input placeholder="Seu endereço de e-mail" />
            <button className="btn w-full xl:max-w-[150px] h-[60px] btn-accent rounded-md">
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div className="py-3 border-t border-white/5 text-white/60 mt-10">
        Copyright &copy; 2024 Rian-Store. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;

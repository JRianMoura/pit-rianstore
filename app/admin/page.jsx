"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Ajustar valor", path: "/example" },
  { name: "Adm Vendas", path: "/example" },
  { name: "Cadastrar novo produto", path: "/cadastro-produto" },
  { name: "Gerencia de estoque", path: "/gerencia-estoque" },
];
const page = () => {
  const pathname = usePathname();
  return (
    <section className="py-40 px-20 md:py-10 md:h-[590px] relative overflow-hidden bg-white border-2">
      <div className="container mx-auto">
        <h3 className="mb-6">Pagina de Adminstração da Rian Store</h3>
        <div className="flex gap-3">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`btn btn-primary ${
                  link.path === pathname && "text-accent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default page;

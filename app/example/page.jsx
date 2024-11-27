import Image from "next/image";

const page = () => {
  return (
    <section className="py-40 px-20 md:py-10 md:h-[590px] relative overflow-hidden bg-white border-2">
      <div className="container mx-auto flex justify-center items-center">
        <h1>Página de Exemplo</h1>
        <Image
          src={"t-shirt.svg"}
          width={400}
          height={400}
          alt=""
          quality={100}
        />
      </div>
    </section>
  );
};

export default page;

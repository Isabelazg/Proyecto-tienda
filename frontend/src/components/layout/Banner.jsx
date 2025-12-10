import React from "react";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-white rounded-xl shadow-lg mt-8 mx-auto max-w-6xl">
      <div className="flex-1">
        <h2 className="text-lime-500 font-semibold text-lg mb-2">Bienvenido a nuestra tienda</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ofertas Especiales</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta assumenda, eligendi voluptate cum ipsam ex reiciendis accusantium ipsum ab! Quasi cumque officia, impedit iusto quos corporis quaerat sed sunt asperiores?
        </p>
        <div className="flex gap-4">
          <button className="btn btn-primary">Información</button>
          <button className="btn btn-secondary">Leer Más</button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        {/* Imagen de productos, puedes cambiarla por la tuya */}
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Productos" className="w-80 h-80 object-contain" />
      </div>
    </section>
  );
};

export default Banner;

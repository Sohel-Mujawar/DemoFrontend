import React from 'react';
import p1 from '@/assets/images/product/p1.jpeg';
import p2 from '@/assets/images/product/p2.jpg';
import p3 from '@/assets/images/product/p3.jpg';
// import p4 from '@/assets/images/product/p4.jpg';
import p5 from '@/assets/images/product/p5.jpeg';

const Products: React.FC = () => {
  // Product data
  const products = [
    {
      name: 'Imunity Booster',
      image: p1,
    },
    {
      name: 'Spiruboost',
      image: p2,
    },
    {
      name: 'Spiruboost',
      image: p3,
    },
    // {
    //   name: 'Spiruboost',
    //   image: p4,
    // },
    {
      name: 'StepWell',
      image: p5,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="title-font text-purple mb-8 text-center text-2xl font-semibold sm:text-3xl">
        Products
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-4 text-center shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-4 h-80 w-full rounded-md object-contain"
            />
            <h2 className="text-lg font-semibold text-black">{product.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

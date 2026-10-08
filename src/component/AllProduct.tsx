import React from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Product data load failed");
  }

  const products: Product[] = await res.json();

  const unitBn: Record<string, string> = {
    kg: "প্রতি কেজি",
   
  };

  const bn = (number: number) => number.toLocaleString("bn-BD");

  return (
    <section className="mx-auto w-full max-w-[1150px] mt-8">
      {/* Section Header */}
      <div className="mb-5 pt-8">
        <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>

        <p className="mt-1 text-sm text-gray-500">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      </div>

      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Product Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {product.image}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{product.nameBn}</h3>

                  <span className="text-sm text-gray-500">
                    {unitBn[product.unit]}
                  </span>
                </div>
              </div>

             
            </div>

            
         <div className="mt-5 flex items-end justify-between">
  {/* Price - Left */}
  <div>
    <p className="text-sm text-gray-500">আজকের দাম</p>

    <div className="mt-1 flex items-baseline gap-1">
      <span className="text-2xl font-semibold text-gray-900">
        {bn(product.today)}
      </span>

      <span className="text-gray-800">
        টাকা
      </span>
    </div>
  </div>

 
  <div
    className={`rounded-lg px-2 py-1 text-xs font-bold ${
      product.change.dir === "up"
        ? "bg-red-50 text-red-500"
        : product.change.dir === "down"
          ? "bg-green-50 text-green-600"
          : "bg-gray-100 text-gray-500"
    }`}
  >
    {product.change.dir === "up"
      ? `▲${product.change.pct}%`
      : product.change.dir === "down"
        ? `▼${product.change.pct}%`
        : "-0.0%"}
  </div>
</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;

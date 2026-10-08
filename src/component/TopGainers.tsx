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

const TopGainers = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Product data load failed");
  }

  const products: Product[] = await res.json();

  // শুধু যেসব product-এর দাম বেড়েছে সেগুলো নেওয়া হচ্ছে
  const topGainers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const bn = (number: number) => number.toLocaleString("bn-BD");

  return (
    <section className="mx-auto w-full max-w-[1200px] mt-8">
      <div className="mb-5">
        
        <h2 className="text-2xl font-bold text-gray-900"><span className="font-bold text-red-500">▲ </span>আজ দাম বেড়েছে</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topGainers.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Top section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {product.image}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{product.nameBn}</h3>

                  <p className="text-sm text-gray-500">
                    {product.categoryNameBn}
                  </p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-800">আজকের দাম</p>

                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-gray-900">
                    ৳{bn(product.today)}
                  </span>
                  <span className="text-gray-800 ">টাকা</span>
                </div>
              </div>

              {/* Percentage */}
              <div className="rounded-full bg-gray-100 px-3 py-2 text-right">
                <p className="font-bold text-red-500">
                  ▲ {product.change.pct}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopGainers;

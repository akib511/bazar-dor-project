import Link from "next/link";

interface Category {
  id: number;
  category: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Category data load failed");
  }

  const data: Category[] = await res.json();

  return (
    <div className="flex gap-4 pt-8">
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/category/${item.category}`}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
        >
          <span>{item.icon}</span>

          <span>{item.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLink;
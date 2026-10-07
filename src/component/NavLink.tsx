
import React from 'react';

const NavLink = async() => {
  const res = await fetch ('https://api.api-store.workers.dev/api/bazardor/categories')
  const data = await res.json()
  
  return (
       <div className='flex gap-4 pt-8 '>
      {data.map((item) => (
        <div key={item.id}>
          {item.icon}
          {item.nameBn}
        </div>
      ))}
    </div>
  );
};

export default NavLink;
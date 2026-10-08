import Banner from '@/component/Banner';
import TopGainers from '@/component/TopGainers';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <div>
       <Banner />
       <Suspense><TopGainers /></Suspense>
    </div>
  );
};

export default page;
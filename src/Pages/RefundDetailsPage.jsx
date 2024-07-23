import React from 'react';
import { Navigator } from '../Components/Navigator/Navigator';
import { ProductCard } from '../Components/ProductCard/ProductCard';
import { ButtonNavigator } from '../Components/ButtonNavigator/ButtonNavigator';


export const RefundDetailsPage = (props) => {
  return (
    <>
      <Navigator />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ButtonNavigator />
    </>
  );
};
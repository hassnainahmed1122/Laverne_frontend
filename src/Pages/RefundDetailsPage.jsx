import React from 'react';
import { Navigator } from '../Components/Navigator/Navigator';
import { ProductCard } from '../Components/ProductCard/ProductCard';
import { ButtonNavigator } from '../Components/ButtonNavigator/ButtonNavigator';
import { useAuth } from '../Context/AuthContext';

export const RefundDetailsPage = (props) => {
  const { orderData } = useAuth();
  const { OrderItems } = orderData;
  return (
    <>
      <Navigator />
      {OrderItems && OrderItems.map(item => (
        <ProductCard key={item.id} item={item}/>
      ))}
      <ButtonNavigator />
    </>
  );
};
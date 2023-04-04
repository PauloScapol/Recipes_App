import React from 'react';
import { useParams } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';

export default function Recipes() {
  const { type } = useParams();

  return (
    <div>
      {type === 'meals' ? <Meals /> : <Drinks />}
    </div>
  );
}

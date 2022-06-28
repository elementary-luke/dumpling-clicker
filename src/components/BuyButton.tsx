import React , { useState, useEffect } from 'react';

interface ShopProps {
  price: number;
  outputRate: number;	
  name: string;
	count: number;
	create_function: Function;
	update_function: Function;
	dumplings : number
}

interface helpersObjTypes {
	child: number;
}


export default function BuyButton(props: ShopProps) {
	let [count, updateCount] = useState(props.count);
	let [price, updatePrice] = useState(props.price);

	props.create_function(props.name, props.outputRate);
	 
	function buy() {
		if (props.dumplings >= price) {
			props.update_function(price, props.name);
			updateCount(count + 1);
			updatePrice(Math.round(price * 1.3));
		}
			
			
	}

	return (
		<>
			<p>{count}x {props.name} </p>
      <button onClick={() => buy()}>{price}</button>
		</>
	);
}




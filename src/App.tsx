import React , { useState, useEffect } from 'react';
import './styles/App.css';
import BuyButton from './components/BuyButton'
import { getValue } from '@testing-library/user-event/dist/utils';



function App() {
  let [counter, updateCounter] = useState(0);
  let [helpers, updateHelpers] = useState({"dopa": {outputRate: 0, owned: 0}});
  let [helperCost, updateHelperCost] = useState(10);
  let [dps, updateDps] = useState(0);
  // function buyHelper() {
  //   if (counter >= helperCost) {
  //     updateCounter(counter - helperCost);
  //     updateHelpers(helpers + 1);
  //     updateHelperCost(Math.round(helperCost * 1.3));
  //   }
  // }

  function addHelperType(name: string, outputRate: number) {
    if (!helpers.hasOwnProperty(name)) {
      helpers[name as keyof typeof helpers] = {outputRate: outputRate, owned: 0};
    }
    updateHelpers(helpers);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let to_add = 0;
      for (const [k, v] of Object.entries(helpers)){
        if (k != "dopa") {
          to_add += v.owned * v.outputRate;
        }
      }
      updateCounter(prevCounter => prevCounter + to_add);
    }, 1000); 

    return () => clearInterval(interval);
  }, [helpers]);

  function buyHelper(price: number, type: string) { 
    let newObj = {"dopa": {outputRate: 0, owned: 0}};
    for (let key in helpers) {
      let value = helpers[key as keyof typeof helpers];
      if (key == type) {
        newObj[key as keyof typeof newObj] = {outputRate: value.outputRate, owned:value.owned += 1};
      } else 
      newObj[key as keyof typeof newObj] = value;
    }

    updateHelpers({...newObj});
    updateCounter(counter - price);
    
    let dumples = 0;
    for (const [k, v] of Object.entries(helpers)){
      if (k != "dopa") {
        dumples += v.owned * v.outputRate;
      }
    }
    updateDps(dumples);
    
  }

  return (
    <>
      <div className = "dumpling">
        <img 
          src={require("./images/dumpling.png")} 
          alt="no image here" 
          draggable="false" 
          className="dumpling-image" 
          onClick= {() => updateCounter(counter + 1)}
        />
        <p className = "text">
        dumplings: {counter}
        </p>
        <p className = "smalltext">
        dumplings per second: {dps}
        </p>
        
        {/* <p className = "text">
        helpers: {helpers}
        </p> */}

        {/* <button 
          className = "text"
          onClick = {buyHelper}>{helperCost}
        </button> */}
        <BuyButton 
          name="child"
          price={10} 
          outputRate={1}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="uni student"
          price={100} 
          outputRate={5}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />
      
        <BuyButton 
          name="apprentice chef"
          price={500} 
          outputRate={20}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="asian mother"
          price={2000} 
          outputRate={100}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="chinatown chef"
          price={10000} 
          outputRate={500}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="grandmother."
          price={100000} 
          outputRate={10000}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="sensei wu"
          price={1000000} 
          outputRate={50000}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="dumplings incorporated"
          price={5000000} 
          outputRate={500000}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="mao ze dumpling"
          price={10000000} 
          outputRate={1000000}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />

        <BuyButton 
          name="anti-dumpling condenser"
          price={100000000} 
          outputRate={50000000}
          count={0}
          create_function={addHelperType}
          update_function={buyHelper}
          dumplings={counter}
        />
        <p className="gap">
        </p>
      </div>
    </>
  );
}

export default App;

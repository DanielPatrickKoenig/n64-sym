import { useState } from 'react';
import './App.css';
import ParticleChart from './components/ParticleChart/ParticleChart';

function App() {
  const [appData, setAppData] = useState([]);

  const loadData = async () => {
    try{
      const response = await fetch('https://danielpatrickkoenig.github.io/shared-app-resources/n64_data_with_configs_6.json');
      const json = await response.json();
      console.log(json);
      setAppData(json);
    }
    catch(e){
      console.error(e);
    }
  };
  if (!appData.length && !appData?.dataset?.length) {
    loadData();
  }

  return (
    <div className="App">
      {(appData?.dataset?.length || appData?.length) > 0 && (
        <ParticleChart
          data={appData}
        />
      )}
    </div>
  );
}

export default App;

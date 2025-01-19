import { useState } from 'react';
import './App.css';
import Sym from './components/Sym/Sym';
import PointTest from './components/PointTest/PointTest';

function App() {
  const [appData, setAppData] = useState([]);

  const loadData = async () => {
    try{
      const response = await fetch('https://danielpatrickkoenig.github.io/shared-app-resources/n64_data.json');
      const json = await response.json();
      console.log(json);
      setAppData(json);
    }
    catch(e){
      console.error(e);
    }
  };
  if (!appData.length) {
    loadData();
  }

  return (
    <div className="App">
      {appData.length > 0 && <Sym data={appData} />}
      <PointTest />
    </div>
  );
}

export default App;

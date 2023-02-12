import React, { useEffect, useState } from 'react';

import * as tf from '@tensorflow/tfjs';

async function loadModel() {
   const model = await tf.loadLayersModel('./model/model.json');
  console.log('Model loaded.');
  return model;
}


async function runPrediction(model) {
  const inputData = tf.tensor2d([[1, 2, 3, 4]], [1, 4]);
  const output = model.predict(inputData);
  console.log(output.dataSync());
}


const App = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const m = await loadModel();
      setModel(m);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (model) {
      runPrediction(model);
    }
  }, [model]);

  return (
    <div>
      <h1>TensorFlow.js Example</h1>
    </div>
  );
};

export default App;

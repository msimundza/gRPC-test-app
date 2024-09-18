import { useState } from 'react';
import { GreeterClient } from './generated/helloworld.client';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const transport = new GrpcWebFetchTransport({
  baseUrl: 'http://localhost:8080', // Envoy runs on port 8080
  });

  const client = new GreeterClient(transport);

  const sayHello = async () => {
    try {
      const { response } = await client.sayHello({ name });
      setMessage(response.message);
    } catch (error) {
      console.error('Error calling sayHello:', error);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>gRPC-Web React Example</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={sayHello}>Say Hello</button>
      <p>{message}</p>
    </div>
  );
}

export default App;

import { Server, ServerCredentials } from '@grpc/grpc-js'
import { greeterDefinition } from './generated/helloworld.grpc-server'
import { HelloReply, HelloRequest } from './generated/helloworld'
import * as grpc from '@grpc/grpc-js'

const server = new Server()

server.addService(greeterDefinition, {
  async sayHello(
    call: grpc.ServerUnaryCall<HelloRequest, HelloReply>,
    callback: grpc.sendUnaryData<HelloReply>
  ) {
    const reply: HelloReply = { message: `Hello, ${call.request.name}!` }
    callback(null, reply)
  },
})

const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err) => {
  if (err) {
    console.error(`Server binding error: ${err.message}`);
    return;
  }
  server.start();
  console.log(`Server is running on port ${port}`);
});

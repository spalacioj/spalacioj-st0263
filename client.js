const dotenv = require('dotenv');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

dotenv.config();

const PROTO_PATH = process.env.PROTO_PATH;
const REMOTE_HOST = process.env.REMOTE_HOST;

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

console.info("Consumer service is started...");

const productService = grpc.loadPackageDefinition(packageDefinition).FileService;

function main(){
    let archivo = "hola.mp4";
    const client = new productService(REMOTE_HOST, grpc.credentials.createInsecure());

    client.AddFile({archivo: archivo}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            console.log('Response received from remote service:', data);
        }
    })

    client.AddFile({archivo: 'loki.mp4'}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            console.log('Response received from remote service:', data);
        }
    })

    client.GetFiles({}, (err, data) => {
        if(err){
            console.log(err);
          } else {
            console.log('Response received from remote service:', data.archivos); // API response
          }
    })
}

main();


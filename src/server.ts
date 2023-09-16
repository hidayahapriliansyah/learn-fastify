import app from './app';

const PORT = 3032;
app.listen({ port: PORT }, (err, address) => {
  if (err){
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

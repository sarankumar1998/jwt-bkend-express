const app = require('./app');

// app.listen(5000,()=>{
//     console.log('local host success');
// })

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
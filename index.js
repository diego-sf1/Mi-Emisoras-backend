const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`Server running on Port: ${app.get('port')}`);
});
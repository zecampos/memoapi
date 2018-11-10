const mysql      = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000
const router = express.Router();

function createTable(conn){
      const sql = "CREATE TABLE IF NOT EXISTS leads (\n"+
                  "ID int NOT NULL AUTO_INCREMENT,\n"+
                  "Nome varchar(100) NOT NULL,\n"+
                  "email varchar(50) NOT NULL,\n"+
                  "telefone varchar(45) NOT NULL,\n"+
                  "PRIMARY KEY (ID)\n"+
                  ");";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela!');
      });
}

function execSQLQuery(sqlQry, res){
 const connection = mysql.createConnection({
  host     : 'clientesmemo.mysql.dbaas.com.br',
  port     : 3306,
  user     : 'clientesmemo',
  password : 'Memo@2018',
  database : 'clientesmemo'
});
connection.query(sqlQry, function(error, results, fields){
    if(error) 
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('executou!');
});

}

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM leads', res);
})

router.post('/clientes', (req, res) =>{
    const nome = req.body.nome
    const email = req.body.cpf
    const telefone = req.body.telefone
    //console.log(req.body)
    execSQLQuery(`INSERT INTO leads(Nome, email, telefone) VALUES('${nome}','${email}', '${telefone}')`, res);
});


app.use('/', router);
app.listen(port);
console.log('API funcionando!');


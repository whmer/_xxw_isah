const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('isah')); 

app.post('/save-data', (req, res) => {
    const { username, password } = req.body;
    const data = { username, password };

    fs.writeFileSync('userData.json', JSON.stringify(data, null, 2));
    res.send('Dados salvos com sucesso!');
});
app.get('/get-data', (req, res) => {
    fs.readFile('userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao ler os dados do usuário');
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

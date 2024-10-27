const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('isah'));

app.post('/save-data', (req, res) => {
    const { username, password, city, ip } = req.body;

    // Lê o conteúdo existente do arquivo
    let data = {};
    if (fs.existsSync('userData.json')) {
        const rawData = fs.readFileSync('userData.json', 'utf8');
        data = JSON.parse(rawData);
    }

    // Adiciona ou substitui o conteúdo
    data[username] = { username, password, city, ip };

    // Salva o conteúdo atualizado no arquivo
    fs.writeFileSync('userData.json', JSON.stringify(data, null, 2));
    res.send('Dados salvos com sucesso!');
});

app.get('/get-data', (req, res) => {
    fs.readFile('userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao ler os dados do usuário');
        }
        res.json(JSON.parse(data)); // Envia o JSON com os dados do usuário
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

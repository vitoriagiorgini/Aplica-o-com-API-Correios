const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    
    if (!/^\d{5}-\d{3}$/.test(cep)) {
        return res.status(400).json({ error: 'CEP inválido. O formato correto é XXXXX-XXX.' });
    }

    try {
       
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        
        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado.' });
        }

        
        const { logradouro, bairro, localidade, uf } = response.data;
        res.json({
            endereco: logradouro,
            bairro: bairro,
            cidade: localidade,
            estado: uf
        });
    } catch (error) {
        
        res.status(500).json({ error: 'Erro ao consultar o CEP.' });
    }
});


app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});

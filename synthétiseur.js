const express = require('express');
const app = express();
const request = require('request');

app.get('/', (req, res) => {
    const article_text = req.query.article_text;
    const style = req.query.style;

  
    if (article_text) {
        const options = {
            url: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.token}`
            },
            json: {
                prompt: `Pourrais-tu synthétiser ce texte, de manière ${style} : ${article_text} `   ,
                max_tokens: 1000,
                temperature: 0.3
            }
        };

        request(options, (err, response, body) => {
            if (err) {
                return res.send('Error generating response');
            }

            const response_text = body.choices[0].text;
            res.send(response_text);
        });
    } else {
        res.send(`
            <form action="/" method="get">
                <label>Résumé du mail que je dois rédiger</label>
                <br>
                <textarea name="article_text"></textarea>
                <br><br>
                <label>Longueur</label>
                <br>
                <input type="radio" name="style" value="Courte et direct">Rapide</input>
                <input type="radio" name="style" value="Concis">Moyen</input>
                <input type="radio" name="style" value="Détaillé">Long</input>
                <br><br>
                <input type="submit" value="Synthétiser le texte" />
            </form>
        `);
    }
});

app.listen(3000, () => console.log('Listening on port 3000'));


import express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { weather: null, error: null });
});

app.post("/", async (req, res) => {
    try {
        const city=req.body.city;
        const apiKey="51016097785a9d6b688fd83874463ed2";
        const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await axios.get(apiURL);
        const weatherData=response.data;
        const weather={
            city:weatherData.name,
            temperature: Math.round(weatherData.main.temp),
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon
        };
        res.render('index', { weather: weather, error: null });
    } catch (error) {
        console.error(error);
        res.render('index', { weather: null, error: 'Error fetching weather data. Please try again.' });
    }
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
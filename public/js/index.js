const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const content_para = document.querySelector('#content-para')
const error_para = document.querySelector('#error-para')

weather_form.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value

    error_para.textContent = 'Loading...';
    content_para.style.display = "none";

    fetch(`/weather?address=${location}`).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                error_para.textContent = data.error;
                content_para.style.display = "none";
            } else {
                error_para.textContent = '';
                content_para.style.display = "inline";
                document.querySelector('span#location').textContent = data.location;
                document.querySelector('span#weather').textContent = data.weather_description;
                document.querySelector('span#temp').textContent = data.current_temperature;
                document.querySelector('span#feelslike').textContent = data.feelsLike;
                document.querySelector('span#precipitation').textContent = data.precipitation;
            }
        })
    })

})




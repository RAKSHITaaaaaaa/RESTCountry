var center = document.querySelector(".center")
var second = document.querySelector(".second")

function generate(key, value) {
    let itemDiv = document.createElement("div")
    itemDiv.classList.add("item")

    let keyDiv = document.createElement("div")
    keyDiv.classList.add("key")
    keyDiv.innerHTML = key

    let valueDiv = document.createElement("div")
    valueDiv.classList.add("value")
    if (key === "Flags") {
        let img = document.createElement("img")
        img.src = value
        valueDiv.appendChild(img)
    }
    else if (key === "GoogleMap") {
        let a = document.createElement("a")
        a.href = value
        a.target = "_blank"
        a.innerHTML = "click here to open Google Map"
        valueDiv.appendChild(a)
    }
    else
        valueDiv.innerHTML = value

    itemDiv.appendChild(keyDiv)
    itemDiv.appendChild(valueDiv)
    second.appendChild(itemDiv)
}


async function getAPIData() {
    let input = document.getElementById("country")   //for keeping bharat data by default
    let country = "bharat"

    if (input.value !== "")
        country = input.value

    try {
        let response = await fetch("https://restcountries.com/v3.1/name/" + country)
        let data = await response.json()

        center.removeChild(second);
        second = document.createElement("div");
        second.classList.add("second");
        center.appendChild(second);

        data.forEach(country => {
            generate("Name", country.name.official)
            generate("Capital", country.capital)
            generate("Flags", country.flags.png)
            generate("Population", country.population)
            generate("Area", country.area)
            generate("Region", country.region)
            generate("Subregion", country.subregion)
            generate("Continents", country.continents)
            generate("Landlocked", country.landlocked)
            generate("Independent", country.independent)
            generate("UnMember", country.unMember)
            generate("Borders", country.borders)
            generate("Timezones", country.timezones)
            generate("GoogleMap", country.maps.googleMaps)
            generate("Languages", Object.values(country.languages))
            generate("Currencies", Object.values(Object.values(country.currencies)[0]))

            let div = document.createElement("div")
            div.style.height = "20px"
            second.appendChild(div)
        });
    } catch (error) {
        alert("Invaild Country Name")
    }
}

getAPIData()
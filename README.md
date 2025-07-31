# Weather Forecast Project

This project is a web application built with React and TypeScript that displays a 7-day weather forecast for a specified address, utilizing public weather and geocoding REST APIs.



## Features

* **Location-Based Forecast:** Get a 7-day weather forecast for any address you specify.
* **API Integration:** Connects to public geocoding APIs to convert addresses into coordinates and weather APIs to fetch forecast data.
* **Interactive UI:** Presents weather information on a user-friendly HTML page.



## Geocoding API

This project uses the [Nominatim OpenStreetMap API](https://nominatim.openstreetmap.org/) for geocoding. Please be aware of their [Usage Policy](https://operations.osmfoundation.org/policies/nominatim/), which outlines rules to prevent abuse and potential banning of users if not followed.

**Unacceptable Use (from Nominatim Usage Policy):**
* **Auto-complete search:** This is not yet supported by Nominatim, and you must not implement such a service on the client side using the API.
* **Systematic queries:** This includes reverse queries in a grid, searching for complete lists of postcodes, towns, etc., and downloading all POIs in an area. If you need complete sets of data, get it from the [OSM planet](https://planet.openstreetmap.org/) or an extract.
* **Scraping of details:** The details page is there for debugging only and may not be downloaded automatically.



## Installation

To get a copy of the project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    git clone [https://github.com/mauricioakito/forecast-project.git](https://github.com/mauricioakito/forecast-project.git)
    
2.  **Navigate to the project directory:**
    cd forecast-project
    
3.  **Install dependencies:**
    yarn
    


## Usage

After installation, you can run the development server:

yarn dev


## Technologies Used

**React**
**TypeScript**
**Public Weather API** -> https://api.open-meteo.com
**Public Geocoding API** -> https://nominatim.openstreetmap.org
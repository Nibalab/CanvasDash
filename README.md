# CanvasDash

<br><br>

# project philosophy


> The philosophy behind CanvasDash is to create a highly interactive and user-friendly platform that enhances productivity by enabling users to customize their workspace according to their needs. With a focus on flexibility, usability, and real-time data visualization, CanvasDash empowers users to control how they view and interact with data, making it an excellent tool for both personal use and business purposes.


### User Stories

## User
 
- As a user, I want to create a custom dashboard with various widgets, so I can view relevant data in one place.
- As a user, I want to be able to drag and drop widgets on my dashboard, so I can customize the layout.
- As a user, I want to customize each widget’s content and appearance, so I can tailor it to my needs.
- As a user, I want to store my dashboard configuration, so I can return to my customized layout later.

<br><br>

# Tech stack 


### MedVision is built using the following technologies:

- Frontend: Laravel Blade, JavaScript (with Livewire and third-party JS libraries such as Leaflet and Chart.js)
- Backend: Laravel 11, APIs for various widgets
- Real-Time Data: Public APIs (e.g., Weather API, GitHub API, COVID-19 API, Stock Market API)
- Charting Library: Chart.js for rendering visual data

<br><br>

# How to run 

> To set up CanvasDash locally, follow these steps:

### Prerequisites

Ensure you have the following installed before setting up MedVision:
* **npm** (Node.js package manager)
  ```sh
  npm install npm@latest -g
   ```
* **Composer** (for Laravel dependencies)
  ```sh
  composer install  
   ``` 
* **MySQL** (or any other database you plan to use)

### Installation

> Follow these steps to install and set up MedVision locally:

1. Clone the repo
   git clone [github](https://github.com/Nibalab/MedVision.git)

2. Install NPM packages
   ```sh
   npm install
   ```
3. Install PHP dependencies (for the Laravel backend)  
    ```sh
   composer install
   ``` 
4. Set up environment variables:
  * Copy .env.example to .env for both the frontend and backend and fill in your details (API keys, database credentials, etc.).

5. Generate the application key for Laravel 
     ```sh
   php artisan key:generate
   ```  
6. Run migrations to set up the database 
    ```sh
   php artisan migrate
   ```   
7. Run the backend
   ```sh
    php artisan serve
    npm run dev
   ``` 

  
Now, you should be able to run CanvasDash locally and explore its features.         

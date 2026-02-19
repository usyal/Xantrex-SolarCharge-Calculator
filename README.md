# Solar Charge Controller Calculator

### Abstract

The Solar Charge Controller Calculator application is a safety-critical & simulation system that aims to compute the total power, final open circuit voltage, and max charge current of a solar panel array specification by receiving the maximum power, open circuit voltage, and short circuit voltage of a single solar panel. This application will be designed for Xantrex, which is a company focusing on manufacturing and marketing power products that are used when on the move to provide auxiliary or emergency power. The application will focus on employee login/logout/signup, handling computations for a variety of solar array configurations, displaying appropriate diagrams based on the configuration, and suggesting a solar charger based on the specifications if an appropriate API can be found. Currently, Xantrex engineers often have to rely on manual calculations or third-party tools that are not designed for Xantrex products. This can reduce efficiency and increase the risk of configuration errors.

### Project Scope & Employer Specifications

This project is designed for practical use as it is an engineering tool used in solar system design that helps size photovoltaic module arrays to ensure they are compatible with a specific charge controller’s electrical limits and performance constraints. Ensuring this project maintains accuracy in the computations, it can aid potential solar system designs and projects with precise calculations. Furthermore, ensuring that the application is easily accessible and easy to use (where a new user can understand the system within a few minutes), it will be advantageous for Xantrex as their engineers will be able to rely on our system and learn it in a short period of time. 

Since Xantrex does not want to restrict its engineers and employees to logging in , the specific login/logout/signup feature will be an optional configuration and the application can be used without having to make an account. The login/signup sessions will be fully implemented into a separate file. Moreover, examples provided by Xantrex of a similar system highlighted the need for simplicity in our application. Specifically, the examples were not reasonable with the layouts and had excessive text present on the application, which made it difficult to understand how to navigate the system. 

The application has a main feature which is the solar charge controller calculator that should provide final outputs with correct formulas, with many subproblems that are described below as epics.

The epics of the project as discussed with the company are:

Users can login and create an account on the application
If a user is logged in, they should be able to log out of their session (Depending on time constraints, an option to delete an account could be implemented as well)
Users can use the calculator and specify calculations and receive correct outputs
Users should be able to see a suggested solar charger based on the calculations (If a free API can be found for such a specific task. Otherwise we will implement recent news headlines relating to solar chargers and solar engineering)
Users should be able to easily navigate the web application with minimal experience of using such a tool. We will design a user manual for users to read and understand the application’s formulas and design.


### Initial Plan for Designing Required Features

We have laid out a plan where two team members will work with the login/logout/signup features and the other three members will work on the main page. We believe that the main page requires more work ranging from calculations to API integration, and so three members should be able to effectively work on the main page and two members should be sufficient to work on database management and design. Furthermore, splitting the features in groups allows to maintain a consistent design and layout of the application. Each team member will be responsible for at least one major feature to ensure balanced workload and accountability.

Login & signup Thymeleaf templates will be developed by Parsa and Jiahao. This includes designing the layouts, managing the postgres database for storing users, and working with url redirections. 

The main page for calculations, formulas, and suggesting a solar charge calculator or displaying news headlines related to solar engineering will be developed by Uday, Shilin, and Henry. This includes designing the layout of the main page, implementing urls for redirecting to login and signup pages, as well as integrating a web Rest API into the application.

Depending on the development of the application, the above 3-2 split may be swapped around to ensure timely completion of the project. 


### Tech Stack

The project will be developed using Java SpringBoot and Postgres SQL for the backend and HTML, Bootstrap CSS, and JavaScript for the frontend. 

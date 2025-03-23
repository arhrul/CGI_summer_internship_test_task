# CGI_summer_internship_test_task


## 1. Introduction

This application is a test assignment for the CGI internship.

The task is to create a web application for flight planning and seat recommendations. The traveler should be able to filter flights and receive seat suggestions based on preferences like window seat, more legroom, or proximity to the exit, using an interactive seat map. Occupied seats can be generated randomly.

## 2. Solution Overview

I implemented the following features: first, a list of all flights can be seen on the main screen. 
The customer can filter flights by departure, destination, date, time, duration, and price. 
The customer can also select the number of seats they wish to book. 

After selecting a flight, the customer is directed to the seat selection page. 
For each passenger (the number of passengers selected in advance), the customer can choose a seat by first clicking on the passenger and then on the seat. 
The customer can also specify their preferences in the filters: window seat, middle seat, or aisle seat; first, business, or economy class; extra, standard, or limited legroom space; as well as whether they prefer sitting closer to the exit.
After selecting preferences, the desired seats are highlighted in green.

Once the customer has selected the seats, they click the "Book" button, and their booking appears on the profile page.

There is also the possibility to register an account.

For convenience, an admin page was created where flights and their seats can be quickly added.

## 3. Setup and Installation

Instructions for running the backend and frontend are written in the respective files: `backend/README.md` and `frontend/README.md`.

After launching the application, go to the admin page first to create a flight and seats.  

To create a flight, fill in the following fields:  

- Departure: enter any city

- Destination: enter any city

- Duration: enter the flight duration in minutes

- Departure date: select the flight date

- Departure time: select the flight time

- Status: choose the ACTIVE status

- Price: enter the price in euros

After this, go to the seat management section. There will be a field for flight id. Enter the flight id and click "create seats." You can find the flight ids in the flight management section.

You can repeat this process multiple times to add more flights to the application.


## 4. Challenges and Solutions

During the task, I encountered some problems. 
For example, it was difficult to correctly configure the database and store objects in it. 
I couldn't manage to link a seat with a flight. Initially, I wanted to store them as a list, but that turned out to be inconvenient. 
To solve this problem, I decided to simplify the database structure, and in the final version, each seat has its own flight id. 
This makes it much easier to get all the seats for a flight.

Another challenge was the filters. I used CriteriaQuery, which is quite unfamiliar to me, so I couldn't implement more complex filters on my own. 
I turned to AI to learn how to solve this issue. I couldn't figure out how to filter flights when the number of people exceeds the number of available seats. 
For simple filters, I implemented them based on a previous university project of mine.

The biggest issues were on the frontend. Since I'm not very familiar with TypeScript, I don't know all of its nuances. 
To solve tasks that I couldn't handle by myself, I consulted AI. One example of this is finding all unique cities for displaying in the filters.

I also became interested in how to create a nice slider for the filters. I found information on this in the official Angular materials: https://material.angular.io/components/slider/overview

## 5. Time Spent

I worked on the project for two weeks. You can view the list of issues and commits on my GitHub.

## 6. Unimplemented

There were two tasks that I didn't complete. 
One of them is that the client cannot indicate the preference to have seats next to each other. 
I considered this unnecessary since I implemented a fairly user-friendly seat plan, and when selecting a seat, the client can see which seats are available, making it easy to choose seats next to each other.

Additionally, I didn’t fully implement the filtering of seats closer to the exit due to lack of time. 
Currently, there is a predefined list of seats that are close to the exit. 
However, it would be possible to implement logic where the client is offered the closest available seat to the exit.

## 7. Conclusion

Overall, this project was a valuable learning experience, enabling me to apply my existing skills while also acquiring new ones, which will undoubtedly be useful in future work.

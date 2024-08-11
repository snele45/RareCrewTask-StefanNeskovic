# Overview

This project is a web application built using ASP.NET Core MVC to display employee data. The data is fetched from a REST API endpoint, processed to calculate the total work hours for each employee, and then displayed in an HTML table. Additionally, a pie chart is generated to show the percentage of total work hours for each employee.

### Packages Used
    Newtonsoft.Json: For deserializing JSON data.
    System.Drawing.Common: For generating the pie chart.

#   Functionality Description
### 1. Creating Models
Employee: Model containing the employee's name and total work hours.
TimeEntry: Model representing an individual time entry record for an employee.
### 2. Creating the Controller
EmployeeController: Controller that handles data fetching, processing, and generating the HTML table and pie chart.
### 3. Data Fetching
Employee time entries are fetched from the provided API endpoint using HttpClient.
JSON data is deserialized using Newtonsoft.Json.
### 4. Data Processing
The CalculateTotalHours method calculates the total work hours for each employee based on the fetched data.
A list of employees with their total work hours is created.
### 5. Generating the HTML Table
The GenerateHtmlTable method generates an HTML table displaying the employee's name and total work hours.
Table rows are highlighted in yellow if the employee worked less than 100 hours.
### 6. Generating the Pie Chart
The GeneratePieChart method generates a pie chart showing the percentage of total work hours for each employee.
Each segment of the pie chart is colored randomly, and labels display the employee's name and percentage of total work hours.
### 7. Creating the Static HTML Page
The static HTML page index.html located in the wwwroot folder contains a div element where the employee data table is displayed.
The fetch API is used to retrieve and display data on the page.
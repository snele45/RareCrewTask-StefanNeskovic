# Employee Management Dashboard

This project is an Angular application that displays employee work hours in a table and on a pie chart. The project consists of two main components: `EmployeeTableComponent` and `PieChartComponent`, which display the data in tabular and graphical formats, respectively.

## Project Setup

This project was generated with Angular CLI. The steps to set up the project and the necessary components are described below.

### Step 1: Create a New Angular Project

First, I created a new Angular project using the Angular CLI. Use the `--no-standalone` flag to ensure the project has an `app.module.ts` file.

```bash
ng new employee-tracking --no-standalone
cd employee-tracking
```

### Step 2: Generate Components

```bash
ng generate component components/employee-table
ng generate component components/pie-chart
```

### Step 4: Create the Employee Model

This model defines the data structure with fields for the employee's name and total work hours.

### Step 5: Create the Employee Service
The service uses axios to fetch data from an API and uses BehaviorSubject to emit updated data to the components.

### Step 6: Implement the Employee Table Component
The EmployeeTableComponent displays a list of employees and their total work hours in a table format. The component uses EmployeeService to fetch and display the data.

### Step 7: Implement the Pie Chart Component
The PieChartComponent displays the distribution of employee work hours on a pie chart using Chart.js. The component also uses EmployeeService to fetch data and generate the chart.

```bash
npm install chart.js
```

### Step 8: Style the Components
Both components are styled using Bootstrap and additional custom styles. The styles are set to display the components in consistently styled cards.


### Step 9: Run the Project
To run the project, use the Angular CLI's ng serve command. This will compile the project and start a development server. You can then view the application in your web browser.

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200` to see the application running.



# KeebCraft

### Live Link below:
- https://keebcraft-capstone.onrender.com


### What is KeebCraft?
Keebcraft is a fullstack application that utilizes user-created components stored in the database to create custom mechanical keyboards that are then showcased to other users. 

### Why KeebCraft?
As a passionate mechanical keyboard enthusiast, I sought to create an app that allows users to visualize and combine different arrays of components that they could share
to the rest of the mechanical keyboard community.

### Table Of Contents:
- [API Documentation](https://github.com/glmenta/KeebCraft/wiki/API-Docs)
- [Database Schema](https://github.com/glmenta/KeebCraft/wiki/DB-SCHEMA)
- [MVP List](https://github.com/glmenta/KeebCraft/wiki/MVP-LIST)
- [User Stories](https://github.com/glmenta/KeebCraft/wiki/User-Stories)
- [Wireframe](https://github.com/glmenta/KeebCraft/wiki/Wireframe)

### Technologies Utilized:
| Technology      | Description                       |
|:---------------:|:---------------------------------:|
| HTML            | HyperText Markup Language         |
| CSS             | Cascading Style Sheets            |
| Python          | Programming Language              |
| Flask           | Python backend framework          |
| React           | User Interface                    |
| Redux           | Managing application state        |
| PostgreSQL      | Relational Database Management    |
| SQLAlchemy      | ORM                               |
| Git             | Version Control System            |
| Render          | Deployment                        |

### Getting Started
   In order to run this app locally, there are a couple of steps to take:
   
   1. Clone the app repository on your local machine:
   ```bash
   git clone git@github.com:glmenta/KeebCraft.git
   ```
   2. Navigate to the root directory of the app and install dependencies:
   ```bash
   cd Keebcraft
   pip install -r requirements.txt
   ```
   3. Activate the virtual environment and start the backend server
   ```bash
   pipenv shell
   flask run
   ```
   5. Open another terminal and navigate to the react app to start the frontend app
   ```bash
   cd react-app
   npm start
   ```

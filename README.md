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
## Navigating Through the Site

### Creating a keyboard
   - Create a name and pick from select components using the dropdown menu.
   - Upload an image using the image url
   - Provide a brief description
   - Upload!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/5925e428-488d-4149-b963-2c44e17c8e40" alt="created-keeb" width="300" height="500">
</div>

### Update a keyboard
   - From the top-right profile button, press keebs to navigate to user keebs page
   - Press the update keeb to update a specific user keeb
   - Using the dropdown menu, modify any pre-existing components
   - Provide a new image or new description if necessary
   - Update!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/b0cf130d-0be4-48cc-8ee6-f762fc5890d3" alt="updated-keeb" width="300" height="500"
</div>

### Delete a keyboard
   - From the top-right profile button, press keebs to navigate to user keebs page
   - Press the delete keeb to delete a specific user keeb
   - A popup message will show asking if you want to delete the keeb and press yes to delete the keeb!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/cb159d43-6449-4606-a385-116a6f61362a" alt="updated-keeb" width="300" height="500"
</div>

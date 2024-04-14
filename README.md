# KeebCraft

### Live Link below:
- https://keebcraft-capstone.onrender.com

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/13f0d21b-0a56-4955-b92b-23d506408bbd" width="900" height="400"
</div>

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
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/cb159d43-6449-4606-a385-116a6f61362a" alt="updated-keeb" width="500" height="300"
</div>

### Create a part
   - Press the "Check Out Parts!" button to navigate to the parts page
   - Press the Create Part to open a popup you can fill out with information to create a new part
   - Provide details, an image url and a part type
   - Press the "Create" button to create your part!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/d0277ec9-97ea-4c8d-b1ec-8e9857592f62" width="400" height="400"
</div>

### Update a part
   - From the top-right profile button, press parts to navigate to user parts page
   - Press the "Update Part" button for a specific part
   - Provide a new image, new description, new name or new type if necessary
   - Update!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/fc448a7c-7f3b-4a94-b211-08bd2fe34da1" width="400" height="400"
</div>

### Delete a part
   - From the top-right profile button, press parts to navigate to user parts page
   - Press the delete part to delete a specific user part
   - A popup message will show asking if you want to delete the part and press yes to delete the part!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/cb159d43-6449-4606-a385-116a6f61362a" alt="updated-keeb" width="500" height="300"
</div>

### Create a Favorites List
   - From the top-right profile button, press favorites to navigate to user favorites page
   - Press the "Create a Favorites List" button 
   - Provide a name and select a keeb to start off your favorites list
   - Create your Favorite!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/614c4bb1-f44b-424d-b173-f4e9cbd6e296" width="400" height="400"
</div>

### Add a keeb to Favorites
   - From the user favorites page, press the "Add Build" button for a specific Favorite List
   - Select a keeb from the dropdown
   - Add the keeb to your Favorites List!

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/04cb283e-342f-42b9-9ccd-8ea1144f0dec" width="400" height="400"
</div>

### Remove a Keeb to Favorites
   - From the user favorites page, press the "Remove Build" button for a specific Favorite List
   - Select a keeb you want to remove and press the delete button
   - Delete that keeb from your Favorites List!

### Delete a Favorites List
   - From the user favorites page, press the "Delete Favorite" button for a specific Favorite List
   - A popup will show asking if yhou want to delete the list
   - Press Yes to delete the Favorites List

<div>
   <img src="https://github.com/glmenta/KeebCraft/assets/111015201/ce848700-a27e-460b-87d2-c391ed4863dc" width="400" height="400"
</div>


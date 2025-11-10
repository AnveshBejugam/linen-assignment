# linen-assignment

# Employee Management Assignment (Angular + Kendo UI)

## Features
- Employee list displayed in a **Kendo Grid** with the following columns:
  - User Name, Email, Joining Date, Mobile, Gender, Languages Known
  - Edit button to open popup with form for editing.
- **Search Employee**: Input box with 300ms debounce to filter results.
- **Add New User**: Button opens a popup with form to create new employee.
- **Edit Employee**: Button opens the same popup with form prefilled with employee data.
- **Reactive Forms**: Used for validation of all fields (required, email format, mobile pattern).

## Tech Stack
- Angular
- Kendo UI for Angular
- RxJS (for debounce search)
- Reactive Forms

## Assignment Scope
This project demonstrates:
- Usage of **Kendo Grid** for displaying employee data.
- **Reactive Forms** for creating & editing employees.
- **RxJS debounce** for optimized search.
- Code structured with **Components** and **Service** layer.

## Starting Application

**Important: This project requires Node.js 12.22.12**

### Using nvm (Node Version Manager)
```bash
# Switch to the correct Node version (reads from .nvmrc)
nvm use

# Start the development server
npm start
```

The app will run on `http://localhost:4200`

## Branching
Create a new branch from the main branch for development, push your changes to this new branch, 
and then create a pull request (PR) to merge the changes into the main branch.

## versions
**Angular**: 9
**node**: ^10.13.0 || ^12.11.1(compatible with angular 9)
If you're using different versions, please proceed with any angular version(>8) that you're comfortable with for the assignment.
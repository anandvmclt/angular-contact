
# MEAN STACK Contact Form

* Create a project directory and initialize npm:

mkdir contact-form-backend
cd contact-form-backend
npm init -y

* Install dependencies:

npm install express mongoose cors body-parser

# Create Node.js server and connect to Mongo DB
- Create Schema and API Logics.

-End points: http://localhost:4000/api/contact

# Create Frontend App using Angular 17
 - ng new my-app --no-standalone
- ng new contact-form-frontend
- cd contact-form-frontend
- ng add bootstrap@5

"""
In Angular 17, the default project structure has changed, and the app.module.ts file is no longer automatically generated. However, you can still create a module-based app if needed : ng new my-app --no-standalone
"""

# The file structure
contact-form-frontend/
  app/
    components/
      contact-form/
        contact-form.component.html
        contact-form.component.ts
        contact-form.component.css
      message-list/
        message-list.component.html
        message-list.component.ts
        message-list.component.css
    services/
      contact.service.ts
    contact-form.module.ts
    app-routing.module.ts
    app.component.html
    app.component.ts
    app.component.css
  assets/


# Code Practices
* Create Manual Directories:

cd contact-form-frontend/app
mkdir components/contact-form message-list
mkdir services # If not already created

* Generate Components with Angular CLI:
ng generate component contact-form/contact-form
ng generate component message-list/message-list

# Component Structure
components/
  contact-form/
    contact-form.component.css
    contact-form.component.html
    contact-form.component.spec.ts
    contact-form.component.ts
  message-list/
    message-list.component.css
    message-list.component.html
    message-list.component.spec.ts
    message-list.component.ts

# Add Contact-form-components.ts and HTML files.
- check for form validation and working.

# Add API service to contact form component
* Create an API Service component
cd src/app/services
ng generate service contact

* Using the Service in ContactFormComponent:
 - Import the ContactService into your contact-form.component.ts:


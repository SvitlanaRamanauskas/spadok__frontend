# Nash_spadok React+TypeScript project

This is an e-commerce application for an online embroyderies store for an entrepreneur with the frontend part implemented.

* [DEMO](https://svitlanaramanauskas.github.io/spadok__frontend)

## Overview
The project is built using the following technologies:
- **React**: Core library for building the user interface.
- **TypeScript**: Provides static type checking for JavaScript code.
- **SCSS**: Preprocessor for writing CSS with additional features.
- **BEM**: A clear naming convention for CSS classes, making the codebase more consistent.
- **Redux**: A state management library used in this project to ensure consistent actions and state handling, particularly for the Cart component.

## Features
- **Responsive Design**: Optimized for different screen sizes and devices, responses on width 320px, 640px, 1200px.
- **Navigation** `react-router-dom` library is used in the application to enable navigation between multiple pages, and URL-based search parameters saved when navigating.
- **Favorites & Cart**: adding products to favorites or shopping cart, with total price calculation.
- **Product Filtering**: Filter products by capacity and color inside product card.
- **Sorting**: Sort products based on criterias: to higher price, to lower price, alphabeticaly.
- **Search**: Filter products using query parameters.
- **Sticky Header**: Keeps the header visible while you scroll.
- **Scroll to Top Button**: Easily return to the top of the page.
- **Loader**: Indicates loading status for a better user experience.

# Running the Project Locally

To run this project locally, follow these steps:

- Clone the Repository:

```
git clone https://github.com/SvitlanaRamanauskas/spadok__frontend.git
cd spadok__frontend
```

- Install Dependencies:

Install dependences using npm (Node Package Manager). Ensure you have Node.js installed on your machine. This project uses Node v14.

```npm install react-router-dom```

- Run the Project:

Start the development server with live reloading:

```npm start```

Alternatively, you can use any other local server setup you prefer, such as Live Server for VS Code.

- Open the Project in Your Browser:

Visit http://localhost:5000 or the port your server specifies to see the landing page in action.

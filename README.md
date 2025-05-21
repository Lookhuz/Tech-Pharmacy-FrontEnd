# Tech Pharmacy

Tech Pharmacy is a comprehensive, modern, and secure web application template designed to streamline the development and management of pharmacy-related projects. Built with Vue.js, Vuetify, and Pinia, this project provides a robust foundation for developing scalable and maintainable applications.

## Table of Contents

- [Tech Pharmacy](#tech-pharmacy)
    - [Table of Contents](#table-of-contents)
    - [Features](#features)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Project Structure](#project-structure)
    - [Development](#development)
    - [Testing](#testing)
    - [Deployment](#deployment)
    - [Usage](#usage)
    - [Contributing](#contributing)
    - [License](#license)
    - [Acknowledgements](#acknowledgements)

## Features

- **Responsive UI:** Built with Vuetify for a modern, responsive design.
- **State Management:** Uses Pinia for a robust state management architecture.
- **Internationalization (i18n):** Supports multiple languages.
- **Authentication:** Secure user authentication and registration.
- **Dynamic Routing:** Intuitive navigation with Vue Router.
- **Modular Architecture:** Scalable code structure for large projects.
- **Customizable:** Easily adapt and extend with your own components and styles.

## Requirements

Before you begin, ensure you have met the following requirements:

- **Node.js** (>= 12.x) and npm installed on your machine.
- **Vue CLI** installed globally:
    ```sh
    npm install -g @vue/cli
    ```
- A modern web browser such as Chrome or Firefox.
- Basic knowledge of Vue.js, JavaScript, and CSS.

## Installation

1. Clone the Repository:
     ```sh
     git clone https://github.com/your-username/tech-pharmacy.git
     cd tech-pharmacy
     ```

2. Install Dependencies:
     ```sh
     npm install
     ```

## Project Structure

Below is an overview of the project structure:

```
tech-pharmacy/
├── public/                   # Public assets directory
├── src/
│   ├── assets/               # Application assets (images, fonts, etc.)
│   ├── components/           # Vue components
│   ├── i18n/                 # Internationalization files
│   ├── router/               # Application routes
│   ├── store/                # State management (Pinia stores)
│   ├── views/                # View components (pages)
│   ├── utils/                # Utility functions
│   ├── App.vue               # Main Vue component
│   └── main.js               # Entry point of the application
├── tests/                    # Unit and end-to-end tests
├── README.md                 # Project documentation
└── package.json              # NPM package configuration
```

## Development

### Serve Locally

To run the application locally:

```sh
npm run serve
```

This starts a development server typically accessible at `http://localhost:8081`.

## Usage

- **Navigation:** The project supports easy navigation through a centralized toolbar. Links are available to `HomeView.vue`, `ActiveMedicationsView.vue`, and other feature-specific views.
- **State Management:** Data such as medications and user info are managed using Pinia stores, providing a single source of truth.
- **Internationalization:** Change language configurations using the i18n module in the `src/i18n` folder.
- **Customization:** Easily modify themes and layouts thanks to Vuetify's flexible design system.

## Contributing

Contributions are welcome! If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a feature branch:
     ```sh
     git checkout -b feature/YourFeature
     ```
3. Commit your changes:
     ```sh
     git commit -am 'Add some feature'
     ```
4. Push the branch:
     ```sh
     git push origin feature/YourFeature
     ```
5. Open a pull request on GitHub.

Please ensure that your code follows our style guides and that you have updated tests as appropriate.
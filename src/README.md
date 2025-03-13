# Foundry Pathfinder Server Control

## Description

This directory contains the source code for the Foundry Pathfinder Server Control web application. The application allows users to manage their virtual machines (VMs) on Azure, providing a user-friendly interface to start and stop VMs, view their status, and manage them efficiently.

## Files

- **index.html**: The main HTML file for the web application. It includes the structure of the web page and references to the CSS and JavaScript files.
- **styles.css**: The CSS file that defines the styles for the web application, including layout, colors, and fonts.
- **script.js**: The JavaScript file that contains the logic for interacting with the Azure API to start and stop VMs, as well as updating the VM list on the web page.

## How It Works

1. **VM List**: The app displays a list of VMs with their names, locations, and power states.
2. **Start/Stop VMs**: Users can start or stop VMs by clicking the respective buttons in the control column.
3. **Automatic Updates**: The VM list is automatically updated every 60 seconds to reflect the current status of the VMs.

## Installation

To run the app locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/acmetntco/control-docs.git
   cd control-docs/src
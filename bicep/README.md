---
title: ServControl Infrastructure
slug: MineServ/infra.aspx
draft: false
layout: Home

comments: false

menu:
  QuickLaunch:
    name: Infrastructure
    id: infra
    parent: mineserv
---
# Bicep Project Documentation

This Bicep project contains templates for deploying resources to Azure. 

## Project Structure

- **main.bicep**: The main entry point for the Bicep deployment. This file defines the resources and configurations that will be deployed to Azure.
- **modules/exampleModule.bicep**: A reusable module that encapsulates specific resource definitions and configurations to promote modularity.

## Prerequisites

- Azure subscription
- Azure CLI installed and configured
- Bicep CLI installed

## Deployment Instructions

1. Ensure you are logged into your Azure account using the Azure CLI:
   ```
   az login
   ```

2. Navigate to the directory containing the Bicep files.

3. Deploy the main Bicep file using the following command:
   ```
   az deployment group create --resource-group <your-resource-group> --template-file main.bicep
   ```

Replace `<your-resource-group>` with the name of your Azure resource group.

## Additional Information

For more details on Bicep, visit the official documentation at [Bicep Documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/).
#!/bin/bash

# Script to start an Azure VM using Azure CLI

# Azure VM details
RESOURCE_GROUP="STRMGATEWAY-NA2"
VM_NAME="vlmazsgw-lx2"
SUBSCRIPTION_ID="89e05d73-8862-4007-a700-0f895fc0f7ea"

# Ensure the user is logged in to Azure
az account show > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Azure CLI is not authenticated. Attempting to log in..."
    export AZURE_CLI_DISABLE_CONNECTION_VERIFICATION=1
    az login --use-device-code --scope https://management.core.windows.net//.default
    if [ $? -ne 0 ]; then
        echo "Failed to authenticate with Azure CLI. Exiting."
        exit 1
    fi
fi

# Start the VM
az vm start --resource-group $RESOURCE_GROUP --name $VM_NAME --subscription $SUBSCRIPTION_ID

# Check if the command was successful
if [ $? -eq 0 ]; then
    echo "Azure VM $VM_NAME started successfully."
else
    echo "Failed to start Azure VM $VM_NAME. Please check the details and try again."
fi

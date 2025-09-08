### Create and manage Windows VMs in Azure using Java SDK
This project example was created by following Microsoft documenation steps under -- https://learn.microsoft.com/en-us/azure/virtual-machines/windows/java

The project was created to exlore ways of fully automating the start/stop of the Azure VMs for a better CI/CD integration later

The code involves two main steps:

1. Authenticate programmatically to Azure using azure identity manager maven dependency

2. Manage VM lifecycles using Azure Resource Manager, arm maven dependency
## Solution Name: SGW Datamodel WebApp

Table of contents
---------------------

* 1.[ Introduction](#introduction)
* 2.[ Problem statement](#problem)
* 3.[ Features](#features)
* 3.1.[ View Datamodel Utility](#view_datamodel)
* 3.2.[ Update Datamodel Utility](#update_datamodel)
* 4.[ Language used](#language)
* 5.[ Technologies used](#technologies)
* 6.[ How to run](#how_to_run)
* 7.[ Why it's cool](#advantages)

---
<a name="introduction"></a>
## Introduction:

### SGW Datamodel WebApp ###
```
SGW Datamodel WebApp represents various upstream and downstream trade mapping used by SGW, CV and FISCD team on a web platform and offers few utilities to the designated user to view, add and update the datamodel as per requirement.

It also provie rest URL which can be used by any other application.

It is quite user friendly, secure and has better performance as compared to the previous excel sheet platform.
  ```
 #### What is DataModel: ####
  ```
 Datamodel usually consists of various attributes and their respective mappings. These mappings are useful for clients as well as for the SGW and FISCD team members to identify which value from the FIX/FIXML tag needs to be mapped to the attribute.
 ```
---
<a name="problem"></a>
## Problem statement: ##

 * ###### The biggest problem with the excel sheet based Datamodel is regarding the performance. ######
 * ###### The excel sheet always needs to be updated and reuploaded on the Sharepoint whenever any new mapping is added or updated. ######
 * ###### User requires to download the excel sheet of datamodel everytime when there is some change in it. ######
 * ###### Datamodel represented through excel sheet is usually pretty much unattractive visually. ######
 * ###### Most of the bugs in the stream gateway projects are because of data model mapping. ######

---
<a name="features"></a>
## Features: ##
```
1. SGW Datamodel WebApp has an user friendly interface.
2. It performs better as compared to excel based platform.
3. It is more secure and responsive than excel.
4. It has better response time to the user inputs.
5. It also provides Rest URL. which can be used by any other application.
```
#### Few of the functional utilities that are offered currently by SGW Datamodel WebApp are: #####

<a name="view_datamodel"></a>
#### Utility 1 : View datamodel for some particular market ####

```
This is used to display the required datamodel as per the requirement of the user.
User can select the market for which he/she wants to view the datamodel and can also select the output type which filters out the columns for the user.
```
##### Below given steps can be used by the user to perform this operation: #####
 * ###### Select the functional area for which you want to view the datamodel for(like MiddleOffice, BackOffice etc) from the drop down menu. ######
 * ###### Select type of message for which you want to view the mapping details for from the drop down menu. ######
 * ###### Select the Mode from the drop down menu. **_"Internal-Full"_** will usually show you all the details from datamodel whereas **_"Client"_** mode will show you only client specific details. ######
 * ###### Select the market for which you want to view the datamodel from the drop down menu. ######
 * ###### Select the Output type for which you want to view mapping for from drop down menu. (Output type includes StandAlone, Clearvision and FISCD.) ######
* ###### Click on **_"Fetch Data"_** button to view the datamodel. ######

<a name="update_datamodel"></a>
#### Utility 2 : Update data for attributes in datamodel ####
```
This is used to update the datamodel values as per the requirement.
Datamodel needs to be updated when there are some changes regarding the mappings. Hence, this feature is provided in the application.
```
##### Below given steps can be used by the user to perform this operation:

 * ###### Fetch the data for the required datamodel using steps given above in  **_"Utility 1"_**. ###### 
 * ###### Click on the entity from row which you want to edit and then edit the value. ######
 * ###### Once done with editing, click on the small **_"Update button"_** located at the right side of the row which you edited. ######

---
<a name="language"></a>
## Languages used: ##
> Java
>
> Angular

---
<a name="technologies"></a>
## Technologies used: ##
> Angular CLI
>
> NodeJS
>
> JSON
>
> H2 Database
>
> Spring Boot
>
> Hibernate(JPA)
>
> REST Services

---
<a name="how_to_run"></a>
## How to Run: ##

###### 1) Open Web Browser and goto <https://localhost:6060/login> ######
###### 2) Enter your credentials and click on **Sign In** . ######

---
<a name="advantages"></a>
## Why it's cool: ##
* ###### Better user interface as it is created using Angular so there are more functions which could be used to beautify the contents of datamodel visually. ######
* ###### Better performance which results in swift response time. ######
* ###### Scope of adding further security funcationalities to make it more secured and maintain data integrity. ######
* ###### Data can be centralized which helps in maintaining data integrity. ######

---
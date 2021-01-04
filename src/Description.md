# Using fonts

See  
- https://fontawesome.com/ for a description
- https://fontawesome.com/icons for a list of known icons
- https://github.com/FortAwesome/angular-fontawesome for description of installation

# My installation

From the compatibility guide angular 11.x uses @fortawesome/angular-fontawesome version 0.8.x

```bash
$ ng add @fortawesome/angular-fontawesome@0.8.1
```

# Rich text editor 
See
- rich text editor https://ej2.syncfusion.com/angular/documentation/rich-text-editor/getting-started/ 
- alternatives https://angularscript.com/best-wysiwyg-editors/ 
- inline html https://blog.fullstacktraining.com/binding-html-with-angular/ 

# Setup data

## Define content type Helptekst with the fields
- helpid - unique string identification
- helptekst - a richtext field
  
![image](images/strapi04.png)

## Add content
Add a number of entries to see data.
In order to get helptexts use
- helpid: '001', '002' en '003'
  
and add some text for these entries

![image](images/strapi03.png)

## Add authentication
### Public access
In order to make it possible for everyone to see the information add read access to the public profile for Helptekst.

This applies to the http get requests

![image](images/strapi00.png)

### Authenticated access

Add a role Author with all access on helptekst.

![image](images/strapi01.png)

Add a user testauthor with role Author

![image](images/strapi02.png)
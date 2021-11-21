# media-share-app-v2
A serverless web application for sharing media with authentication and authorization powered by AWS Cognito and S3 cloud storage. Visit http://shehzadsite.s3-website-us-east-1.amazonaws.com/

## How to use
* There are three different types of users:
* This version of the application allows unauthenticated users to use the website without signing in.
* Unauthenticated users can only view approved photos. They can also upload their photos.
* Normal users can only view approved photos. They can also upload their photos.
* Approvers can approve the uploaded photos. They view both approved and unapproved photos. They can also delete photos. Once it is approved, normal users and unauthenticated users can see it also.
* I, the owner of the website can turn a normal user into an approver. All I have to do is log in to AWS and place the user into the approvers group. I am the only approver currently.

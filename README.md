# Introduction 
Slade Gardens uses a DynamoDB database. Amazon DynamoDB is a serverless, NoSQL database service that allows you to develop modern applications at any scale. As a serverless database, you only pay for what you use and DynamoDB scales to zero, has no cold starts, no version upgrades, no maintenance windows, no patching, and no downtime maintenance.

For more information, look here - [DynamoDB](https://aws.amazon.com/dynamodb/).

## Access
If you already have AWS presence, IAM is a solved topic. It's up to your organisation to decide to how integrate the app with your existing access model. 

The below follows AWS best practices to establish access from 0. Follow the questions below and skip topics as appropriate.

### Is your root access secure?
When you create an AWS account, a root user is created automatically for your account. The root user is a special entity that has full access to the account, and can perform all actions, including changing the payment methods or closing the account. When you sign-in using the root user you have complete access to all AWS service and resources in the account. Due to this level of permissions, we recommend that you:

- Enable additional security for the root user with multi-factor authentication
- Set up additional users to perform daily tasks related to your account

Root user is a long-term user and as such the following AWS service should be used to configure it:
 - AWS Identity and Access Management (IAM). 
 
This service provides access control policies and manages long-term users like the root user. If you create users in IAM, those users have long-term access credentials. As a security best practice, it is recommended that you minimize the use of long-term credentials in AWS.

Set up two factor authentication. A detailed guide can be found [here](https://aws.amazon.com/getting-started/guides/setup-environment/module-two/).

### Is AWS IAM Identity Center enabled?
This is the recommended way of performing daily tasks. For short-term accounts, AWS IAM Identity Center service is used.

This service provides temporary credentials that are granted each time a user signs in for a session. It can integrate with any existing identity providers you might already have, like Microsoft Active Directory or Okta, so that your users can use the same sign on for AWS as they use for other services in your organisation. If you don't have another identity provider, you can create users in IAM Identity Center. This is the recommended way to create additional users for your AWS account.

Here are the steps to be performed using your root account:
- Enable IAM Identity Center (London region) 

When you enable IAM Identity Center you also need to enable AWS Organizations. AWS Organizations lets you organize multiple AWS accounts so that you can have separate AWS accounts for different use cases.

If you do not have an organisation, you will be prompted to create one. If you do, it will allow you to enable IAM Identity Center.

### Do you have additional users to perform charity related tasks?
Tasks to be performed:
- Add users
- Add users to groups
- Configure your identity source

Your identity source is where your users and groups are managed. After you configure your identity source, you can look up users or groups to grant them single sign-on access to AWS accounts, cloud applications, or both.

When you enable IAM Identity Center for the first time, it is automatically configured with an IAM Identity Center directory as your default identity source, which is our case.

Add a new user: AWS IAM Identity Center -> Users -> Add User

If you don't have a group, you can create one as part of the "Add User" flow. When you finish this flow, added user should receive a confirmation email with further instructions.

### Do added users have the correct permissions?
Task to be performed:
- Create an administrative permission set
- Sign in to the AWS access portal with your administrative credentials

Your new user exists but does not have access to any resources, services, or applications, so the user can't replace your root user for daily administrative tasks yet. Let’s give your new user access to your AWS account. Since we put the user into a group, we will assign the group to an account and then we will add a permission set that defines what the members of the group can access.

Assign previously created group to the added organisation. IAM Identity Center -> AWS Accounts -> select management account -> Assign users or groups.

As part of the form, you will be able to access a permission set. Define it to you desired access. Finish off assigning users.

Now you are ready to sign in using your new user.

Note: confirmation email will include your access portal URL. Use it to sign in to the management console.

### Set up AWS command line interface

The AWS CLI is a unified tool to manage your AWS services. With just one tool to download and configure, you can control multiple AWS services from the command line and automate them through scripts. 

To interact with AWS using the CLI, you need to configure credentials for it to use when making API calls.

Installation process and session configuration is explained [here](https://aws.amazon.com/getting-started/guides/setup-environment/module-three/). You should now be able to fully execute your scripts.

## Design

## Pricing
List of service used:
- Access
    - IAM: no cost
    - IAM Identity Center: no cost
    - Organizations: no cost
    - CLI: no cost
- Hosting
    - Amplify (front-end): free for 12 months

## Architecture
Complete architecture is defined in the below sections.

### Front End
Front end is a single page application written in React. For more information, check

### Hosting
https://main.d3ghx0e9yjp2ah.amplifyapp.com/

## Development


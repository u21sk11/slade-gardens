# Introduction 
Slade Gardens uses a DynamoDB database. Amazon DynamoDB is a serverless, NoSQL database service that allows you to develop modern applications at any scale. As a serverless database, you only pay for what you use and DynamoDB scales to zero, has no cold starts, no version upgrades, no maintenance windows, no patching, and no downtime maintenance.

For more information, look here - [DynamoDB](https://aws.amazon.com/dynamodb/).

## Access
If you already have AWS presence, IAM is a solved topic. The below follows AWS best practices to establish access from 0. Follow the questions below and skip topics as appropriate.

### Do you have an organisation to use?
AWS Organizations help you centrally manage and govern your environment as you grow and scale your AWS resources. Using Organizations, you can create accounts and allocate resources, group accounts to organize your workflows, apply policies for governance, and simplify billing by using a single payment method for all of your accounts.

1. AWS Organizations do not have any associated costs - [create an organisation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_basic.html#tutorial-orgs-step1).

2. Invite existing or new AWS members that will be part of your organisation.






AWS IAM Identity Center is the AWS solution for connecting your workforce users to AWS managed applications such as Amazon Q Developer and Amazon QuickSight, and other AWS resources. You can connect your existing identity provider and synchronize users and groups from your directory, or create and manage your users directly in IAM Identity Center. You can then use IAM Identity Center for either or both of the following:
 - User access to applications
 - User access to AWS accounts

Before we begin, establish [access through IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/getting-started.html). If you already have an identity source, use it. In this case, Identity Center is enabled for the first time, providing a default  

DynamoDB can be accessed in multiple ways. However, working with multiple aws instances requires to think about automation. You can use the AWS Command Line Interface (AWS CLI) to control multiple AWS services from the command line and automate them through scripts. You can use the AWS CLI for ad hoc operations, such as creating a table. You can also use it to embed Amazon DynamoDB operations within utility scripts. It is our choice for accessing and manipulating the database. For more information, look here - [Accessing DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AccessingDynamoDB.html#Tools.CLI).

AWS CLI guide can be found [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Before you can use the AWS CLI with DynamoDB, you must get an access key ID and secret access key. For more information, see [Granting Programmatic Access](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html#SettingUp.DynamoWebService.GetCredentials). In most cases as it is suggested by AWS, these credentials would be managed through IAM Identity Center. IAM Identity Center enables you to manage workforce user access to multiple AWS accounts and applications.

After enabling IAM Identity Center, adding a user and a group, we can begin linking AWS CLI to it.

## Design
TBC

## Pricing


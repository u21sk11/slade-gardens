# Introduction 
Slade Gardens uses a DynamoDB database. Amazon DynamoDB is a serverless, NoSQL database service that allows you to develop modern applications at any scale. As a serverless database, you only pay for what you use and DynamoDB scales to zero, has no cold starts, no version upgrades, no maintenance windows, no patching, and no downtime maintenance.

For more information, look here - [DynamoDB](https://aws.amazon.com/dynamodb/).

## Access
DynamoDB can be accessed in multiple ways. However, working with multiple aws instances requires to think about automation. You can use the AWS Command Line Interface (AWS CLI) to control multiple AWS services from the command line and automate them through scripts. You can use the AWS CLI for ad hoc operations, such as creating a table. You can also use it to embed Amazon DynamoDB operations within utility scripts. It is our choice for accessing and manipulating the database. For more information, look here - [Accessing DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AccessingDynamoDB.html#Tools.CLI).

AWS CLI guide can be found [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Before you can use the AWS CLI with DynamoDB, you must get an access key ID and secret access key. For more information, see [Granting Programmatic Access](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html#SettingUp.DynamoWebService.GetCredentials). In most cases as it is suggested by AWS, these credentials would be managed through IAM Identity Center.



## Design
TBC

## Pricing


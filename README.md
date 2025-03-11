# Overview

Front end is exposed as a single page application using [React](https://react.dev/) library. [Vite](https://vite.dev/) is used as the build tool.

Before proceeding here are some defintions:

- SPA (Single Page Application) - A single-page application is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of loading entire new pages. The goal is faster transitions that make the website feel more like a native app.
- React - a library for web and native user interfaces.
- Vite - Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:
  - A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).
  - A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

The React app serves as the core piece of the repository, which gets surrounded by AWS services to establish a basic backend. As such, establishing a basic front end codebase can be a useful first step. There are guides available for [dummy apps](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-one/) to get you going quickly.

# App Styling
Tailwindcss is used to style the application - a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

Application set up with Vite is explained [here](https://v3.tailwindcss.com/docs/guides/vite).

# App Routing
Routing is implemented with the [react-router-dom](https://www.npmjs.com/package/react-router-dom) library.

The first step is to wrap the application in a BrowserRouter component (main.jsx file) and then configure the routes in the App.jsx file.

# Back-End Access

If you already have AWS presence, IAM is a solved topic. It's up to your organisation to decide to how integrate the app with your existing access model.

The below follows AWS best practices to establish access from 0. Follow the questions below and skip topics as appropriate.

## Is your root access secure?

When you create an AWS account, a root user is created automatically for your account. The root user is a special entity that has full access to the account, and can perform all actions, including changing the payment methods or closing the account. When you sign-in using the root user you have complete access to all AWS service and resources in the account. Due to this level of permissions, we recommend that you:

- Enable additional security for the root user with multi-factor authentication
- Set up additional users to perform daily tasks related to your account

Root user is a long-term user and as such the following AWS service should be used to configure it:

- AWS Identity and Access Management (IAM).

This service provides access control policies and manages long-term users like the root user. If you create users in IAM, those users have long-term access credentials. As a security best practice, it is recommended that you minimize the use of long-term credentials in AWS.

Set up two factor authentication. A detailed guide can be found [here](https://aws.amazon.com/getting-started/guides/setup-environment/module-two/).

## Is AWS IAM Identity Center enabled?

This is the recommended way of performing daily tasks. For short-term accounts, AWS IAM Identity Center service is used.

This service provides temporary credentials that are granted each time a user signs in for a session. It can integrate with any existing identity providers you might already have, like Microsoft Active Directory or Okta, so that your users can use the same sign on for AWS as they use for other services in your organisation. If you don't have another identity provider, you can create users in IAM Identity Center. This is the recommended way to create additional users for your AWS account.

Here are the steps to be performed using your root account:

- Enable IAM Identity Center (London region)

When you enable IAM Identity Center you also need to enable AWS Organizations. AWS Organizations lets you organize multiple AWS accounts so that you can have separate AWS accounts for different use cases.

If you do not have an organisation, you will be prompted to create one. If you do, it will allow you to enable IAM Identity Center.

## Do you have additional users to perform charity related tasks?

Tasks to be performed:

- Add users
- Add users to groups
- Configure your identity source

Your identity source is where your users and groups are managed. After you configure your identity source, you can look up users or groups to grant them single sign-on access to AWS accounts, cloud applications, or both.

When you enable IAM Identity Center for the first time, it is automatically configured with an IAM Identity Center directory as your default identity source, which is our case.

Add a new user: AWS IAM Identity Center -> Users -> Add User

If you don't have a group, you can create one as part of the "Add User" flow. When you finish this flow, added user should receive a confirmation email with further instructions.

## Do added users have the correct permissions?

Task to be performed:

- Create an administrative permission set
- Sign in to the AWS access portal with your administrative credentials

Your new user exists but does not have access to any resources, services, or applications, so the user can't replace your root user for daily administrative tasks yet. Let’s give your new user access to your AWS account. Since we put the user into a group, we will assign the group to an account and then we will add a permission set that defines what the members of the group can access.

Assign previously created group to the added organisation. IAM Identity Center -> AWS Accounts -> select management account -> Assign users or groups.

As part of the form, you will be able to access a permission set. Define it to you desired access. Finish off assigning users.

Now you are ready to sign in using your new user.

Note: confirmation email will include your access portal URL. Use it to sign in to the management console.

## Set up AWS command line interface

The AWS CLI is a unified tool to manage your AWS services. With just one tool to download and configure, you can control multiple AWS services from the command line and automate them through scripts.

To interact with AWS using the CLI, you need to configure credentials for it to use when making API calls.

Installation process and session configuration is explained [here](https://aws.amazon.com/getting-started/guides/setup-environment/module-three/). You should now be able to fully execute your commands.

# Hosting

You have a React app, which can be run locally. Add Amplify libraries by running the following command:

```bash
npm create amplify@latest -y
```

This will establish a foundation for Amplify configuration. You should see a new folder called 'amplify' after this. Add it to a GitHub repository and you are ready to host it.

Using your freshly established AWS account, locate AWS Amplify and follow the User Interface to deploy it. It's a one off and should be performed manually, until an automated approach is described.

From this step onwards, every push to the main branch will redeploy the application.

# Sandbox

Having multiple users working on your project might be difficult. AWS Amplify allows you to create sandboxes for the backend resources used, so you could continue working on your updates without affecting other users.

To kick off a new sandbox, run the following command:

```bash
npx ampx sandbox --profile {aws-profile}
```

This also writes a new file out - amplify_outputs.json to enable your frontend app to connect to your backend resources. The values you configure in your backend authentication resource are set in the generated outputs file to automatically configure the frontend Authenticator connected component.

# Authentication

Application uses AWS Cognito as the authentication tool through Amplify Auth. - [AWS Cognito](https://aws.amazon.com/cognito/) - [AWS Amplify Auth](https://docs.amplify.aws/react/build-a-backend/auth/set-up-auth/)

The command we ran earlier added Amplify Auth to our project. To use it efficiently, we should use a predefined react library for the UI. This will make the integration easier.

```bash
npm add @aws-amplify/ui-react
```

In general, authentication related code is handled in ./amplify/auth folder.

## Customer Communication

New users receive confirmation emails to complete their registration. There are a few other communication formats as well (e.g. to resend the code, reset your password, etc.). This is done using Amazon Simple Email Service. The template is customised using HTML and lambda function triggers.

To create a trigger, we first need to add aws-lambda package that will be used to define the type of the handler.

```bash
npm add --save-dev @types/aws-lambda
```

The handler file defines the lamda function and thus, has the template. These are the different states of Cognito that we can optimise:

1. CustomMessage_SignUp : Custom message — To send the confirmation code post sign-up.
2. CustomMessage_AdminCreateUser : Custom message — To send the temporary password to a new user.
3. CustomMessage_ResendCode : Custom message — To resend the confirmation code to an existing user.
4. CustomMessage_ForgotPassword : Custom message — To send the confirmation code for Forgot Password request.
5. CustomMessage_UpdateUserAttribute : Custom message — When a user’s email or phone number is changed, this trigger sends a verification code automatically to the user. Cannot be used for other attributes.
6. CustomMessage_VerifyUserAttribute : Custom message — This trigger sends a verification code to the user when they manually request it for a new email or phone number.
7. CustomMessage_Authentication : Custom message — To send MFA code during authentication.

Configuration is in the following folder ./amplify/auth/custom-message and the trigger is called in the main resource.ts file under auth.

The following messages are applicable to this project and thus, should be customised: 1, 3, and 4.

# Data

## Relationships

The following table shows the relationships between the models in the schema:

| Model      | Relationship | With       |                                         |
| ---------- | ------------ | ---------- | --------------------------------------- |
| Guardian   | hasMany      | Child      | A Guardian can have many Children       |
| Guardian   | hasMany      | Audit      | A Guardian can have many Audit entries  |
| Child      | belongsTo    | Guardian   | A Child belongs to one Guardian         |
| Child      | hasMany      | Audit      | A Child can have many Audit entries     |
| Child      | hasOne       | Playground | A Child can have one Playground entry   |
| Playground | belongsTo    | Child      | A Playground entry belongs to one Child |
| Audit      | belongsTo    | Guardian   | An Audit entry belongs to one Guardian  |
| Audit      | belongsTo    | Child      | An Audit entry belongs to one Child     |

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
- Communication
  - Simple Email Service: free for 12 months

## Architecture

Complete architecture is defined in the below sections.

## Development

### Amplify

To set up Amplify data, follow this guide - [Set up Amplify Data](https://docs.amplify.aws/vue/build-a-backend/data/set-up-data/)

AppSync pricing, which includes a generous free tier.

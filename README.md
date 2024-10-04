# Welcome to the Backend part of the GreenJinn Test Task

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Testing](#testing)
- [Postman](#postman)
- [Useful commands](#usefull-commands)

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js**: version 20.x or later (used v20.10.0).
- **AWS CLI**: Install the AWS CLI and configure it with your AWS credentials. You can find more info [here](https://docs.aws.amazon.com/cli/)
- **AWS CDK**: Install the AWS Cloud Development Kit (CDK) globally using npm:
  ```bash
  npm install -g aws-cdk
  ```
- **AWS SAM CLI**: Install the AWS SAM CLI for local development. You can find installation guide and more info [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- **Docker**: Install Docker for local development

## Local Development

To set up a local development environment, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Rustam-Kirgizbaev/greenjinn-serverless-api.git
cd greenjinn-serverless-api
```

2. Install Dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Create template.yaml file (this file is git ignored so don't worry about it too much):

```bash
cdk synth > template.yaml
```

5. Start the project using AWS SAM CLI:

```bash
sam local start-api --template template.yaml
```

After these steps Application should be up and runing at `127.0.0.1:3000`

## Testing

Unlike Frontend part, this project is tested extensively using `Jest` framework and all the test files are placed in `test` folder.

To run the tests, execute:

```bash
npm run test
```

Everytime you commit tests are run automatically, along `prettier` and `eslint`, using `Husky` pre-commit hook.

## Postman

There is called `postman` in the main directory which contains Postman collection for easy interaction with the API.
In addition to `unit tests`, there are some quality and performance tests written in Postman collection as well. You can see them by navigating to the `tests` section of each request.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

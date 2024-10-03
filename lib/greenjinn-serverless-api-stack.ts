import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class GreenjinnServerlessApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "GreenJinn API", {
      restApiName: "GreenJinn Test Task API",
    });

    const addRoute = (
      endpoint: string,
      method: string,
      param?: string,
      environment: { [key: string]: string } = {}
    ) => {
      const handler = new NodejsFunction(this, `${endpoint}${method}Function`, {
        runtime: Runtime.NODEJS_20_X,
        entry: `./lambda/${endpoint}.ts`,
        handler: "handler",
        environment,
      });

      let resource = api.root.addResource(endpoint);

      if (param) {
        resource = resource.addResource(`{${param}}`);
      }

      resource.addMethod(method, new LambdaIntegration(handler));
    };

    addRoute("average-bitcoin-price", "GET");
    addRoute("trading-pairs-info", "GET");
    addRoute("ticker-values", "GET", "symbol");
  }
}

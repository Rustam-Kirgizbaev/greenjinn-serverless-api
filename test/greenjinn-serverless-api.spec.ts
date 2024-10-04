import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as GreenjinnServerlessApi from '../lib/greenjinn-serverless-api-stack';

test('API Gateway Created', () => {
  const app = new cdk.App();
  const stack = new GreenjinnServerlessApi.GreenjinnServerlessApiStack(
    app,
    'MyTestStack',
  );
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
});

test('GET average-bitcoin-price Route Created', () => {
  const app = new cdk.App();
  const stack = new GreenjinnServerlessApi.GreenjinnServerlessApiStack(
    app,
    'MyTestStack',
  );
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    ResourceId: { Ref: 'GreenJinnAPIaveragebitcoinpriceB3CEE2D6' },
    AuthorizationType: 'NONE',
  });
});

test('GET trading-pairs-info Route Created', () => {
  const app = new cdk.App();
  const stack = new GreenjinnServerlessApi.GreenjinnServerlessApiStack(
    app,
    'MyTestStack',
  );
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    ResourceId: { Ref: 'GreenJinnAPItradingpairsinfoAA1176C7' },
    AuthorizationType: 'NONE',
  });
});

test('GET ticker-values Route Created', () => {
  const app = new cdk.App();
  const stack = new GreenjinnServerlessApi.GreenjinnServerlessApiStack(
    app,
    'MyTestStack',
  );
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
    ResourceId: { Ref: 'GreenJinnAPItickervaluessymbol3A2ECCA6' },
    AuthorizationType: 'NONE',
  });
});

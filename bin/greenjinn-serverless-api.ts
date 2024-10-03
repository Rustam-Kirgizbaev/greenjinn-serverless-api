#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { GreenjinnServerlessApiStack } from "../lib/greenjinn-serverless-api-stack";

const app = new App();
new GreenjinnServerlessApiStack(app, "GreenjinnServerlessApiStack", {
  env: { account: "516290719178", region: "eu-north-1" },
});

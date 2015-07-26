# CloudWatchAlarm2IFTTT

A sample [AWS Lambda](https://aws.amazon.com/lambda/) function to push [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) alarms to [IFTTT](https://ifttt.com) via the [Maker](https://ifttt.com/maker) channel.

## License

Copyright (c) 2015 Danilo Poccia, http://danilop.net

This code is licensed under the The MIT License (MIT). Please see the LICENSE file that accompanies this project for the terms of use.

## Installation

### On IFTTT

1. Go to https://ifttt.com/maker and write down your secret key

### On AWS

2. Create a new Amazon SNS topic, e.g. `cloudwatch-alarms`
3. Create a new AWS Lambda function, e.g. `cloudwatch-2-ifttt`
  1. Use Node.js as runtime
  2. Paste the code inline from the `index.js` file included in this repository
  3. Replace the `iftttMakerSecretKey` with the one you wrote down at step 1
  4. (Optional) Replace the `iftttMakerEventName` with the one you want to use
  5. Leave the default handler
  6. Use a basic execution role
  7. Leave the default memory (128MB) and timeout (3s)
4. Add SNS as an event source to the Lambda function
  1. Choose the SNS topic created at step 2
  2. In the options, enable the event source now (not later)
5. For the CloudWatch Alarms you want to push to IFTTT
  1. Select the state you are interested to. e.g. `State is ALARM`
  2. Send notification to the SNS topic created at step 2

### On IFTTT

6. Select My Recipes
7. Create a Recipes
8. Choose Maker as Trigger ('this')
9. Select Receive a Web Request
10. Write the Event Name exacly as is the `iftttMakerEventName` variable of the Lambda function (step 3.4)
11. Select Create Trigger
12. `Value1` contains a summary of the CloudWatch alarm as built in the Lambda function
13. Choose whatever you want as Action ('that'), for example:
  1. iOS or Android Notifications to receive it on your mobile (you need the IF app from IFTTT installed on the device), e.g. you can set the notification to `CloudWatch {{Value1}}`
  2. A Channel from the Connected Home category to have a *visible* effect, e.g. [Philips Hue](https://ifttt.com/hue) to change the color of your lights to red
  3. Slack to send a message to your team
  4. Trello to create a new card
  5. GitHub to create a new issue

## Feedback

Please give me your feedback [here](https://twitter.com/danilop).

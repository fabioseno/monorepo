import { APIGatewayProxyEvent } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { LambdaModule } from 'src/lambda.module';
import StudentProfileService from './domain/services/student-profile.service';

exports.handler = async (
    event: APIGatewayProxyEvent, _context) => {
    const requestBody = JSON.parse(event.body);

    const app = await NestFactory.createApplicationContext(LambdaModule);

    const studentProfileService = app.get(StudentProfileService);

    const masterId = await studentProfileService.create(requestBody.profileType, requestBody.authProviderId,
        requestBody.dataResidency, requestBody.firstName, requestBody.lastName, requestBody.email);

    return {
        statusCode: 201,
        body: JSON.stringify({
            id: masterId
        }),
    };
};
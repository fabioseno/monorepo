import StudentProfileController from '../../application/controllers/StudentProfileController';

exports.handler = async function (event, context) {
    let statusCode = 200;
    let outputBody;

    try {
        switch (event.routeKey) {
            case 'GET /profiles':
                outputBody = await StudentProfileController.getStudentProfile(event.queryStringParameters.email);
                break;
            case 'POST /profiles':
                let incomingBody = JSON.parse(event.body);
                outputBody = await StudentProfileController.createStudentProfile(incomingBody);
                break;
            case 'PUT /profiles/{profileId}':
                break;
            case 'DELETE /profiles/{profileId}':
                break;
        }
    }
    catch (error) {
        this.statusCode = 500;
        outputBody = error.message;
    }

    return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outputBody)
    }
}
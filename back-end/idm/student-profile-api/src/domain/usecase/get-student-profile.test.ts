import StudentProfileMemoryRepository from "../../infrastructure/repository/student-profile-memory.repository";
import CreateStudentProfile from "./create-student-profile";
import GetStudentProfile from "./get-student-profile";

test('Should throw an error if no profile is found', async function () {
    const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
    const getStudentProfile = new GetStudentProfile(studentProfileMemoryRepository);

    expect(async () => await getStudentProfile.execute('random_email@domain.com')).rejects.toThrowError();
});

test('Should return an existing student profile id ', async function () {
    const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
    const createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);
    const getStudentProfile = new GetStudentProfile(studentProfileMemoryRepository);

    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'get_student@domain.com'
    };

    testStudent.masterProfileId = await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    
    let studentProfile = await getStudentProfile.execute(testStudent.email);

    expect(studentProfile.masterProfileId).toEqual(testStudent.masterProfileId);
});
import StudentProfileMemoryRepository from "../../infrastructure/repository/StudentProfileMemoryRepository";
import CreateStudentProfile from "./CreateStudentProfile";

test('validate invalid email', async function () {
    const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
    const createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);
    
    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: '@domain.com'
    };

    expect(async () => {
        await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    }).rejects.toThrowError();
});

test('validate existing email', async function () {
    const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
    const createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);
   
    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'existing_email@domain.com'
    };

    testStudent.masterProfileId = await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

    expect(async () => {
        await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    }).rejects.toThrowError();
});

test('Should save a new student', async function () {
    const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
    const createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);

    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'new_student@domain.com'
    };

    let masterId = await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

    expect(masterId).toEqual(expect.any(String));
});

test('Should get an existing student', async function () {
    const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
    const createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);

    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'get_student@domain.com'
    };

    testStudent.masterProfileId = await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

    let studentProfile = await studentProfileMemoryRepository.getStudentProfile(testStudent.email);

    expect(studentProfile).toMatchObject(testStudent);
});


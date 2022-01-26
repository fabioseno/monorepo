import StudentProfileMemoryRepository from "../../infrastructure/repository/student-profile-memory.repository";
import CreateStudentProfile from "./create-student-profile";
import GetStudentProfile from "./get-student-profile";

let createStudentProfile: CreateStudentProfile;
let getStudentProfile: GetStudentProfile;

beforeEach(() => {
    const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
    createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);
    getStudentProfile = new GetStudentProfile(studentProfileMemoryRepository);
});

test('validate required first name', async function () {
    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: '',
        lastName: 'Last name',
        email: 'valid_email@domain.com'
    };

    expect(async () => {
        await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    }).rejects.toThrowError();
});

test('validate required last name', async function () {
    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: '',
        email: 'valid_email@domain.com'
    };

    expect(async () => {
        await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    }).rejects.toThrowError();
});

test('validate required email', async function () {
    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: ''
    };

    expect(async () => {
        await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    }).rejects.toThrowError();
});

test('validate required provider id', async function () {
    let testStudent: any = {
        profileType: 'student',
        authProviderId: '',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'valid_email@domain.com'
    };

    expect(async () => {
        await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    }).rejects.toThrowError();
});

test('validate required data residency', async function () {
    let testStudent: any = {
        profileType: 'student',
        authProviderId: 'provider_id',
        dataResidency: '',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'valid_email@domain.com'
    };

    expect(async () => {
        await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
    }).rejects.toThrowError();
});

test('validate invalid email', async function () {
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

test('allow empty profileType to be considered as "student"', async function () {
    let testStudent: any = {
        profileType: '',
        authProviderId: 'provider_id',
        dataResidency: 'residency country',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'valid_email@domain.com'
    };

    await createStudentProfile.execute(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

    let savedProfile = await getStudentProfile.execute(testStudent.email);

    expect(savedProfile.profileType).toEqual('student');
});

test('save a new student', async function () {
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
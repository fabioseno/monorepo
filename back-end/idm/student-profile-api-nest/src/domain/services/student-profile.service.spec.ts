import { Test } from '@nestjs/testing';
import StudentProfileMemoryRepository from '../../infrastructure/repository/student-profile-memory.repository';
import StudentProfileService from './student-profile.service';

let studentProfileService: StudentProfileService;

beforeEach(async () => {
    const module = await Test.createTestingModule({
        providers: [StudentProfileService, StudentProfileMemoryRepository],
    }).compile();

    studentProfileService = module.get<StudentProfileService>(StudentProfileService);
});

describe('create profile', function () {

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
            await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
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
            await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
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
            await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
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
            await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
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
            await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
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
            await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
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

        testStudent.masterProfileId = await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

        expect(async () => {
            await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);
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

        await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

        let savedProfile = await studentProfileService.get(testStudent.email);

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

        let masterId = await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

        expect(masterId).toEqual(expect.any(String));
    });
});

describe('get profile', function () {
    test('Should throw an error if no profile is found', async function () {
        expect(async () => await studentProfileService.get('random_email@domain.com')).rejects.toThrowError();
    });

    test('Should return an existing student profile id ', async function () {
        let testStudent: any = {
            profileType: 'student',
            authProviderId: 'provider_id',
            dataResidency: 'residency country',
            firstName: 'First name',
            lastName: 'Last name',
            email: 'get_student@domain.com'
        };

        testStudent.masterProfileId = await studentProfileService.create(testStudent.profileType, testStudent.authProviderId, testStudent.dataResidency, testStudent.firstName, testStudent.lastName, testStudent.email);

        let studentProfile = await studentProfileService.get(testStudent.email);

        expect(studentProfile.masterProfileId).toEqual(testStudent.masterProfileId);
    });
})
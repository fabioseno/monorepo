import StudentProfileMemoryRepository from '../../infrastructure/repository/student-profile-memory.repository';
import StudentProfileAdapter from '../adapter/student-profile.adapter';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class StudentProfileService {
    
    constructor(private studentProfileRepository: StudentProfileMemoryRepository) { }

    async create(profileType: string, authProviderId: string, dataResidency: string, firstName: string, lastName: string, email: string) {
        let studentProfile = await this.studentProfileRepository.getStudentProfile(email);
        if (studentProfile) throw new Error('Profile already registered');

        studentProfile = StudentProfileAdapter.create(uuidv4(), profileType, authProviderId, dataResidency, firstName, lastName, email);
        await this.studentProfileRepository.createStudentProfile(studentProfile.masterProfileId, studentProfile.profileType, studentProfile.authProviderId, studentProfile.dataResidency, studentProfile.firstName, studentProfile.lastName, studentProfile.email);

        return studentProfile.masterProfileId;
    }

    async get(email: string) {
        let studentProfile = await this.studentProfileRepository.getStudentProfile(email);
        if (!studentProfile) throw new Error('Profile not found');

        return studentProfile;
    }
}
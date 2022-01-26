import StudentProfileRepository from "../repository/student-profile.repository";
import StudentProfileAdapter from "../adapter/student-profile.adapter";
import { v4 as uuidv4 } from 'uuid';

export default class CreateStudentProfile {
    constructor(private studentProfileRepository: StudentProfileRepository) { }

    async execute(profileType: string, authProviderId: string, dataResidency: string, firstName: string, lastName: string, email: string) {
        let studentProfile = await this.studentProfileRepository.getStudentProfile(email);
        if (studentProfile) throw new Error('Profile already registered');

        studentProfile = StudentProfileAdapter.create(uuidv4(), profileType, authProviderId, dataResidency, firstName, lastName, email);
        await this.studentProfileRepository.createStudentProfile(studentProfile.masterProfileId, studentProfile.profileType, studentProfile.authProviderId, studentProfile.dataResidency, studentProfile.firstName, studentProfile.lastName, studentProfile.email);

        return studentProfile.masterProfileId;
    }
}
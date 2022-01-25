import { StudentProfile } from '../entity/StudentProfile';

export default interface StudentProfileRepository {

    getStudentProfile(email: string): Promise<StudentProfile>;

    createStudentProfile(masterProfileId: string, profileType: string, authProviderId: string, dataResidency: string,
        firstName: string, lastName: string, email: string): Promise<boolean>;

    updateStudentProfile(masterProfileId: string, profileType: string, authProviderId: string, dataResidency: string,
        firstName: string, lastName: string, email: string): Promise<boolean>;

    deleteStudentProfile(masterId: string): Promise<boolean>;

}
import StudentProfileAdapter from "../../domain/adapter/student-profile.adapter";
import { StudentProfile } from "../../domain/entity/student-profile";
import StudentProfileRepository from "../../domain/repository/student-profile.repository";

type StudentProfileData = {
    master_profile_id: string,
    profile_type: string;
    auth_provider_id: string;
    data_residency: string;
    first_name: string;
    last_name: string;
    email: string;
}

export default class StudentProfileMemoryRepository implements StudentProfileRepository {

    private static profiles: StudentProfileData[] = [];

    getStudentProfile(email: string): Promise<StudentProfile> {
        let studentProfileData = StudentProfileMemoryRepository.profiles.find(profile => profile.email === email);

        if (studentProfileData) {
            return Promise.resolve(StudentProfileAdapter.create(studentProfileData.master_profile_id, studentProfileData.profile_type, studentProfileData.auth_provider_id, studentProfileData.data_residency, studentProfileData.first_name, studentProfileData.last_name, studentProfileData.email));
        }

        return Promise.resolve(null);
    }

    createStudentProfile(masterProfileId: string, profileType: string, authProviderId: string, dataResidency: string, firstName: string, lastName: string, email: string): Promise<boolean> {
        let studentProfileData = StudentProfileMemoryRepository.profiles.find(profile => profile.email === email);

        if (!studentProfileData) {
            StudentProfileMemoryRepository.profiles.push({
                master_profile_id: masterProfileId,
                profile_type: profileType,
                auth_provider_id: authProviderId,
                data_residency: dataResidency,
                first_name: firstName,
                last_name: lastName,
                email: email
            })
        }

        return Promise.resolve(true);
    }

    updateStudentProfile(masterId: string, profileType: string, authProviderId: string, dataResidency: string, firstName: string, lastName: string, email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    deleteStudentProfile(masterId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
import { ProfileType, StudentProfile } from "../entity/StudentProfile";

export default class StudentProfileAdapter {

    static create(masterProfileId: string, profileType: string, authProviderId: string, dataResidency: string, firstName: string, lastName: string, email: string) {
        return new StudentProfile(masterProfileId, ProfileType[profileType], authProviderId, dataResidency, firstName, lastName, email);
    }
    
}
import CreateStudentProfile from "../../domain/usecase/CreateStudentProfile";
import GetStudentProfile from "../../domain/usecase/GetStudentProfile";
import StudentProfileMemoryRepository from "../../infrastructure/repository/StudentProfileMemoryRepository";

export default class StudentProfileController {

    static async getStudentProfile(email) {
        const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
        const getStudentProfile = new GetStudentProfile(studentProfileMemoryRepository);

        let profile = await getStudentProfile.execute(email);

        return profile;
    }

    static async createStudentProfile(data) {
        const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
        const createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);

        let masterProfileId = await createStudentProfile.execute(data.profileType, data.authProviderId, data.dataResidency, data.firstName, data.lastName, data.email);

        return { masterProfileId };
    }

}
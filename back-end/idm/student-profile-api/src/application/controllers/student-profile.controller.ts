import CreateStudentProfile from "../../domain/usecase/create-student-profile";
import GetStudentProfile from "../../domain/usecase/get-student-profile";
import StudentProfileMemoryRepository from "../../infrastructure/repository/student-profile-memory.repository";

export default class StudentProfileController {

    static async getStudentProfile(email) {
        const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
        const getStudentProfile = new GetStudentProfile(studentProfileMemoryRepository);

        return getStudentProfile.execute(email);
    }

    static async createStudentProfile(data) {
        const studentProfileMemoryRepository = new StudentProfileMemoryRepository();
        const createStudentProfile = new CreateStudentProfile(studentProfileMemoryRepository);

        let masterProfileId = await createStudentProfile.execute(data.profileType, data.authProviderId, data.dataResidency, data.firstName, data.lastName, data.email);

        return { masterProfileId };
    }

}
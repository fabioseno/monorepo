import StudentProfileRepository from "../repository/StudentProfileRepository";

export default class GetStudentProfile {
    constructor(private studentProfileRepository: StudentProfileRepository) { }

    async execute(email: string) {
        let studentProfile = await this.studentProfileRepository.getStudentProfile(email);
        if (!studentProfile) throw new Error('Profile not found');

        return studentProfile;
    }
}
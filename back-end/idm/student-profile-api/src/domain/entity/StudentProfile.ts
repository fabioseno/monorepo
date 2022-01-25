export enum ProfileType {
    Student = 'student',
    StudentParent = 'student_parent',
    KSSStaff = 'kss_staff',
    PathwaysAgent = 'pathways_agent',
    KaplanAgent = 'kaplan_agent'
}

export class StudentProfile {
    constructor(public masterProfileId: string,
        public profileType: ProfileType = ProfileType.Student,
        public authProviderId: string,
        public dataResidency: string,
        public firstName: string,
        public lastName: string,
        public email: string) {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.match(emailRegex)) {
            throw new Error('Invalid e-mail');
        };
    };
}
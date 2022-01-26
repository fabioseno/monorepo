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

        if (!profileType) throw new Error('Profile type required');
        if (!firstName) throw new Error('First name required');
        if (!lastName) throw new Error('First name required');
        if (!email) throw new Error('Email required');
        if (!authProviderId) throw new Error('Authentication provider id required');
        if (!dataResidency) throw new Error('Data residency required');
        if (!email.match(emailRegex)) throw new Error('Invalid e-mail');
    };
}
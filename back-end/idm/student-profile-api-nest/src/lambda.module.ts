import { Module } from '@nestjs/common';
import StudentProfileService from './domain/services/student-profile.service';
import StudentProfileMemoryRepository from './infrastructure/repository/student-profile-memory.repository';

@Module({
  providers: [StudentProfileService, StudentProfileMemoryRepository],
})
export class LambdaModule {}


import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharePointService } from './SharePoint.service';
import { SharePointController } from './SharePoint.controller';

@Module({
  imports: [HttpModule],
  providers: [SharePointService],
  controllers: [SharePointController],
  exports: [SharePointService],
})
export class SharePointModule {}
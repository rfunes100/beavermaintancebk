import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UbicacionesService {
  constructor(private readonly prisma: PrismaService) {}
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Repository } from 'typeorm'

import { AboutEntity } from './entities/about.entity'

@Injectable()
export class AboutService extends TypeOrmCrudService<AboutEntity> {
  constructor(
    @InjectRepository(AboutEntity)
    private readonly repository: Repository<AboutEntity>,
  ) {
    super(repository)
  }
}
